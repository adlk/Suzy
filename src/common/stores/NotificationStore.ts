import { getNotifications, markAsRead, unsubscribe } from 'common/api';
import { Request } from 'common/lib/Request';
import { Store } from 'common/lib/Store';
import { stores } from 'common/stores';
import { INotification } from 'common/types/notification';
import { ipcRenderer } from 'electron';
import * as isOnline from 'is-online';
import { remove } from 'lodash';
import { action, autorun, computed, observable } from 'mobx';

interface INotificationRequestResponse {
  status: number;
  data: INotification[];
}

type CacheItem = number[];

export class NotificationStore extends Store {
  public notificationsRequest = new Request(getNotifications);
  @observable public filterNotifications: boolean = false;
  @observable public selected: number = -1;

  public setup() {
    autorun(() => this.handleUserSession());

    setInterval(async () => {
      if (await !isOnline()) { return; }

      this.notificationsRequest.invalidate({ immediately: true });
    }, 300000);

    // We need to delay this for `stores` to kick in
    autorun(() => this.IPCShareNotificationCount());
    autorun(() => this.systemNotification());

    this.filterNotifications = stores.config.config.filterNotifications;
  }

  @computed get notifications(): INotification[] {
    if (this.filterNotifications) {
      return this.unread;
    }

    return this.all;
  }

  @computed get active(): INotification {
    return this.notifications[this.selected];
  }

  @computed get all(): INotification[] {
    const { user: userStore, auth: authStore } = stores;

    if (!authStore.token) { return []; }

    const res: INotificationRequestResponse = this.notificationsRequest.execute().result;

    if (res && res.data && userStore.user) {
      return res.data.filter((d) => d.user.name !== userStore.user!.login);
    }

    return [];
  }

  @computed get unread(): INotification[] {
    const data: INotification[] = this.all.filter((d: INotification) => d.unread);

    return data;
  }

  @action.bound public markAsRead(id: number) {
    markAsRead(id);

    this.notificationsRequest.patch((result: INotificationRequestResponse) => {
      Object.assign(result.data.find((d) => d.id === id), {
        unread: false,
      });
    });
  }

  @action.bound public markAsReadActive() {
    if (!this.active.id) { return; }

    this.markAsRead(this.active.id);
  }

  @action.bound public unsubscribe(id: number) {
    unsubscribe(id);

    this.notificationsRequest.patch((result: INotificationRequestResponse) => {
      remove(result.data, (d) => d.id === id);
    });
  }

  @action.bound public unsubscribeActive() {
    if (!this.active.id) { return; }

    this.unsubscribe(this.active.id);
  }

  public IPCShareNotificationCount() {
    ipcRenderer.send('getUnreadNotifications', this.unread.length);
  }

  @action.bound public showAll() {
    this.filterNotifications = false;
  }

  @action.bound public showUnread() {
    this.filterNotifications = true;
  }

  @action.bound public select(index: number) {
    if (index < -1 || index >= this.notifications.length) { return; }
    this.selected = index;
  }

  @action.bound public selectPrevious() {
    if (this.selected <= -1) { return; }
    this.selected -= 1;
  }

  @action.bound public selectNext() {
    if (this.selected >= this.notifications.length) { return; }
    this.selected += 1;
  }

  @action.bound public reload() {
    this.selected = 0;
    this.notificationsRequest.invalidate({ immediately: true });
  }

  public openActive() {
    const { url } = this.active;

    stores.app.openUrl(url);
  }

  private systemNotification() {
    const notificationCache: CacheItem = JSON.parse(localStorage.getItem('notificationCache') || '[]');

    const triggerSystemNotificationFor = this.unread.filter((d) => !notificationCache.includes(d.id));

    if (triggerSystemNotificationFor.length === 0) { return; }

    let body: string = '';
    let title: string = '';

    if (triggerSystemNotificationFor.length === 1) {
      const data = triggerSystemNotificationFor[0];
      title = data.title;

      if (data.number) {
        title += ` – ${data.repository.name} #${data.number}`;
      }

      body = data.body || '';
    } else {
      title = `${triggerSystemNotificationFor.length} new Notifications`;
      const uniqueRepositoryNames: string[] = triggerSystemNotificationFor.map((d) => d.repository.name).filter((x, i, a) => a.indexOf(x) === i);
      body = `Repositor${uniqueRepositoryNames.length > 1 ? 'ies' : 'y'}: ${uniqueRepositoryNames.join(', ')}`;
    }

    // tslint:disable-next-line:no-unused-expression
    new Notification(title, {
      body,
    });

    triggerSystemNotificationFor.forEach((d) => {
      notificationCache.push(d.id);
      localStorage.setItem('notificationCache', JSON.stringify(notificationCache));
    });
  }

  private handleUserSession() {
    if (stores.auth.token) {
      this.notificationsRequest.invalidate({immediately: true});
    } else {
      this.notificationsRequest.reset();
    }
  }
}

import { AppStore } from 'common/stores/AppStore';
import { AuthStore } from 'common/stores/AuthStore';
import { ConfigStore } from 'common/stores/ConfigStore';
import { NotificationStore } from 'common/stores/NotificationStore';
import { UserStore } from 'common/stores/UserStore';
import { remote } from 'electron';
import { inject, observer } from 'mobx-react';
import * as React from 'React';
import { UserBanner } from '../components/UserBanner';

const { Menu } = remote;

interface IProps {
  stores?: {
    app: AppStore;
    user: UserStore;
    notifications: NotificationStore;
    auth: AuthStore;
    config: ConfigStore;
  };
}

@inject('stores') @observer
export class UserBannerContainer extends React.Component<IProps> {
  public render() {
    if (!this.props.stores) { return null; }

    const { user: userStore, notifications } = this.props.stores;
    const { user, userRequest } = userStore;
    const { unread } = notifications;

    if (userRequest.isExecuting) {
      return (
        <div>Loading...</div>
      );
    } else if (userRequest.didFail) {
      return (
        <div>Oh noes :(</div>
      );
    }

    if (!user) {
      return null;
    }

    return (
      <UserBanner
        url={user.url}
        avatarUrl={user.avatarUrl}
        unreadCount={unread.length}
        showMenu={() => this.menu.popup({
          window: remote.getCurrentWindow(),
        })}
      />
    );
  }

  private get menu(): Electron.Menu {
    const { stores } = this.props;

    return Menu.buildFromTemplate([
      {
        label: 'Show all by default',
        type: 'checkbox',
        checked: !stores!.config.config.filterNotifications,
        click: () => {
          stores!.config.set('filterNotifications', false);
          stores!.notifications.filterNotifications = false;
        },
      }, {
        label: 'Show unread by default',
        type: 'checkbox',
        checked: stores!.config.config.filterNotifications,
        click: () => {
          stores!.config.set('filterNotifications', true);
          stores!.notifications.filterNotifications = true;
        },
      }, {
        type: 'separator',
      }, {
        label: 'Start app with system',
        type: 'checkbox',
        checked: stores!.app.autoLaunchApp,
        click: () => {
          if (stores!.app.autoLaunchApp) {
            stores!.app.disableAutoLaunch();
          } else {
            stores!.app.enableAutoLaunch();
          }
        },
      }, {
        type: 'separator',
      }, {
        label: 'Logout',
        click: () => {
          stores!.auth.logout();
        },
      }],
    );
  }
}

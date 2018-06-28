import { NotificationStore } from 'common/stores/NotificationStore';
import { INotification } from 'common/types/notification';
import { inject, observer } from 'mobx-react';
import * as React from 'React';
import { HotKeys } from 'react-hotkeys';
import { NotificationEmptyState } from '../components/NotificationEmptyState';
import { NotificationItem } from '../components/NotificationItem';
import { NotificationLoader } from '../components/NotificationLoader';
import { Notifications } from '../components/Notifications';

interface IProps {
  stores?: {
    notifications: NotificationStore;
  };
}

interface IState {
  activeIndex: number;
}

const defaultActiveIndex = -1;

@inject('stores') @observer
export class NotificationsContainer extends React.Component<IProps, IState> {
  public state = {
    activeIndex: defaultActiveIndex,
  };

  private keyMap = {
    moveUp: ['up', 'command+up'],
    moveDown: ['down', 'command+down'],
  };

  private handlers = {
    moveUp: (e: KeyboardEvent) => this.selectPrevious(e),
    moveDown: (e: KeyboardEvent) => this.selectNext(e),
  };

  public render() {
    if (!this.props.stores) { return null; }

    const {
      notifications,
      notificationsRequest,
      filterNotifications,
      showAll,
      showUnread,
      selected,
      select,
    } = this.props.stores.notifications;

    return (
      <HotKeys
        keyMap={this.keyMap}
        handlers={this.handlers}
        focused
      >
        <Notifications
          filterNotifications={filterNotifications}
          showAll={() => showAll()}
          showUnread={() => showUnread()}
        >
          {notificationsRequest.isExecuting && (
            <NotificationLoader />
          )}
          {notificationsRequest.didFail && (
            <React.Fragment>
              Oh Nooooes!
            </React.Fragment>
          )}
          {notifications.length > 0 && (
            notifications.map((notification: INotification, index: number) => {
              let icon = 'arrow-right';

              if (notification.type === 'pullrequest') {
                icon = 'code-merge';
              } else if (notification.type === 'issue') {
                icon = 'info-circle';
              }

              return (
                <NotificationItem
                  key={notification.id}
                  active={index === selected}
                  title={notification.title}
                  url={notification.url}
                  icon={icon}
                  type={notification.type}
                  reason={notification.reason}
                  body={notification.body}
                  state={notification.state}
                  closed={notification.closed}
                  merged={notification.merged}
                  updatedAt={notification.updatedAt}
                  author={notification.user.name}
                  authorUrl={notification.user.url}
                  authorAvatarUrl={notification.user.avatarUrl}
                  unread={notification.unread}
                  repositoryName={notification.repository.fullName}
                  repositoryUrl={notification.repository.url}
                  onActivate={() => select(index)}
                  onDeactivate={() => select(-1)}
                  markAsRead={() => this.markAsRead()}
                  mute={() => this.mute()}
                />
              );
            })
          )}
          {notifications.length === 0 && !notificationsRequest.isExecuting && (
            <NotificationEmptyState />
          )}
        </Notifications>
      </HotKeys>
    );
  }

  private selectPrevious(e: KeyboardEvent) {
    e.preventDefault();

    this.props.stores!.notifications.selectPrevious();
  }

  private selectNext(e: KeyboardEvent) {
    e.preventDefault();

    this.props.stores!.notifications.selectNext();
  }

  private markAsRead() {
    const { notifications: notificationStore } = this.props.stores!;
    const { selected } = notificationStore;

    const notification = notificationStore.notifications[selected];
    notificationStore.markAsRead(notification.id);
  }

  private mute() {
    const { notifications: notificationStore } = this.props.stores!;
    const { selected } = notificationStore;

    const notification = notificationStore.notifications[selected];
    notificationStore.unsubscribe(notification.id);
  }
}

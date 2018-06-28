import * as classNames from 'classnames';
import * as React from 'react';
import { Icon } from './ui/Icon';

interface IProps {
  filterNotifications: boolean;
  showAll: () => void;
  showUnread: () => void;
}

export class Notifications extends React.Component<IProps> {
  private containerRef: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount() {
    if (this.containerRef.current) {
      this.containerRef.current.focus();
    }
  }

  public render() {
    return (
      <div className="notifications">
        <div className="notificationFilter">
          <button
            onClick={this.props.showAll}
            className={classNames({
              active: !this.props.filterNotifications,
            })}
          >
            {!this.props.filterNotifications && (
              <Icon icon="arrow-right" />
            )}
            All notifications
          </button>
          <button
            onClick={this.props.showUnread}
            className={classNames({
              active: this.props.filterNotifications,
            })}
          >
            {this.props.filterNotifications && (
              <Icon icon="arrow-right" />
            )}
            Unread notifications
          </button>
        </div>
        <div
          className="notificationContainer scrollContainer"
          ref={this.containerRef}
          tabIndex={0}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

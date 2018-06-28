import * as classNames from 'classnames';
import * as React from 'react';
import * as Markdown from 'react-markdown';
import { Badge } from './ui/Badge';
import { Icon } from './ui/Icon';

interface IProps {
  active: boolean;
  title: string;
  type: string;
  icon: string;
  body?: string;
  url: string;
  reason: string;
  state?: string;
  closed?: boolean;
  merged?: boolean;
  updatedAt: string;
  author?: string;
  authorUrl?: string;
  authorAvatarUrl?: string;
  unread: boolean;
  repositoryName: string;
  repositoryUrl: string;
  onActivate: () => void;
  onDeactivate: () => void;
  markAsRead: () => void;
  mute: () => void;
}

interface IState {
  isActive: boolean;
  isHovered: boolean;
}

export class NotificationItem extends React.Component<IProps, IState> {
  public containerRef: React.RefObject<HTMLDivElement> = React.createRef();

  public state = {
    isActive: false,
    isHovered: false,
  };

  public onActivate = () => {
    if (this.props.active) {
      this.props.onDeactivate();
    } else {
      this.props.onActivate();
    }
  }

  public render() {
    if (this.props.active && this.containerRef.current && !this.state.isHovered) {
      this.containerRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
      });
    }

    return (
      <article
        className={classNames({
          notificationItem: true,
          notificationItem__unread: this.props.unread,
          notificationItem__active: this.props.active,
          notificationItem__isClosed: this.props.closed,
          notificationItem__isMerged: this.props.merged,
        })}
        onClick={this.onActivate}
        // onMouseLeave={this.onMouseLeave}
        ref={this.containerRef}
      >
        <Icon
          icon={this.props.icon}
          className="notificationItem__icon"
        />
        <div className="notificationItem__content">
          <h1>
            <a
              href={this.props.url}
              target="_blank"
              tabIndex={this.props.active ? 3 : -1}
            >
              {this.props.title}
              {this.props.closed && !this.props.merged && (
                <Badge type="danger">Closed</Badge>
              )}
              {this.props.merged && (
                <Badge type="success">Merged</Badge>
              )}
            </a>
          </h1>
          {this.props.body
          && !this.props.merged
          && (
            this.props.reason === 'mention'
            || this.props.reason === 'comment'
            || this.props.reason === 'state_change'
            || this.props.reason === 'review_requested'
            || this.props.reason === 'author'
          )
          && (
            <React.Fragment>
              <div className="notificationItem__quoteContainer">
                <p className="notificationItem__quote isTruncated">
                  <Markdown source={this.props.body} />
                </p>
              </div>
              <div className="notificationItem__quoteAuthor">
                <a
                  href={this.props.authorUrl}
                  target="_blank"
                  tabIndex={this.props.active ? 4 : -1}
                >
                  <img src={this.props.authorAvatarUrl} className="notificationItem__authorAvatar"  alt="" />
                  {this.props.author}
                </a>
              </div>
            </React.Fragment>
          )}
          <div className="notificationItem__footer">
            <a
              href={this.props.repositoryUrl}
              className="notificationItem__repository"
              target="_blank"
              tabIndex={this.props.active ? 5 : -1}
            >
              <Icon
                icon="arrow-right"
              />
              {' '}
              {this.props.repositoryName}
            </a>
            <div className="notificationItem__meta">
              <span className="capitalize">{this.props.reason}</span> – {this.props.updatedAt}
            </div>
          </div>
        </div>
        <div className="notificationItem__actionOverlay">
          <button
            tabIndex={this.props.active ? 1 : -1}
            onClick={() => this.props.mute()}
          >
            <Icon
              icon="volume-mute"
            />
          </button>
          <button
            tabIndex={this.props.active && this.props.unread ? 2 : -1}
            onClick={this.props.markAsRead}
            disabled={!this.props.unread}
          >
            <Icon
              icon="check"
            />
          </button>
        </div>
      </article>
    );
  }
}

import * as React from 'React';
import { Icon } from './ui/Icon';

interface IProps {
  url: string;
  avatarUrl: string;
  unreadCount: number;
  showMenu: () => void;
}

export class UserBanner extends React.Component<IProps> {
  public render() {
    return (
      <React.Fragment>
        <a
          href={this.props.url}
          target="_blank"
          className="header__profileLink"
          tabIndex={-1}
        >
          <img src={this.props.avatarUrl} className="header__avatar" />
          {this.props.unreadCount > 0 && (
            <span className="header__badge">{this.props.unreadCount}</span>
          )}
        </a>
        <button
          className="header__userMenu"
          onClick={this.props.showMenu}
        >
          <Icon icon="cog" />
        </button>
      </React.Fragment>
    );
  }
}

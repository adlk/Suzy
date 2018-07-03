import * as React from 'React';
import { Link } from 'react-router-dom';
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
        <Link
          to="/help"
          className="header__action--right header__help"
        >
          <Icon icon="question-circle" />
        </Link>
        <button
          className="header__action--right header__userMenu"
          onClick={this.props.showMenu}
        >
          <Icon icon="cog" />
        </button>
      </React.Fragment>
    );
  }
}

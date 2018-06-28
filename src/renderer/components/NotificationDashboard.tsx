import 'common/lib/FontAwesome';
import * as React from 'React';
import { NotificationsContainer } from '../container/NotificationsContainer';
import { UserBannerContainer } from '../container/UserBannerContainer';

export class NotificationDashboard extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <header className="header">
          <UserBannerContainer />
        </header>
        <main>
          <NotificationsContainer />
        </main>
      </React.Fragment>
    );
  }
}

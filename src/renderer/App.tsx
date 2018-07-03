import 'common/lib/FontAwesome';
import { stores } from 'common/stores';
import createHistory from 'history/createHashHistory';
import { Provider } from 'mobx-react';
import { syncHistoryWithStore } from 'mobx-react-router';
import * as React from 'React';
import { Route, Router } from 'react-router';
import { Help } from './components/Help';
import { NotificationDashboard } from './components/NotificationDashboard';
import { LoginContainer } from './container/LoginContainer';

import 'common/lib/menu';
import './styles/app.scss';

const browserHistory = createHistory();
const history = syncHistoryWithStore(browserHistory, stores.router);

export class App extends React.Component {
  public render() {
    return (
      <Provider stores={stores}>
        <Router history={history}>
          <React.Fragment>
            <Route exact path="/" component={NotificationDashboard} />
            <Route path="/help" component={Help} />
            <Route path="/login" component={LoginContainer} />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

window.app = stores;

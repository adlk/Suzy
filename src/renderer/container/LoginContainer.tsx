import { AuthStore } from 'common/stores/AuthStore';
import { remote } from 'electron';
import { inject, observer } from 'mobx-react';
import * as React from 'React';
import { Login } from '../components/Login';

interface IProps {
  stores: {
    auth: AuthStore;
  };
}

@inject('stores') @observer
export class LoginContainer extends React.Component<IProps> {
  public login() {
    const loginWindow = new remote.BrowserWindow({
      width: 600,
      height: 600,
    });

    // loginWindow.loadURL('https://github.com/login/oauth/authorize?scope=user:email&client_id=b7e48f1081caffd58eab');
    loginWindow.loadURL('http://localhost:3334/login');
    loginWindow.show();

    loginWindow.webContents.on('did-navigate', (e, url) => {
      const match = /.*token\/(.*)/g.exec(url);
      if (match && match[1]) {

        this.props.stores.auth.token = match[1];

        setTimeout(loginWindow.close, 500);
      }
    });
  }
  public render() {
    // const { auth } = this.props.stores;

    return (
      <Login
        openLoginWindow={() => this.login()}
      />
    );
  }
}

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

    let url = 'https://suzy.adlk.io/login';
    if (process.env.LOCAL_API) {
      url = 'http://localhost:3334/login';
    }

    loginWindow.loadURL(url);
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

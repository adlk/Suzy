import { Store } from 'common/lib/Store';
import { stores } from 'common/stores';
import { autorun, computed, observable } from 'mobx';

const TOKEN_KEY = 'githubToken';

export class AuthStore extends Store {
  @observable private tokenData: string | null = localStorage.getItem(TOKEN_KEY) || null;

  public setup() {
    autorun(() => this.requireAuthenticatedUser());
  }

  @computed public get token() {
    return this.tokenData || '';
  }
  public set token(token: string) {
    if (token) {
      this.tokenData = token;
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      this.tokenData = null;
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  public requireAuthenticatedUser() {
    const token = this.token;
    console.log('requireAuthenticatedUser', `"${token}"`);
    console.log(stores.router);

    // if (!stores.router.history) { return; }

    if (token) {
      console.log('push route to: app');
      stores.router.push('/');
    } else {
      console.log('push route to: login');
      stores.router.push('login');
    }
  }

  public logout() {
    console.log('logout');
    this.token = '';
  }
}

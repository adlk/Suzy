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

    if (token) {
      stores.router.push('/');
    } else {
      stores.router.push('login');
    }
  }

  public logout() {
    this.token = '';
  }
}

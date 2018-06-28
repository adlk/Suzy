import { RouterStore } from 'mobx-react-router';
import { AppStore } from './AppStore';
import { AuthStore } from './AuthStore';
import { ConfigStore } from './ConfigStore';
import { NotificationStore } from './NotificationStore';
import { UserStore } from './UserStore';

const router = new RouterStore();
const app = new AppStore();
const auth = new AuthStore();
const notifications = new NotificationStore();
const user = new UserStore();
const config = new ConfigStore();

export const stores = {
  router,
  auth,
  notifications,
  user,
  config,
  app,
};

type StoresType = typeof stores;

Object.keys(stores).map((key) => {
  const store = stores[key as keyof StoresType];

  if (!(store instanceof RouterStore)) {
    window.setTimeout(() => {
      store.setup();
    }, 100);
  }
});

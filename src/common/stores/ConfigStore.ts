import { Store } from 'common/lib/Store';
import { action, computed } from 'mobx';

interface IConfig {
  firstAppRun: Date | null;
  filterNotifications: boolean;
  [key: string]: any;
}

export class ConfigStore extends Store {
  private defaultValues: IConfig = {
    firstAppRun: null,
    filterNotifications: false,
  };

  @computed get config() {
    const config: IConfig = JSON.parse(localStorage.getItem('config') || JSON.stringify(this.defaultValues));

    return Object.assign(this.defaultValues, config);
  }

  @action.bound public set(key: string, value: any) {
    const config = Object.assign(this.config, {
      [`${key}`]: value,
    });

    localStorage.setItem('config', JSON.stringify(config));
  }
}

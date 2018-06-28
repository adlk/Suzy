import * as AutoLaunch from '@adlk/auto-launch';
import { ipcRenderer, remote, shell } from 'electron';
import { action, observable } from 'mobx';
import { Store } from '../lib/Store';
import { stores } from '../stores/index';

const { app } = remote;

const autoLauncher = new AutoLaunch({
  name: app.getName(),
});

export class AppStore extends Store {
  @observable public autoLaunchApp: boolean = true;
  public setup() {
    this.checkAutoStart();

    this.firstAppRun();

    ipcRenderer.send('autoUpdate.CheckForUpdates');
  }

  public openUrl(url: string) {
    if ('file://' === url.substr(0, 'file://'.length)) {
      return;
    }

    shell.openExternal(url);
  }

  @action public async enableAutoLaunch() {
    await autoLauncher.enable();

    this.checkAutoStart();
  }

  @action public async disableAutoLaunch() {
     await autoLauncher.disable();

     this.checkAutoStart();
  }

  @action private async checkAutoStart() {
    const isEnabled: boolean = await autoLauncher.isEnabled();

    this.autoLaunchApp = isEnabled;
  }

  private firstAppRun() {
    if (!stores.config.config.firstAppRun) {
      stores.config.set('firstAppRun', new Date());
      autoLauncher.enable();
    }
  }
}

import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import { IIPCParams } from './index';

export const updater = (params: IIPCParams) => {
  ipcMain.on('autoUpdate.CheckForUpdates', (e: Electron.IpcMessageEvent) => {
    autoUpdater.checkForUpdatesAndNotify();
  });
};

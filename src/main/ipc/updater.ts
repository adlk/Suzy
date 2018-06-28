import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import { IIPCParams } from './index';

export const trayIcon = (params: IIPCParams) => {
  ipcMain.on('autoUpdate.CheckForUpdates', (e: Electron.IpcMessageEvent) => {
    autoUpdater.checkForUpdatesAndNotify();
  });
};

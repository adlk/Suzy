import { BrowserWindow, Tray } from 'electron';
import { trayIcon } from './trayIcon';
import { updater } from './updater';

export interface IIPCParams {
  window: BrowserWindow;
  trayIcon: Tray;
}

export const ipcApi = (params: IIPCParams) => {
  trayIcon(params);
  updater(params);
};

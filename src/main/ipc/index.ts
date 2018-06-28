import { BrowserWindow, Tray } from 'electron';
import { trayIcon } from './trayIcon';

export interface IIPCParams {
  window: BrowserWindow;
  trayIcon: Tray;
}

export const ipcApi = (params: IIPCParams) => {
  trayIcon(params);
};

import { ipcMain, nativeImage } from 'electron';
import path from 'path';
import { IIPCParams } from './index';

export const trayIcon = (params: IIPCParams) => {
  ipcMain.on('getUnreadNotifications', (e: Electron.IpcMessageEvent, count: number ) => {
    const image = count > 0 ? 'tray_unread.png' : 'tray.png';

    const icon = nativeImage.createFromPath(path.join(__static, 'images', image)).resize({
      height: 15,
    });

    params.trayIcon.setImage(icon);
    params.trayIcon.setTitle(count > 0 ? count.toString() : '');
  });
};

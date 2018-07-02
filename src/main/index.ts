import {
  app,
  BrowserWindow,
  globalShortcut,
  Menu,
  nativeImage,
  screen,
  shell,
  Tray,
} from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';
import { ipcApi } from './ipc';

const isDevelopment = process.env.NODE_ENV !== 'production';

const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 600;
const HORIZ_PADDING = 20;
const VERT_PADDING = 0;

const GLOBAL_TOGGLE_ACCELERATOR = 'CmdOrCtrl+Ctrl+Shift+G';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | null = null;
let trayIcon: Tray | null = null;

function createMainWindow() {
  const window = new BrowserWindow({
    frame: false,
    transparent: true,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    maxWidth: WINDOW_WIDTH,
    maxHeight: WINDOW_HEIGHT,
    minWidth: WINDOW_WIDTH,
    minHeight: WINDOW_HEIGHT,
    show: false,
    webPreferences: {
      webSecurity: isDevelopment ? false : true,
    },
  });

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    }));
  }

  const icon = nativeImage.createEmpty();

  trayIcon = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click: () => trayIcon!.emit('click'),
      accelerator: GLOBAL_TOGGLE_ACCELERATOR,
    },
    {
      label: 'Quit',
      click: () => app.quit(),
      accelerator: 'CmdOrCtrl+Q',
    },
  ]);
  // trayIcon.setContextMenu(contextMenu);

  trayIcon.on('click', (event, bounds) => {
    if (window.isVisible && window.isFocused()) {
      window.hide();
    } else {
      window.show();
    }

    positionWindow(window, bounds);
  });

  trayIcon.on('right-click', (event, bounds) => {
    trayIcon!.popUpContextMenu(contextMenu);
  });

  if (process.platform === 'darwin' && !isDevelopment) {
    app.dock.hide();
  }

  // Events
  window.once('ready-to-show', () => {
    window.show();
  });

  window.on('closed', () => {
    mainWindow = null;
  });

  window.webContents.on('new-window', (e, url) => {
    e.preventDefault();

    if ('file://' === url.substr(0, 'file://'.length)) {
      return;
    }

    shell.openExternal(url);
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  ipcApi({
    window,
    trayIcon,
  });

  return window;
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow();

  globalShortcut.register(GLOBAL_TOGGLE_ACCELERATOR, () => {
    if (!mainWindow || !trayIcon) { return; }

    trayIcon.emit('click');
  });
});

function positionWindow(window: BrowserWindow, bounds: Electron.Rectangle) {
  const pos = bounds || screen.getCursorScreenPoint();
  const primarySize = screen.getPrimaryDisplay().workAreaSize;
  const trayPositionVert = pos.y >= primarySize.height / 2 ? 'bottom' : 'top';
  const trayPositionHoriz = pos.x >= primarySize.width / 2 ? 'right' : 'left';
  window.setPosition(getTrayPosX(), getTrayPosY());

  function getTrayPosX() {
    const horizBounds = {
      left: pos.x - WINDOW_WIDTH / 2,
      right: pos.x + WINDOW_WIDTH / 2,
    };
    if (trayPositionHoriz === 'left') {
      return horizBounds.left <= HORIZ_PADDING ? HORIZ_PADDING : horizBounds.left;
    } else {
      return horizBounds.right >= primarySize.width ? primarySize.width - HORIZ_PADDING - WINDOW_WIDTH : horizBounds.right - WINDOW_WIDTH;
    }
  }

  function getTrayPosY() {
    return trayPositionVert === 'bottom' ? pos.y - WINDOW_HEIGHT - VERT_PADDING : pos.y + VERT_PADDING;
  }
}

import { remote } from 'electron';

const { app, Menu } = remote;

const template: any = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
    ],
  },
  {
    label: 'View',
    submenu: [
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
    ],
  },
  {
    label: 'Notifications',
    submenu: [
      {
        label: 'Show all notifications',
        accelerator: 'CmdOrCtrl+A',
        click: () => {
          window.app.notifications.showAll();
        },
      },
      {
        label: 'Show only unread notifications',
        accelerator: 'CmdOrCtrl+E',
        click: () => {
          window.app.notifications.showUnread();
        },
      },
      {
        label: 'Previous notification',
        accelerator: 'Up',
        click: () => {
          window.app.notifications.selectPrevious();
        },
      },
      {
        label: 'Next notification',
        accelerator: 'Down',
        click: () => {
          window.app.notifications.selectNext();
        },
      },
      { type: 'separator' },
      {
        label: 'Open in browser',
        accelerator: 'Right',
        click: () => {
          window.app.notifications.openActive();
        },
      },
      { type: 'separator' },
      {
        label: 'Mark as read',
        accelerator: 'Left',
        click: () => {
          window.app.notifications.markAsReadActive();
        },
      },
      {
        label: 'Mute',
        accelerator: 'Backspace',
        click: () => {
          window.app.notifications.unsubscribeActive();
        },
      },
      { type: 'separator' },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: () => {
          window.app.notifications.reload();
        },
      },
    ],
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' },
    ],
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() { require('electron').shell.openExternal('https://electronjs.org'); },
      },
    ],
  },
];

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' },
    ],
  });

  // Edit menu
  template[1].submenu.push(
    { type: 'separator' },
    {
      label: 'Speech',
      submenu: [
        { role: 'startspeaking' },
        { role: 'stopspeaking' },
      ],
    },
  );

  // Window menu
  template[4].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' },
  ];
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

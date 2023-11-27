"use strict";
const electron = require("electron");
const path = require("path");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
let win;
const createWindow = () => {
  win = new electron.BrowserWindow({
    width: 1200,
    height: 760,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (electron.app.isPackaged) {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    win.loadURL(`http://localhost:3344/`);
    win.webContents.openDevTools();
    electron.ipcMain.on("message", (_, num) => {
      console.log(num, "测试中文");
    });
    setTimeout(() => {
      win == null ? void 0 : win.webContents.send("load", { message: "electron初始化了" });
    }, 5e3);
  }
};
electron.app.whenReady().then(() => {
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("will-quit", () => {
  electron.globalShortcut.unregisterAll();
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin")
    electron.app.quit();
});
electron.ipcMain.on("show-dialog", () => {
  electron.dialog.showMessageBox({
    type: "info",
    title: "Mr. Ma's Blog 博主",
    message: "我的 Github 是 https://github.com/changbin1997",
    buttons: ["确定", "取消"]
  });
});

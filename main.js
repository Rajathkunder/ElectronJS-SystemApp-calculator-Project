const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");

let mainWindow;
let tray = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Create a system tray icon
  tray = new Tray(path.join(__dirname, "./google.png"));
  tray.setToolTip("Love Calculator By Rajath");

  // Add right-click context menu
  const contextMenu = Menu.buildFromTemplate([
    { label: "Open", click: () => mainWindow.show() },
    { label: "Quit", click: () => app.quit() },
  ]);

  tray.setContextMenu(contextMenu);

  // Toggle window visibility when clicking on the tray icon
  tray.on("click", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 860,
    height: 860,
    minWidth: 420,
    minHeight: 420,
    transparent: true,
    frame: false,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: -100, y: -100 },
    backgroundColor: '#00000000',
    hasShadow: false,
    resizable: true,
    movable: true,
    fullscreenable: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow.loadFile(path.join(__dirname, 'index.html'))

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()

  globalShortcut.register('Escape', () => {
    if (mainWindow) {
      mainWindow.close()
    }
  })

  globalShortcut.register('CommandOrControl+Shift+T', () => {
    if (!mainWindow) {
      return
    }

    mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop(), 'screen-saver')
  })
})

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll()
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

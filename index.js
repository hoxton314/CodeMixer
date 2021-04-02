const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const fs = require('fs');
const os = require('os');

let win


function createWindow() {
    win = new BrowserWindow({
        frame: false,
        width: 960 + 100,
        height: 670 + 100,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            devTools: true,
            enableRemoteModule: true,
        }
    })

    win.loadURL(`file://${__dirname}/index.html`);
    win.once('ready-to-show', function () {
        win.show()
    })
    win.setResizable(false)



    win.on('closed', function () {
        win = null
    })
}

exports.handleForm = function handleForm(targetWindow, firstname) {
    console.log("this is the firstname from the form ->", firstname)
    targetWindow.webContents.send('form-received', "we got it");
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

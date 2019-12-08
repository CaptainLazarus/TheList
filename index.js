const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const fs = require('fs');

var list;

function createWindow () {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile("index.html")
}

app.on('ready' , createWindow);

function createList(x){
    for (var i in x){
        var ele = document.createElement("p");
        var t = document.createTextNode(x[i]);
        ele.appendChild(t);
        var div = document.getElementById("mainBody");
        div.appendChild(ele);
    }
}

function getDatabase(id) {
    fs.readFile(__dirname + '/data.json' , function getData(err , data) {
        if(err){
            throw err;
        } 
        var x = JSON.parse(data);
        x = x[id];
        createList(x);
    });
}
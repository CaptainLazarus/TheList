const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const fs = require('fs');

var list;

function addWindow(){
    location.assign("add.html");
}

function addToList() {
    var x , type;
    var radioGroup = document.getElementsByName("category");
    var text = document.getElementById("tf").value;
    // alert(text);
    var i;
    for (i=0 ; i < radioGroup.length ; i++){
        if(radioGroup[i].checked){
            type = radioGroup[i].value;
            // alert(type);
        }
    }

    fs.readFile(__dirname + '/data.json' , function getData(err , data) {
        if(err){
            throw err;
        } 
        x = JSON.parse(data);
        // alert(JSON.stringify(x));
        x[type].push(text);
        // alert(JSON.stringify(x));
        fs.writeFileSync(__dirname + '/data.json' ,  JSON.stringify(x));
        location.assign("index.html");
        createList(x[type]);
    });
}

function createList(list){
    
    var body = document.getElementById("mainBody");
    var item=0;
    while (body.childElementCount){
        body.removeChild(body.childNodes[item]);    
    }

    for (item in list){
        var listEl = document.createElement("div");
        var para = document.createElement("p");
        var button = document.createElement("button");
        //var text = document.;
        var text = document.createTextNode(list[item]);
        para.appendChild(text);
        listEl.appendChild(para);
        listEl.appendChild(button);
        var div = document.getElementById("mainBody");
        div.appendChild(listEl);
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

function createWindow () {
    let win = new BrowserWindow({
        width: 1200,
        height: 1200,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile("index.html");
}

app.on('ready' , createWindow);
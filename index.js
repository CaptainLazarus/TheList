const electron = require('electron');
const {app, BrowserWindow , globalShortcut} = require('electron');
const fs = require('fs');

var list;

function addWindow(){
    location.assign("add.html");
}

function goBack(){
    location.assign("index.html");
}

function deleteItem(e){
    fs.readFile(__dirname + "/data.json" , function removeData(err , data) {
        if(err) throw err;
        x = JSON.parse(data);
        var type = e.getAttribute("category");
        x[type] = x[type].filter(i => i != e.innerText);
        fs.writeFileSync(__dirname + '/data.json' ,  JSON.stringify(x));
        e.remove();
    });


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

function createList(list ,  id){
    var body = document.getElementById("mainBody");
    var item=0;
    while (body.childElementCount){
        body.removeChild(body.childNodes[item]);    
    }
    for (item in list){
        var listEl = document.createElement("div");
        var butt = document.createElement("button");
        // var buttonClass = document.createAttribute("class");
        // var onclick = document.createAttribute("onclick");
        
        butt.setAttribute("category" , id);
        butt.setAttribute("class" , "item");
        butt.setAttribute("onclick" , "deleteItem(this)");

        var text = document.createTextNode(list[item]);
        butt.appendChild(text);
        listEl.appendChild(butt);
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
        createList(x , id);
    });
}



function createWindow (register) {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        // frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile("index.html");
    globalShortcut.register('Right', ()=>{
        win.loadFile("add.html");
    }
    )
    globalShortcut.register('Left', ()=>{
        win.loadFile("index.html");
    })
}


app.on('ready' , createWindow);
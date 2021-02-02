//Declaring constants
const fs = require("fs");
const http = require("http")
const express = require("express")
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const events = require('events');
const event = new events.EventEmitter();
const pug = require("pug");
const indent = require("indent-string")
const mail = require("nodemailer")
const bodyParser = require("body-parser");
const request = require("request")

//Used for getting POST data from requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Creating all pug functions

//Home
var homeFun
fs.readFile(__dirname+"/pug/home.pug", "utf8", (err, data)=>{
    homeFun=pug.compile(data)
    console.log(data)
})

//Start server
server.listen(3001, _=>{
    console.log("listening")
});

app.get("/auto", (req, res)=>{
    res.send(homeFun())
})

app.get("/comp_sci", (req, res) => {
    res.send("<html><head><title>Final Exam</title><meta name='viewport' content='width=device-width, initial-scale=1.0'></head><body style='text-align:center;'><h1>Why I enjoyed this class:</h1><ol><li>I like computer science a lot</li><li>Mr. Edmiston is a good teacher</li></ol><p>Thank you for teaching this class Mr. Edmiston<br />Ethan Ermovick</p><img src='https://cdn-images-1.medium.com/max/1600/0*WW-iV1yoPWqUcd5H.'></body></html>")
})


//Relays requets to raspberry pi to control door
app.post("/auto/open", (req,res)=>{
    res.send("Opening the door.");
    request("http://192.168.1.191/open", {json: false}, (err, res, body) => {
        if (err) {return console.log(err)}
    })
})

app.post("/auto/close", (req,res)=>{
    res.send("Closing the door.");
    request("http://192.168.1.191/close", {json: false}, (err, res, body) => {
        if (err) {return console.log(err)}
    })
})
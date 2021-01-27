console.log("Server started.");
var fs = require("fs");
var http = require('http')
var server = http.createServer(handler);
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var events = require('events');
var eventEmitter = new events.EventEmitter();
var light_pin = new Gpio(14, 'out');
light_pin.writeSync(0);
server.listen(100);
function sleep(ms) {
  var start = new Date().getTime();
  while( ms > ( new Date().getTime() - start ) ){}
}

function handler (req, res) { //create server
  if (req.url === "/light/on"){
    light_pin.writeSync(1);
    res.end("light turned on");
    console.log("light turned on");
  }
  else if (req.url === "/light/off"){
    light_pin.writeSync(0);
    res.end("light turned off");
    console.log("light turned off");
  }
}
/*io.sockets.on('connection', function (socket) {// WebSocket Connection
    console.log("connected");
    eventEmitter.on("changep", function(){
        socket.emit("changeP");
        console.log("changeP emitted");
    });
});*/

io.on('connection', function (socket) {
  console.log("Connected");
});

process.on('SIGINT', function () { //on ctrl+c
  console.log("\nServer ended.");
  light_pin.writeSync(0); // Turn light off
  light_pin.unexport(); // Unexport light GPIO to free resources
  process.exit(); //exit completely
});

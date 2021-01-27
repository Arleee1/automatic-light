console.log("Server started.");
var http = require('http')
var server = http.createServer(handler);
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var light_pin = new Gpio(14, 'out');
light_pin.writeSync(1);
server.listen(100);

function handler (req, res) { //create server
  if (req.url === "/light/on"){
    light_pin.writeSync(0);
    res.end("light turned on");
    console.log("light turned on");
  }
  else if (req.url === "/light/off"){
    light_pin.writeSync(1);
    res.end("light turned off");
    console.log("light turned off");
  }
}

process.on('SIGINT', function () { //on ctrl+c
  console.log("\nServer ended.");
  light_pin.writeSync(0); // Turn pin off
  light_pin.unexport(); // Unexport light GPIO to free resources
  process.exit(); //exit completely
});

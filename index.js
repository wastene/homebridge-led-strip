var rpio = require('rpio');
var fs = require('fs');
var Service, Characteristic;
var path = "/var/homebridge/.pin";

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-ledstrip", "ledStrip", LedAccessory);
}

function LedAccessory(log, config) {
  this.log = log;
  this.config = config;
  this.name = config["name"];
  this.pin = config["pin"];

  rpio.init({mapping: 'gpio'});

  this.service = new Service.Lightbulb(this.name);

  this.service
    .getCharacteristic(Characteristic.On)
    .on('get', this.getOn.bind(this))
    .on('set', this.setOn.bind(this));
  
  try {
    this.FileOn = fs.readFileSync(path + this.pin);
    this.log("ReadFile : " + this.FileOn + " Pin: " + this.pin);
  }
  catch(err) { 	// If File doesn't exists
    this.log("Error at read File");
    this.FileOn = 0;
  }
  this.FileOn = parseInt(this.FileOn);
  rpio.open(this.pin, rpio.OUTPUT,this.FileOn);
}
LedAccessory.prototype.getServices = function() {
  return[this.service];
}

LedAccessory.prototype.getOn = function(callback){
  var on = rpio.read(this.pin);
  this.log("Led-State: "+on);
  callback(null, on);
}
LedAccessory.prototype.setOn = function(on, callback) {
  this.log("Setting power to "+ on);
  rpio.write(this.pin, on);
  fs.writeFile(path + this.pin, on,{flag: "w"}, function(err){
	if(err){
	   console.log(err);
	}
	console.log("Done");
  });
  callback();
}

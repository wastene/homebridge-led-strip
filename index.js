var rpio = require('rpio');
var fs = require('fs');
var Service, Characteristic;
var pathPinSuf = ".pin";

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-ledstrip", "ledStrip", LedAccessory);
}

function LedAccessory(log, config) {
  this.log = log;
  this.config = config;
  this.name = config["name"] || "Led-Strip";
  this.pin = config["pin"];
  this.backup = config["backup"] || "/var/homebridge/";
  this.map = config["mapping"] || "gpio";
  
  
  if(backup != "none"){
	this.backupBool = 1;
	this.backupPath = this.backup + this.pathPinSuf + this.pin;
  }else{
	this.backupBool = 0;  
  }
  
  
  if(this.map != "physical" && this.map != "gpio"){
	  this.map = "gpio";
  }
 

  rpio.init({mapping: this.map});

  this.service = new Service.Lightbulb(this.name);

  this.service
    .getCharacteristic(Characteristic.On)
    .on('get', this.getOn.bind(this))
    .on('set', this.setOn.bind(this));
	
  if(backupBool){
	  try {
		this.FileOn = fs.readFileSync(this.backupPath);
		this.log("ReadFile : " + this.FileOn + " Pin: " + this.pin);
	  }
	  catch(err) { 	// If File doesn't exists
		this.log("Error at read File");
		this.FileOn = 0;
	  }
	  this.FileOn = parseInt(this.FileOn);
  }else{
	  this.FileOn = 0;
  }
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
  if(backupBool){
    fs.writeFile(this.backupPath, on,{flag: "w"}, function(err){
	  if(err){
	     console.log(err);
	  }
	  console.log("Done");
    });
  }
  callback();
}

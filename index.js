var Service, Characteristic;
//var Gpio = require('pigpio').Gpio;
var max = 255;

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
	this.brightness = config["brightness"] || 0;	// If true, then use pigpio to regulate the brightness (need root)
							// If false, then use rpio just to turn on and off
	

  	this.service = new Service.Lightbulb(this.name);

  	this.service
  	  	.getCharacteristic(Characteristic.On)
  	  	.on('get', this.getOn.bind(this))
  	  	.on('set', this.setOn.bind(this));

	if(this.brightness){
		this.Gpio = require('pigpio').Gpio;
                this.led = new this.Gpio(this.pin, {mode:this.Gpio.OUTPUT});
                this.status = 0;
                this.dutyCycle = parseInt(max/2);

		this.service
			.addCharacteristic(new Characteristic.Brightness())
			.on('get',this.getBrightness.bind(this))
			.on('set',this.setBrightness.bind(this));
        }else {
		this.rpio = require('rpio');
		this.rpio.init({mapping:'gpio'});
		this.rpio.open(this.pin, this.rpio.OUTPUT);	
        }

}
LedAccessory.prototype.getServices = function() {
	return[this.service];
}

LedAccessory.prototype.getOn = function(callback){
	var on;
	if(this.brightness){
		on = this.status;	
	}else {
		on = this.rpio.read(this.pin);
	}	
	callback(null, on);
}
LedAccessory.prototype.setOn = function(on, callback) {
  	this.log("Setting power to "+ on);

	if(this.brightness){
		if(on){
			this.led.pwmWrite(parseInt(this.dutyCycle));
		}else {
			this.led.digitalWrite(0);
		}
		this.status = on;
	}else {
		this.rpio.write(this.pin,on);
	}
  	callback();
}

LedAccessory.prototype.getBrightness = function(callback){
	callback(null, (this.dutyCycle/max)*100);
}
LedAccessory.prototype.setBrightness = function(brightness, callback){
	this.dutyCycle = parseInt((brightness/100)*max);

	this.led.pwmWrite(parseInt(this.dutyCycle));
	callback();
}

homebridge-ledstrip
===================

Switch Led's with Homebridge at GPIO-Pins. Can change Brightness as well, but homebridge need to run as root.

https://www.npmjs.com/package/homebridge-led-strip

## Install

```console
 npm install homebridge-led-strip
```


## Usage

config.json sample:

```json
"accessories": [
   {
       	"accessory": "ledStrip",
       	"name": "Blue",
       	"pin": 18,
       	"brightness": 1
   }
]
```
You need declare a pin to use this plugin.

With brightness you specify if you want to use the brightness function on your leds.
When you set brightness to 1 or true, homebridge must run as root, if otherwise it must not run as root.

If you use the brightness function you must follow the installation steps for "pigpio"
https://www.npmjs.com/package/pigpio  
https://github.com/fivdi/pigpio  


Default Values for config.json:
name: 		"Led-Strip"
brightness:	false		


## Other Information

My Homepage:

http://a-berisha.de


This Plugin use the "rpio" - Module from "jperkin":

https://www.npmjs.com/package/rpio  
https://github.com/jperkin/node-rpio  


This Plugin use the "pigpio" - Module from "fivdi":

https://www.npmjs.com/package/pigpio
https://github.com/fivdi/pigpio

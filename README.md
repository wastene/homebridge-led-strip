homebridge-ledstrip
===================

Switch Led's with Homebridge at GPIO-Pins. If Homebridge restarts Led's are still on, because it's stored on /var/homebridge/ (e.g. at "/var/homebridge/.pin18").

https://www.npmjs.com/package/homebridge-led-strip

## Install

```console
 npm install homebridge-ledstrip
```


## Usage

config.json sample:

```json
"accessories": [
   {
       	"accessory": "ledStrip",
       	"name": "Blue",
       	"pin": 18,
       	"backup": "/var/homebridge/",
       	"mapping": "gpio"
   }
]
```
You need declare a pin to use this plugin.
For backup you can specify a location, where to save the backup's of the pins. If you don't need any backups, type in "none".
The Led-State's are saved under your backup-path under ".pin" and then your pin number.
For mapping there are 2 alternatives. The first, the default one is "gpio" and the other is "physical".

Default Values for config.json:
name: 		"Led-Strip"
backup: 	"/var/homebridge/"
mapping: 	"gpio" 


## Other Information

My Homepage:

http://a-berisha.de


This Plugin use the "rpio" - Module from "jperkin":

https://www.npmjs.com/package/rpio  
https://github.com/jperkin/node-rpio  

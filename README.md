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
       "pin": 18
   }
]
```
My Homepage:

http://a-berisha.de

This Plugin use the "rpio" - Module from "jperkin":

https://www.npmjs.com/package/rpio  
https://github.com/jperkin/node-rpio

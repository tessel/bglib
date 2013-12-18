###BGLib
BGLib is a JavaScript library for BlueGiga BLE devices. It is still under heavy development and will likely not work as intended for a while. It is currently being developed by Technical Machine to support our Tessel BLE module.

I still need to replace bitwise functions with Buffers once those are fully functional on Tessel.

###Install
```
npm install bglib
```


###Examples

#Creating a packet

```
var bglib = new require('bglib').bglib();

bglib.getPacket(bglib.api.systemHello); // Returns [0, 0, 0, 1]

bglib.getPacket(bglib.api.gapDiscover, [1, 0], function(err, response) {
	console.log("Packet: ", response);
})

#Parsing Incoming Data

```
var bglib = new require('bglib').bglib();

var incomingBytes = [0, 0, 0, 1];

bglib.parseIncoming(incomingBytes, function(err, parsedPackets) {
	console.log("Parsed packets: ", parsedPackets);
})

```

The library will hold the current state of the packets so you can pass in pieces of a packet and it will return the entire parsed packet when it has all been passed in.
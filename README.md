##BGLib
BGLib is a Node library for sending and receiving packets from BlueGiga BLE devices (currently supports ble112 and ble113). It is currently being developed by Technical Machine to support our Tessel BLE module.

##Install
```
npm install bglib
```


##Examples

###Creating a packet

```
var bg = require('bglib');

var bglib = new bg()
bglib.getPacket(bg.api.systemHello, function(err, packet) {
  console.log(packet.getByteArray()); // Returns buf< 0, 0, 0, 1 >
}); 

// Use Packet Mode if you don't have flow control
// It adds a length byte to the front of every packet
bglib.setPacketMode(true);

bglib.getPacket(bg.api.systemHello, function(err, packet) {
  console.log(packet.getByteArray()); // Returns buf< 4, 0, 0, 0, 1 >
});

bglib.getPacket(bg.api.gapDiscover, [1, 0], function(err, response) {
  bglib.getPacket(bg.api.systemHello, function(err, packet) {
  console.log(packet); 
  /* Returns { mType: 0,
  tType: 0,
  payloadHighBits: 0,
  payloadLowBits: 0,
  cClass: 0,
  cID: 1,
  payload: <Buffer >,
  packetMode: true,
  callback: null }
  */
});
```
###Parsing Incoming Data

```
var incomingBytes = new Buffer([ 128, 38, 6, 0, 189, 0, 108, 189, 40, 93, 28, 216, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 56, 88, 171, 173, 5, 22, 10, 24, 7, 4]);

bglib.parseIncoming(incomingBytes, function(err, parsedPackets) {
  console.log("Parsed packets: ", parsedPackets);

  // BGLib will automatically parse each packet into the values stated by the datasheet
  // depending on what type of event/response it is. Below is an example for the discovered
  // peripheral event that was passed in:
  console.log(parsedPackets[0].response.packet_type) // 0
  console.log(parsedPackets[0].response.sender) //  buf< 108, 189, 40, 93, 28, 216>
  console.log(parsedPackets[0].response.address_type) // 1
  console.log(parsedPackets[0].response.bond) // 255
  console.log(parsedPackets[0].response.data) //  data object with flag types, raw data, etc
  console.log(parsedPackets[0].rssi) // -67
});
```

The library will hold the current state of the packets so you can pass in pieces of a packet and it will return the entire parsed packet when it has all been passed in.

###Thanks
JRowberg deserves a special shout-out. Some of the code is modeled after [his Arduino bglib work](https://github.com/jrowberg/bglib).

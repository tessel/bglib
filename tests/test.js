var bgLib = require('../');
var lib = new bgLib.BGLib(bgLib.PACKET_MODE);

console.assert(lib, "Lib wasn't made correctly.");

lib.getPacket(lib.api.gapSetMode, [1, 2], function(err, response) {
	if (err) throw err;
	else console.log("Got a response: ", response);
});

// lib.parseIncoming([128,7,7,0,36,219,3,0,1,16,16,0,12,0,8,1,0,2,0,0,0,88,0,3,0,1,1,0,0,0,1],
// 	function(err, parsedPackets) {

// 	console.assert(parsedPackets.length == 3, "Packets were not parsed correctly.");

// 	console.assert(parsedPackets[1].response.major);

// });


// console.log("All tests passed.")
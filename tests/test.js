var bgLib = require('../');
var lib = new bgLib.BGLib(bgLib.PACKET_MODE);

console.assert(lib, "Lib wasn't made correctly.");

lib.getPacket(lib.api.systemReset, [0], function(err, response) {
	if (err) throw err;
	else console.log("Got a response: ", response);
});

lib.parseIncoming([128,7,7,0,67,104,0,0,1,16,16,0,0,0,1 ],
	function(err, parsedPackets) {
	if (err) throw err;

	console.log(parsedPackets);

});


console.log("All tests passed.")
var bgLib = require('../');
var lib = new bgLib.bglib(bgLib.PACKET_MODE);

console.assert(lib, "There was an error on lib import");

lib.parseIncoming([ 0, 2, 6, 2, 0],
	function(err, parsedPackets) {
	if (err) return console.log(err);

	console.log(parsedPackets);

});
// lib.parseIncoming([128, 12, 0, 0, 1, 0, 2, 0, 1, 0, 91, 0, 3, 0, 1, 6],
// 	function(err, parsedPackets) {
// 	if (err) return console.log(err);

// 	console.log(parsedPackets);

// });


console.log("All tests passed.")
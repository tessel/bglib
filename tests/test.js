var bgLib = require('../');
var lib = new bgLib.bglib(bgLib.PACKET_MODE);

console.assert(lib, "There was an error on lib import");

lib.parseIncoming([ 128, 7, 7, 0, 179, 48, 3, 0, 1, 16, 19, 0, 2],
	function(err, parsedPackets) {
	if (err) return console.log(err);

	console.log(parsedPackets);

});
lib.parseIncoming([128, 12, 0, 0, 1, 0, 2, 0, 1, 0, 91, 0, 3, 0, 1, 6],
	function(err, parsedPackets) {
	if (err) return console.log(err);

	console.log(parsedPackets);

});


console.log("All tests passed.")
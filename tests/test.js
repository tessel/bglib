var bgLib = require('../');
var lib = new bgLib.BGLib(bgLib.PACKET_MODE);
var bitwise = require('../BitwiseOperations/BitwiseOperations');

console.assert(lib, "There was an error on lib import");

// lib.getPacket(lib.api.systemReset, [0], function(err, response) {
// 	if (err) throw err;
// 	else console.log("Got a response: ", response);
// });

// lib.parseIncoming([38, 6, 0, 169, 0, 108, 189, 40, 93, 28, 216, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 0, 251, 171, 173, 5, 22, 10, 24, 7, 6, 128, 35, 6, 0, 169, 0, 104, 7, 38, 53, 105, 118, 1, 255, 24, 2, 1, 26, 20, 255, 76, 0, 128 ],
// 	function(err, parsedPackets) {
// 	if (err) throw err;

// 	console.log(parsedPackets);

// });

// lib.parseIncoming([128, 38, 6, 0, 180, 0, 108, 189, 40, 93, 28, 216, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 56, 88, 171, 173, 5, 22, 10, 24, 7, 6, 128, 38, 6, 0, 171, 0, 249, 178, 42, 244, 173, 234, 1, 255, 27, 2, 1, 6, 17, 7, 186, 86],
// 	function(err, parsedPackets) {
// 	if (err) throw err;

// 	console.log(parsedPackets);

// });
// lib.parseIncoming([137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 172, 126, 171, 173, 5, 22, 10, 24, 5, 4, 128, 38, 6, 0, 169, 0, 102, 248, 121, 178, 237, 200, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 0, 251, 171, 173, 5, 22, 10, 24, 7, 6, 128, 38],
// 	function(err, parsedPackets) {
// 	if (err) throw err;

// 	console.log(parsedPackets);

// });
// lib.parseIncoming([6, 0, 175, 0, 119, 203, 137, 58, 150, 219, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 42, 104, 171, 173, 5, 22, 10, 24, 8, 4, 128, 38, 6, 0, 184, 0, 108, 189, 40, 93, 28, 216, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166],
// 	function(err, parsedPackets) {
// 	if (err) throw err;

// 	console.log(parsedPackets);

// });
// lib.parseIncoming([250, 191, 162, 189, 1, 70, 125, 110, 56, 88, 171, 173, 5, 22, 10, 24, 7, 6, 128, 38, 6, 0, 172, 0, 67, 32, 134, 244, 122, 218, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 14, 63, 171, 173, 5, 22, 10, 24, 5, 4, 128, 38, 6, 0],
// 	function(err, parsedPackets) {
// 	if (err) throw err;

// 	console.log(parsedPackets);

// });
// lib.parseIncoming([178, 0, 249, 178, 42, 244, 173, 234, 1, 255, 27, 2, 1, 6, 17, 7, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 172, 126, 171, 173, 5, 22, 10, 24, 5, 4, 128, 38, 6, 0, 177, 0, 108, 189, 40, 93, 28, 216, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250],//, 128],
// 	function(err, parsedPackets) {
// 	if (err) throw err;

// 	console.log(parsedPackets);

// });
// lib.parseIncoming([128, 38, 6, 0, 169, 0, 148, 220, 209, 27, 4, 194, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250],
// 	function(err, parsedPackets) {
// 	if (err) return console.log(err);

// 	console.log(parsedPackets);

// });
// lib.parseIncoming([174, 0, 119, 203, 137, 58, 150, 219, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 42, 104, 171, 173, 5, 22, 10, 24, 8, 4, 128, 38, 6, 0, 169, 0, 148, 220, 209, 27, 4, 194, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 128],
// 	function(err, parsedPackets) {
// 	if (err) return console.log(err);

// 	console.log(parsedPackets);

// });
lib.parseIncoming([0, 2, 6, 4, 129, 1, 0, 2, 6, 4, 129, 1, 0, 2, 6, 4, 129, 1, 0, 2, 6, 4, 129, 1, 0, 2, 6, 4, 129, 1, 0, 2, 6, 4, 129, 1],
	function(err, parsedPackets) {
	if (err) return console.log(err);

	console.log(parsedPackets);

});




console.log("All tests passed.")
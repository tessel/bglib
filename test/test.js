// Copyright 2014 Technical Machine, Inc. See the COPYRIGHT
// file at the top-level directory of this distribution.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

// An embarrasingly unexhaustive test of bglib functionality
var assert = require('assert');

var bg = require('../bglib');
bglib = new bg();
bglib.setPacketMode(1);

assert(bglib, "BGLib could not be imported...");

// Packet Creation:
bglib.getPacket(bg.api.systemHello, function(err, response) {
	assert(!err, "Error creating the simple hello packet.");
	assert(response.cID == 1 
		&& response.cClass == 0, "Invalid packet created.");
	console.log("Simple Packet Creation Passed.")
});

bglib.getPacket(bg.api.gapConnectDirect, [new Buffer([108, 189, 40, 93, 28, 216]), 1, 25, 50, 500, 8], function(err, response) {
	assert(!err, "Error creating the complex connect packet.");
	assert(response.cID == 3 
		&& response.cClass == 6, "Invalid packet created.");
	console.log("Packet", response);
	console.log("Complex Packet Creation Passed.");
});

bglib.getPacket(bg.api.systemHello, ["Invalid", "params"], function(err, response) {
	assert(err, "Unable to detect invalid number of parameters.");
	console.log("Detecting Too Few Parameters Passed.")
});

assert.throws(function() {
	bglib.getPacket(bg.api.gapConnectDirect, [108, 189, 40, 93, 28, 216], 1, 25, 50, 500, 8, function(err, response) {});
	}
, "Did not throw an error for too many parameters being passed in.");
console.log("Detecting Too Many Parameters Passed.");


// Packet Parsing:
var incoming = new Buffer([128, 38, 6, 0, 185, 0, 108, 189, 40, 93, 28, 216, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 56, 88, 171, 173, 5, 22, 10, 24, 7, 4, 128, 38, 6, 0, 181, 0, 108, 189, 40, 93, 28, 216, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 56, 88, 171, 173, 5, 22, 10, 24, 7, 4, 128, 38, 6, 0, 191, 0, 108, 189, 40, 93, 28, 216, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 56, 88, 171, 173, 5, 22, 10, 24, 7, 4, 128, 38, 6, 0, 182, 0, 108, 189, 40, 93, 28, 216, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 56, 88, 171, 173, 5, 22, 10, 24, 7, 4, 128, 38, 6, 0, 179, 0, 108, 189, 40, 93, 28, 216, 1, 255, 27, 2, 1, 6, 17, 6, 186, 86, 137, 166, 250, 191, 162, 189, 1, 70, 125, 110, 56, 88, 171, 173, 5, 22]);
bglib.parseIncoming(incoming, function(err, parsedPackets) {
	assert(!err, "There was an error parsing packets: " + err);
	assert(parsedPackets.length == 4, "Packets not parsed correctly");
	console.log(parsedPackets[0].response.data)
	console.log("Packet Parsing Passed.");
});

console.log("All Tests Passed.")





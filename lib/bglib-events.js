// Copyright 2014 Technical Machine, Inc. See the COPYRIGHT
// file at the top-level directory of this distribution.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

var errorHandler = require('./bglib-errors');
var dataParser = require('bleadvertise');

/***************************************
*		SYSTEM Events
****************************************/
var _bgEventSystemBoot = function(params) {
	this.major = params.readUInt16LE(0);
	this.minor = params.readUInt16LE(2);
	this.patch = params.readUInt16LE(4);
	this.build = params.readUInt16LE(6);
	this.ll_version = params.readUInt16LE(8);
	this.protocol_version = params.readUInt8(10);
	this.hw = params.readUInt8(11);
}

var _bgEventSystemEndpointWatermarkRx = function(params) {
	this.endpoint = params.readUInt8(0);
	this.data = params.readUInt8(1);
}
var _bgEventSystemEndpointWatermarkTx = function(params) {
	this.endpoint = params.readUInt8(0);
	this.data = params.readUInt8(1);
}
var _bgEventSystemScriptFailure = function(params) {
	this.address = params.readUInt16LE(0);
	this.reason = errorHandler.getErrorFromCode(params.readUInt16LE(2));
}
var _bgEventSystemNoLicenseKey = function(params) {

}
var _bgEventSystemProtocolError = function(params) {
	this.reason = errorHandler.getErrorFromCode(params.readUInt16LE(0));
}

/***************************************
*		Persistent Storage Events
****************************************/

var _bgEventFlashPSKey = function(params) {
	this.key = params.readUInt16LE(0);
	this.value = params.slice(3, params[2]);
}

/***************************************
*		Attribute Database Events
****************************************/

var _bgEventAttributesValue = function(params) {
	this.connection = params.readUInt8(0);
	this.reason = params.readUInt8(1);
	this.handle = params.readUInt16LE(2);
	this.offset = params.readUInt16LE(4);
	this.value = params.slice(7, 7 + params[6]);
}
var _bgEventAttributesUserReadRequest = function(params) {
	this.connection = params.readUInt8(0);
	this.handle = params.readUInt16LE(1);
	this.offset = params.readUInt16LE(3);
	this.maxsize =params.readUInt8(5);
}
var _bgEventAtributesStatus = function(params) {
	this.handle = params.readUInt16LE(0);
	this.flags = params.readUInt8(2);
}
/***************************************
*		Connection Events
****************************************/
var _bgEventConnectionStatus = function(params) {
	this.connection = params.readUInt8(0);
	this.flags = params.readUInt8(1);
	this.address = params.slice(2, 8);
	this.address_type = params.readUInt8(8);
	this.conn_interval = params.readUInt16LE(9);
	this.timeout = params.readUInt16LE(11);
	this.latency = params.readUInt16LE(13);
	this.bonding = params.readUInt8(15);
}
var _bgEventConnectionVersionInd = function(params) {
	this.connection = params.readUInt8(0);
	this.version_nr = params.readUInt8(1);
	this.comp_id = params.readUInt16LE(2);
	this.sub_vers_nr = params.readUInt16LE(4)
}
var _bgEventConnectionFeatureInd = function(params) {
	this.connection = params.readUInt8(0);
	this.features = params.slice(1, params.length);
}

var _bgEventConnectionDisconnected = function(params) {
	this.connection = params.readUInt8(0);
	this.reason = errorHandler.getErrorFromCode(params.readUInt16LE(1));
}

/***************************************
*		Attribute Client Events
****************************************/

var _bgEventAttClientIndicated = function(params) {
	this.connection = params.readUInt8(0);
	this.attrhandle = params.readUInt16LE(1)
}
var _bgEventAttClientProcedureCompleted = function(params) {
	this.connection = params.readUInt8(0);
	this.result = errorHandler.getErrorFromCode(params.readUInt16LE(1));
	this.chrhandle = params.readUInt16LE(3);
}
var _bgEventAttClientGroupFound = function(params) {
	this.connection = params.readUInt8(0);
	this.start = params.readUInt16LE(1);
	this.end = params.readUInt16LE(3);
	this.uuid = params.slice(6, 6 + params[5]);
}

var _bgEventAttClientFindInformationFound = function(params) {
	this.connection = params.readUInt8(0);
	this.chrhandle = params.readUInt16LE(1);
	this.uuid = params.slice(4, 4 + params[3]);
}
var _bgEventAttClientAttributeValue = function(params) {
	this.connection = params.readUInt8(0);
	this.atthandle = params.readUInt16LE(1);
	this.type = params.readUInt8(3);
	this.value = params.slice(5, 5 + params[4]);
}
var _bgEventAttClientReadMultipleResponse = function(params) {
	this.connection = params.readUInt8(0);
	this.handles = params.slice(2, 2 + params[1]);
}
/***************************************
*		Security Manager Events
****************************************/
var _bgEventSMBondingFail = function(params) {
	this.handle = params.readUInt8(0);
	this.result = errorHandler.getErrorFromCode(params.readUInt16LE(1));
}
var _bgEventSMPasskeyDisplay = function(params) {
	this.handle = params.readUInt8(0);
	this.passkey = params.readUInt32LE(1);
}
var _bgEventSMPasskeyRequest = function(params) {
	this.handle = params.readUInt8(0);
}
var _bgEventSMBondStatus = function(params) {
	this.bond = params.readUInt8(0);
	this.keysize = params.readUInt8(1);
	this.mitm = params.readUInt8(2);
	this.keys = params.readUInt8(3);
}
/***************************************
*		GAP Events
****************************************/
var _bgEventGAPScanResponse = function(params) {
	this.rssi = params.readInt8(0);
	this.packet_type = params.readUInt8(1);
	this.sender = params.slice(2, 8);
	this.address_type = params.readUInt8(8);
	this.bond = params.readUInt8(9);
	this.data = dataParser.parseBE(params.slice(10, params.length));
}
/***************************************
*		Hardware Events
****************************************/
var _bgEventHWIOPortStatus = function(params){
	this.timestamp = params.readUInt32LE(0);
	this.port = params.readUInt8(4);
	this.irq = params.readUInt8(5);
	this.state = params.readInt8(6);
}
var _bgEventhWSoftTimer = function(params) {
	this.handle = params.readUint8(0)
}

var _bgEventHWADCResult = function(params) {
	this.input = params.readUInt8(0);
	this.value = params.readInt16LE(1);
}

/***************************************
*		DFU Events
****************************************/
var _bgEventDFUBoot = function(params) {
	this.version = params.readUInt32LE(0);
}

var Events = {
	// System Events
	0: [_bgEventSystemBoot, null, _bgEventSystemEndpointWatermarkRx,
 _bgEventSystemEndpointWatermarkTx, _bgEventSystemScriptFailure, _bgEventSystemNoLicenseKey,
 _bgEventSystemProtocolError],

	// PS Events
	1: [_bgEventFlashPSKey],

	// Attribute Database Events
	2: [_bgEventAttributesValue, _bgEventAttributesUserReadRequest, _bgEventAtributesStatus],

	// Connection Events
	3: [_bgEventConnectionStatus, _bgEventConnectionVersionInd,  _bgEventConnectionFeatureInd,
	null, _bgEventConnectionDisconnected],

	// Attribute Client Events
	4: [_bgEventAttClientIndicated, _bgEventAttClientProcedureCompleted,_bgEventAttClientGroupFound,
	null, _bgEventAttClientFindInformationFound, _bgEventAttClientAttributeValue,
	_bgEventAttClientReadMultipleResponse],

	// Security Manager Events
	5: [null, _bgEventSMBondingFail, _bgEventSMPasskeyDisplay,
	_bgEventSMPasskeyRequest, _bgEventSMBondStatus],

	// GAP Events
	6: [_bgEventGAPScanResponse],

	// Hardware Events
	7: [_bgEventHWIOPortStatus, _bgEventhWSoftTimer, _bgEventHWADCResult],

	8: null,

	9: [_bgEventDFUBoot]
}

module.exports.Events = Events;

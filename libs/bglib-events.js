var bitwise = require('./bitwise-ops');
var errorHandler = require('./bglib-errors');

/***************************************
*		SYSTEM Events
****************************************/ 
var _bgEventSystemBoot = function(params) {
	this.major = bitwise.numberFromUint8Bytes([params[0], params[1]]);
	this.minor = bitwise.numberFromUint8Bytes([params[2], params[3]]);
	this.patch = bitwise.numberFromUint8Bytes([params[4], params[5]]);
	this.build = bitwise.numberFromUint8Bytes([params[6], params[7]]);
	this.ll_version = bitwise.numberFromUint8Bytes([params[8], params[9]]);
	this.protocol_version = params[10];
	this.hw = params[11];
}
// var _bgEventSystemDebug = function(params) {
// 	this.data = params[0];
// }
// var _bgEventSystemEndpointWatermarkRx = function(params) {
// 	this.endpoint = params[0];
// 	this.data = params[1];
// }
// var _bgEventSystemEndpointWatermarkTx = function(params) {
// 	this.endpoint = params[0];
// 	this.data = params[1];
// }
// var _bgEventSystemScriptFailure = function(params) {
// 	this.address = bitwise.numberFromUint8Bytes([params[0], params[1]]);
// 	this.reason = bitwise.numberFromUint8Bytes([params[2], params[3]]);
// }
// var _bgEventSystemNoLicenseKey = function(params) {

// }
// var _bgEventSystemProtocolError = function(params) {
// 	this.reason = bitwise.numberFromUint8Bytes([params[0], params[1]]);
// }

// /***************************************
// *		Persistent Storage Events
// ****************************************/ 

// var _bgEventFlashPSKey = function(params) {
// 	var key = bitwise.numberFromUint8Bytes([params[0], params[1]]);
// 	var data = params[2];
// }

// /***************************************
// *		Attribute Database Events
// ****************************************/ 

// var _bgEventAttributesValue = function(params) {
// 	this.connection = params[0];
// 	this.reason = params[1]
// 	this.offset = bitwise.numberFromUint8Bytes([params[2], params[3]]);
// 	this.handle = bitwise.numberFromUint8Bytes([params[4], params[5]]);
// 	this.value = params[6];
// }
// var _bgEventAttributesUserReadRequest = function(params) {
// 	this.connection = params[0];
// 	this.handle = bitwise.numberFromUint8Bytes([params[1], params[2]]);
// 	this.offset = bitwise.numberFromUint8Bytes([params[3], params[4]]);
// 	this.maxsize = params[5]
// }
// var _bgEventAtributesStatus = function(params) {
// 	this.handle = bitwise.numberFromUint8Bytes([params[0], params[1]]);
// 	this.flags = params[2];
// }
// /***************************************
// *		Connection Events
// ****************************************/ 
var _bgEventConnectionStatus = function(params) {
	this.connection = params[0];
	this.flags = params[1];
	this.address = [params[2], params[3], params[4], params[5], params[6], params[7]];
	this.address_type = params[8];
	this.conn_interval = bitwise.numberFromUint8Bytes([params[9], params[10]]);
	this.timeout = bitwise.numberFromUint8Bytes([params[11], params[12]]);
	this.latency = bitwise.numberFromUint8Bytes([params[13], params[14]]);
	this.bonding = params[15];
}
var _bgEventConnectionVersionInd = function(params) {
	this.connection = params[0];
	this.version_nr = params[1];
	this.comp_id = bitwise.numberFromUint8Bytes([params[2], params[3]]);
	this.sub_vers_nr = bitwise.numberFromUint8Bytes([params[4], params[5]]);
}
var _bgEventConnectionFeatureInd = function(params) {
	this.connection = params[0];
	this.features = bitwise.numberFromUint8Bytes([params[1], params[2]]);
}
var _bgEventConnectionRawRx = function(params) {
	this.connection = params[0];
	this.data = bitwise.numberFromUint8Bytes([params[1], params[2]]);
}
var _bgEventConnectionDisconnected = function(params) {
	this.connection = params[0];
	this.reason = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes([params[1], params[2]]));
}

/***************************************
*		Attribute Client Events
****************************************/ 

var _bgEventAttClientIndicated = function(params) {
	this.connection = params[0];
	this.attrhandle = bitwise.numberFromUint8Bytes([params[1], params[2]]);
}
var _bgEventAttClientProcedureCompleted = function(params) {
	this.connection = params[0];
	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes([params[1], params[2]]));
	this.chrhandle = bitwise.numberFromUint8Bytes([params[3], params[4]]);
}
var _bgEventAttClientGroupFound = function(params) {
	this.connection = params[0];
	this.start = bitwise.numberFromUint8Bytes([params[1], params[2]]);
	this.end = bitwise.numberFromUint8Bytes([params[3], params[4]]);
	this.uuid = params[5];
}
var _bgEventAttClientFindInformationFound = function(params) {
	this.connection = params[0];
	this.chrhandle = bitwise.numberFromUint8Bytes([params[1], params[2]]);
	this.uuid = bitwise.numberFromUint8Bytes(params.splice(3, params.length - 3));
}
var _bgEventAttClientGroupFound = function(params) {
	this.connection = params[0];
	this.start = bitwise.numberFromUint8Bytes([params[1], params[2]]);
	this.end = bitwise.numberFromUint8Bytes([params[3], params[4]]);
	this.uuid = params[5];
}
var _bgEventAttClientAttributeValue = function(params) {
	this.connection = params[0];
	this.atthandle = bitwise.numberFromUint8Bytes([params[1], params[2]]);
	this.type = params[3]
	this.value = params.splice(4, params.length - 4);
}
var _bgEventAttClientReadMultipleResponse = function(params) {
	this.connection = params[0];
	this.handles = params[1];
}
// /***************************************
// *		Security Manager Events
// ****************************************/ 
// var _bgEventSMSMPData = function(params) {
// 	this.handle = params[0];
// 	this.packet = params[1];
// 	this.data = params[2];
// }
// var _bgEventSMBondingFail = function(params) {
// 	this.handle = params[0];
// 	this.result = bitwise.numberFromUint8Bytes([params[1], params[2]]);
// }
// var _bgEventSMPasskeyDisplay = function(params) {
// 	this.handle = params[0];
// 	this.passkey = this.result = bitwise.numberFromUint8Bytes([params[1], params[2], params[3], params[4]]);
// }
// var _bgEventSMPasskeyRequest = function(params) {
// 	this.handle = params[0];
// }
// var _bgEventSMBondStatus = function(params) {
// 	this.bond = params[0];
// 	this.keysize = params[1];
// 	this.mitm = params[2];
// 	this.keys = params[3];
// }
/***************************************
*		GAP Events
****************************************/ 
var _bgEventGAPScanResponse = function(params) {
	this.rssi = params[0] > 127 ? params[0] - 128 : params[0];
	this.packet_type = params[1];
	this.sender = [params[2], params[3], params[4], params[5], params[6], params[7]];
	this.address_type = params[8];
	this.bond = params[9];
	this.data = params.splice(10, params.length-1);
}
var _bgEventGAPModeChanged = function(params) {
	this.discover = params[0];
	this.connect = params[1];
}

/***************************************
*		Hardware Events
****************************************/ 
var _bgEventHWPortStatusChange = function(params){
	this.timestamp = bitwise.numberFromUint8Bytes([params[0], params[1], params[2], params[3]]);
	this.port = params[4];
	this.irq = params[5];
	this.state = params[6];
}	
var _bgEventHWADCResult = function(params) {
	this.input = params[0];
	this.value = bitwise.numberFromUint8Bytes([params[0], params[1]]); 
}
var_bgEventHWDFUBoot = function(params) {
	this.version = bitwise.numberFromUint8Bytes([params[0], params[1], params[2], params[3]]);
}

var Events = {
	// System Events
	0: [_bgEventSystemBoot],// _bgEventSystemDebug, _bgEventSystemEndpointWatermarkRx,
// _bgEventSystemEndpointWatermarkTx, _bgEventSystemScriptFailure, _bgEventSystemNoLicenseKey,
// _bgEventSystemProtocolError],

	// PS Events
	// 1: [_bgEventFlashPSKey],

	// Attribute Database Events
	// 2: [_bgEventAttributesValue, _bgEventAttributesUserReadRequest, _bgEventAtributesStatus],

	// Connection Events
	3: [_bgEventConnectionStatus, _bgEventConnectionVersionInd,  _bgEventConnectionFeatureInd,
	_bgEventConnectionRawRx, _bgEventConnectionDisconnected],

	// Attribute Client Events
	4: [_bgEventAttClientIndicated, _bgEventAttClientProcedureCompleted, _bgEventAttClientGroupFound,_bgEventAttClientGroupFound,
	_bgEventAttClientFindInformationFound, _bgEventAttClientAttributeValue],
// _bgEventAttClientReadMultipleResponse],

	// Security Manager Events
// 	5: [_bgEventSMSMPData, _bgEventSMBondingFail, _bgEventSMPasskeyDisplay,
// _bgEventSMPasskeyRequest, _bgEventSMBondStatus],

	// GAP Events
	6: [_bgEventGAPScanResponse, _bgEventGAPModeChanged],

	// Hardware Events
	7: [_bgEventHWPortStatusChange],//, _bgEventHWADCResult, var_bgEventHWDFUBoot],
}
	
module.exports.Events = Events;


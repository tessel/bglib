var bitwise = require('./bitwise-ops');

/***************************************
*		SYSTEM RESPONSES
****************************************/ 
var _bgResponseReset = function(params) {
	this.dfu = params[0];
}
var _bgResponseHello = function(params) {

}
// var _bgResponseAddressGet = function(params) {
// 	this.address = [params[0], params[1], params[2], params[3], params[4], params[5]];
// }
// var _bgResponseRegisterWrite = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], param[1]);
// }
// var _bgResponseRegisterRead = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], param[1]);
// 	this.value = params[2];
// }
// var _bgResponseGetCounters = function(params) {
// 	this.txok = params[0];
// 	this.txretry = params[1];
// 	this.rxok = params[2];
// 	this.rxfail = params[3];
// 	this.mbuf = params[4];
// }

// var _bgResponseGetConnections = function(params) {
// 	this.maxconn = params[0];
// }

// var _bgResponseReadMemory = function(params) {
// 	this.address = bitwise.numberFromUint8Bytes(params[0], param[1], params[2], params[3]);
// 	this.value = params[4];
// }

// var _bgResponseGetInfo = function(params) {
// 	this.major = bitwise.numberFromUint8Bytes([params[0], params[1]]);
// 	this.minor = bitwise.numberFromUint8Bytes([params[2], params[3]]);
// 	this.patch = bitwise.numberFromUint8Bytes([params[4], params[5]]);
// 	this.build = bitwise.numberFromUint8Bytes([params[6], params[7]]);
// 	this.llversion = bitwise.numberFromUint8Bytes([params[8], params[9]]);
// 	this.protocol_version = params[10];
// 	this.hw = params[11];
// }

// var _bgResponseEndpointTx = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }

// var _bgResponseWhitelistAppend = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], param[1]);
// }
// var _bgResponseWhitelistRemove = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseWhitelistClear = function(params) {

// }
// var _bgResponseEndpointRx = function(params) {
// 	this.result  = bitwise.numberFromUint8Bytes(params[0], param[1]);
// 	this.size = params[2];
// }
// var _bgResponseSetWatermarks = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }

/***************************************
*		PS RESPONSES
****************************************/ 

// var _bgResponsePSDefrag = function(params) {

// }
// var _bgResponsePSDump = function(params) {

// }
// var _bgResponsePSEraseAll = function(params) {

// }
// var _bgResponsePSSave = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponsePSLoad = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponsePSErase = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponsePSErasePase = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseWriteWords = function(params) {

// }

// /***************************************
// *		Attribute Database
// ****************************************/ 
// var _bgResponseAttributesWrite = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseAttributesRead = function(params) {
// 	this.handle = bitwise.numberFromUint8Bytes(params[0], params[1]);
// 	this.offset = bitwise.numberFromUint8Bytes(params[2], params[3]);
// 	this.result = bitwise.numberFromUint8Bytes(params[4], params[5]);
// 	this.value = params[6];
// }
// var _bgResponseAttributesReadType = function(params) {
// 	this.handle = bitwise.numberFromUint8Bytes(params[0], params[1]);
// 	this.result = bitwise.numberFromUint8Bytes(params[2], params[3]);
// 	this.value = params[4];
// }
// var _bgResponseAttributesUserReadResponse= function(params) {

// }
// var _bgResponseAttributesUserWriteResponse = function(params) {

// }

// /***************************************
// *		Connection
// ****************************************/ 
// var _bgResponseConnectionDisconnect = function(params) {
// 	this.connection = params[0];
// 	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
// }

var _bgResponseConnectionGetRSSI = function(params) {
	console.log("params: ", params);
	this.connection = params[0];
	this.rssi = params[1];
}
// var _bgResponseConnectionUpdate = function(params) {
// 	this.connection = params[0];
// 	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
// }
// var _bgResponseConnectionChannelMapGet = function(params) {
// 	this.connection = params[0];
// 	this.map = params[1];
// }
// var _bgResponseConnectionChannelMapSet = function(params) {
// 	this.connection = params[0];
// 	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
// }
// var _bgResponseConnectionFeaturesGet = function(params) {
// 	this.connection = params[0];
// 	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
// }
var _bgResponseConnectionGetStatus = function(params) {
	this.connection = params[0];
}
// var _bgResponseConnectionRawTx = function(params) {
// 	this.connection = params[0];
// }

/***************************************
*		Attribute Client
****************************************/ 
var _bgResponseAttClientFindByType = function(params) {
	this.connection = params[0];
	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
}
var _bgResponseAttClientReadByGroupType = function(params) {
	this.connection = params[0];
	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
}
var _bgResponseAttClientReadByType = function(params) {
	this.connection = params[0];
	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
}
var _bgResponseAttClientFindInformation = function(params) {
	this.connection = params[0];
	this.result = getErrorFromCode(bitwise.numberFromUint8Bytes(params[1], params[2]));

}
// var _bgResponseAttClientReadByHandle = function(params) {
// 	this.connection = params[0];
// 	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
// }
// var _bgResponseAttClientAttributeWrite = function(params) {
// 	this.connection = params[0];
// 	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
// }
// var _bgResponseAttClientWriteCommand = function(params) {
// 	this.connection = params[0];
// 	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
// }
// var _bgResponseAttClientIndicateConfirm = function(params) {
// 	this.connection = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseAttClientReadLong = function(params) {
// 	this.connection = params[0];
// 	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
// }
// var _bgResponseAttClientPrepareWrite = function(params) {
// 	this.connection = params[0];
// 	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
// }
// var _bgResponseAttClientExecuteWrite = function(params) {
// 	this.connection = params[0];
// 	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
// }
// var _bgResponseAttClientReadMultiple = function(params) {
// 	this.connection = params[0];
// 	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
// }

// /***************************************
// *		Security Manager
// ****************************************/ 
// var _bgResponseSMEncryptStart = function(params) {
// 	this.handle = params[0];
// 	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
// }
// var _bgResponseSMSetBondable = function(params) {

// }
// var _bgResponseSMDeleteBonding = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseSMPasskeyEntry = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseSMGetBonds = function(params) {
// 	this.bonds = params[0];
// }
// var _bgResponseSMSetOOBData = function(params) {

// }

// /***************************************
// *		Generic Access Profile
// ****************************************/ 
var _bgResponseGAPSetPrivacyFlags = function(params) {

}
var _bgResponseGAPSetMode = function(params) {
	this.result = getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
}
var _bgResponseGAPDiscover= function(params) {
	this.result = getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
}
var _bgResponseGAPConnectDirect = function(params) {
	this.result = getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
	this.connection_handle = params[2];
}
var _bgResponseGAPEndProcedure = function(params) {
	this.result = getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
}
var _bgResponseGAPConnectSelective = function(params) {
	this.result = getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
	this.connection_handle = params[2];
}
var _bgResponseGAPSetFiltering = function(params) {
	this.result = getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
}
var _bgResponseGAPSetScanParameters = function(params) {
	this.result = getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
}
var _bgResponseGAPSetAdvParameters = function(params) {
	this.result = getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
}
var _bgResponseGAPSetAdvData = function(params) {
	this.result = getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
}
var _bgResponseGAPSetDirectedConnectableMode = function(params) {
	this.result = getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
}

// /***************************************
// *			Hardware
// ****************************************/ 
// var _bgResponseHWIOPortConfigIRQ = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseHWSetSoftTimer = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseHWADCRead = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseHWIOPortConfigDirection = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseHWIOPortConfigFunction = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseHWIOPortConfigPull = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseHWIOPortWrite = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseHWIOPortRead = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// 	this.port = params[2];
// 	this.data = params[3];
// }
// var _bgResponseHWSPIConfig = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseHWIOSPITransfer = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// 	this.channel = params[2];
// 	this.data = params[3];
// }
// var _bgResponseHWI2CRead = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// 	this.data = params[2];
// }
// var _bgResponseHWI2CWrite = function(params) {
// 	this.written = params[0];
// }
// var _bgResponseHWSetTxPower = function(params) {

// }
// var _bgResponseHWTimerComparator = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }

// /***************************************
// *			Test
// ****************************************/ 
// var _bgResponseTestPhyTx = function(params) {

// }
// var _bgResponseTestPhyRx = function(params) {

// }
// var _bgResponseTestPhyEnd = function(params) {
// 	this.counter = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseTestPhyReset = function(params) {

// }
// var _bgResponseTestGetChannelMap = function(params) {
// 	this.channel_map = params[0]
// }
// var _bgResponseTestDebug = function(params) {
// 	this.output = params[0];
// }

// /***************************************
// *			DFU
// ****************************************/ 
// var _bgResponseDFUReset= function(params) {

// }
// var _bgResponseDFUFlashSetAddress = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseDFUFlashUpload = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }
// var _bgResponseDFUFlashUploadFinish = function(params) {
// 	this.result = bitwise.numberFromUint8Bytes(params[0], params[1]);
// }


// Responses dict. Do not change the order of this. It will fuck things up
// It's ordered by command id
// TODO: Somehow link the indexes to the consts of BGLib.
var Responses = {

	// System Repsonses
	0 	: 	[_bgResponseReset, _bgResponseHello],//, _bgResponseAddressGet, 
	// _bgResponseRegisterWrite, _bgResponseRegisterRead,_bgResponseGetCounters,
	// _bgResponseGetConnections, _bgResponseReadMemory, _bgResponseGetInfo,
	// _bgResponseEndpointTx, _bgResponseWhitelistAppend, _bgResponseWhitelistRemove,
	//  _bgResponseWhitelistClear, _bgResponseEndpointRx, _bgResponseSetWatermarks],

	// // Persistent Store Responses
	// 1 	: 	[_bgResponsePSDefrag, _bgResponsePSDump, _bgResponsePSEraseAll,
	// _bgResponsePSSave, _bgResponsePSLoad, _bgResponsePSErase,
	// _bgResponsePSErasePase, _bgResponseWriteWords],

// 	// Attribute Database Responses
// 	2 	: 	[_bgResponseAttributesWrite, _bgResponseAttributesRead, _bgResponseAttributesReadType,
// 	_bgResponseAttributesUserReadResponse, _bgResponseAttributesUserWriteResponse],

// 	// Connection Responses
	3	: 	/*[_bgResponseConnectionDisconnect,*/[_bgResponseConnectionGetRSSI, //_bgResponseConnectionUpdate,
// 	_bgResponseConnectionChannelMapGet, _bgResponseConnectionChannelMapSet, _bgResponseConnectionFeaturesGet,
	_bgResponseConnectionGetStatus],// _bgResponseConnectionRawTx],

// 	// Attribute Client Responses
	4	: [_bgResponseAttClientFindByType, _bgResponseAttClientReadByGroupType, _bgResponseAttClientReadByType,
	_bgResponseAttClientFindInformation],// _bgResponseAttClientReadByHandle, _bgResponseAttClientAttributeWrite,
// 	_bgResponseAttClientWriteCommand, _bgResponseAttClientIndicateConfirm, _bgResponseAttClientReadLong,
// 	_bgResponseAttClientPrepareWrite, _bgResponseAttClientExecuteWrite, _bgResponseAttClientReadMultiple],

// 	// Security Manager Responses
// 	5 	: 	[_bgResponseSMEncryptStart, _bgResponseSMSetBondable, _bgResponseSMDeleteBonding,
//  _bgResponseSMPasskeyEntry, _bgResponseSMGetBonds, _bgResponseSMSetOOBData],

//  	// GAP Responses
	6 	: 	[_bgResponseGAPSetPrivacyFlags, _bgResponseGAPSetMode, _bgResponseGAPDiscover,
 _bgResponseGAPConnectDirect, _bgResponseGAPEndProcedure, _bgResponseGAPConnectSelective],
//  _bgResponseGAPSetFiltering, _bgResponseGAPSetScanParameters, _bgResponseGAPSetAdvParameters, 
//  _bgResponseGAPSetAdvData, _bgResponseGAPSetDirectedConnectableMode],

//  	// Hardware Responses
//  	7	: 	[_bgResponseHWIOPortConfigIRQ, _bgResponseHWSetSoftTimer, _bgResponseHWADCRead,
// _bgResponseHWIOPortConfigDirection, _bgResponseHWIOPortConfigFunction, _bgResponseHWIOPortConfigPull,
// _bgResponseHWIOPortWrite, _bgResponseHWIOPortRead, _bgResponseHWSPIConfig,
// _bgResponseHWIOSPITransfer, _bgResponseHWI2CRead, _bgResponseHWI2CWrite,
// _bgResponseHWSetTxPower, _bgResponseHWTimerComparator],

// 	// Test Responses
// 	8 	: 	[_bgResponseTestPhyTx, _bgResponseTestPhyRx, _bgResponseTestPhyEnd,
// _bgResponseTestPhyReset, _bgResponseTestGetChannelMap, _bgResponseTestDebug],

// 	// DFU Responses
// 	9	: 	[_bgResponseDFUReset, _bgResponseDFUFlashSetAddress, _bgResponseDFUFlashUpload,
// _bgResponseDFUFlashUploadFinish], 
}

function getErrorFromCode(errorCode) {
	var e = new BGLibError();
	switch(errorCode) {
		case 0x00:
			return 0x00;
		//BGAPI Errors
		case 0x180:
			e.message = "Invalid Parameter";
			e.detail = "Command contained invalid parameter";
			return e;
		case 0x181:
			e.message = "Device in Wrong State";
			e.detail = "Device is in wrong state to receive command";
			return e;
		case 0x182:
			e.message = "Out Of Memory";
			e.detail = "Device has run out of memory";
			return e;
		case 0x183:
			e.message = "Feature Not Implemented";
			e.detail = "Feature is not implemented";
		case 0x184:
			e.message = "Command Not Recognized";
			e.detail = "Command was not recognized";
		case 0x185:
			e.message = "Timeout";
			e.detail = "Command or Procedure failed due to timeout";
		case 0x186:
			e.message = "Not Connected";
			e.detail = "Connection handle passed is to command is not a valid handle";
		case 0x187:
			e.message = "Flow";
			e.detail = "Command would cause either underflow or overflow error";
		case 0x188:
			e.message = "User Attribute";
			e.detail = "User attribute was accessed through API which is not supported";
		case 0x189:
			e.message = "Invalid License Key";
			e.detail = "No valid license key found";
		case 0x18A:
			e.message = "Command Too Long";
			e.detail = "Command would cause either underflow or overflow error";
		case 0x187:
			e.message = "Out of Bonds";
			e.detail = "Bonding procedure can't be started because device has no space left for bond.";

		//Bluetooth Errors
		case 0x205:
			e.message = "Authentication Failure";
			e.detail = "Pairing or authentication failed due to incorrect results in the pairing or authentication procedure. This could be due to an incorrect PIN or Link Key";
		case 0x206:
			e.message = "Pin or Key Missing";
			e.detail = "Pairing failed because of missing PIN, or authentication failed because of missing Key.";
		case 0x207:
			e.message = "Memory Capacity Exceeded";
			e.detail = "Controller is out of memory.";
		case 0x208:
			e.message = "Connection Timeout";
			e.detail = "Link supervision timeout has expired.";
		case 0x209:
			e.message = "Connection Limit Exceeded";
			e.detail = "Controller is at limit of connections it can support.";
		case 0x20C:
			e.message = "Command Disallowed";
			e.detail = "Command requested cannot be executed because the Controller is in a state where it cannot process this command at this time.";
		case 0x212:
			e.message = "Invalid Command Parameters";
			e.detail = "Command contained invalid parameters."
			return e;
		case 0x213:
			e.message = "Remote User Terminated Connection";
			e.detail = "User on the remote device terminated the connection.";
		case 0x216:
			e.message = "Connection Terminated by Local Host";
			e.detail = "Local device terminated the connection.";
		case 0x222:
			e.message = "LL Response Timeout";
			e.detail = "CConnection terminated due to link-layer procedure timeout.";
		case 0x228:
			e.message = "LL Instant Passed";
			e.detail = "Received link-layer control packet where instant was in the past.";
		case 0x23A:
			e.message = "Controller Busy";
			e.detail = "Operation was rejected because the controller is busy and unable to process the request.";
		case 0x23B:
			e.message = "Unacceptable Connection Interval";
			e.detail = "The Unacceptable Connection Interval error code indicates that the remote device terminated the connection because of an unacceptable connection interval.";
		case 0x23C:
			e.message = "Directed Advertising Timeout";
			e.detail = "Directed advertising completed without a connection being created.";
		case 0x23D:
			e.message = "MIC Failure";
			e.detail = "Connection was terminated because the Message Integrity Check (MIC) failed on a received packet.";
		case 0x23E:
			e.message = "Connection Failed to be Established";
			e.detail = "LL initiated a connection but the connection has failed to be established. Controller did not receive any packets from remote end.";

		// Security Errors
		case 0x301:
			e.message = "Passkey Entry Failed";
			e.detail = "The user input of passkey failed, for example, the user cancelled the operation";
		case 0x302:
			e.message = "OOB Data is not available";
			e.detail = "Out of Band data is not available for authentication.";
		case 0x303:
			e.message = "Authentication Requirements";
			e.detail = "The pairing procedure cannot be performed as authentication requirements cannot be met due to IO capabilities of one or both devices";
		case 0x304:
			e.message = "Confirm Value Failed";
			e.detail = "The confirm value does not match the calculated compare value.";
		case 0x305:
			e.message = "Pairing Not Supported";
			e.detail = "Pairing is not supported by the device.";
		case 0x306:
			e.message = "Encryption Key Size";
			e.detail = "CThe resultant encryption key size is insufficient for the security requirements of this device.";
		case 0x307:
			e.message = "Command Not Supported";
			e.detail = "The SMP command received is not supported on this device.";
		case 0x308:
			e.message = "Unspecified Reason";
			e.detail = "Pairing failed due to an unspecified reason.";
	}

	return -1;
}

function BGLibError() {
	this.message = "Generic BGLib Error";
	this.detail = "";
}

module.exports.Responses = Responses;
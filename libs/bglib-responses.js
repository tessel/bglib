var bitwise = require('./bitwise-ops');
var errorHandler = require('./bglib-errors');

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

var _bgResponseGetInfo = function(params) {
	this.major = bitwise.numberFromUint8Bytes([params[0], params[1]]);
	this.minor = bitwise.numberFromUint8Bytes([params[2], params[3]]);
	this.patch = bitwise.numberFromUint8Bytes([params[4], params[5]]);
	this.build = bitwise.numberFromUint8Bytes([params[6], params[7]]);
	this.llversion = bitwise.numberFromUint8Bytes([params[8], params[9]]);
	this.protocol_version = params[10];
	this.hw = params[11];
}

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
var _bgResponseAttributesWrite = function(params) {
	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
}
var _bgResponseAttributesRead = function(params) {
	this.handle = bitwise.numberFromUint8Bytes(params[0], params[1]);
	this.offset = bitwise.numberFromUint8Bytes(params[2], params[3]);
	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[4], params[5]));
	this.value = params.splice(6, params.length - 6);
}
// var _bgResponseAttributesReadType = function(params) {
// 	this.handle = bitwise.numberFromUint8Bytes(params[0], params[1]);
// 	this.result = bitwise.numberFromUint8Bytes(params[2], params[3]);
// 	this.value = params[4];
// }
// var _bgResponseAttributesUserReadResponse= function(params) {

// }
// var _bgResponseAttributesUserWriteResponse = function(params) {

// }

/***************************************
*		Connection
****************************************/ 
var _bgResponseConnectionDisconnect = function(params) {
	this.connection = params[0];
	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[1], params[2]));
}

// var _bgResponseConnectionGetRSSI = function(params) {
// 	this.connection = params[0];
// 	this.rssi = params[1];
// }
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
	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[1], params[2]));
}
var _bgResponseAttClientReadByGroupType = function(params) {
	this.connection = params[0];
	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[1], params[2]));
}
var _bgResponseAttClientReadByType = function(params) {
	this.connection = params[0];
	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[1], params[2]));
}
var _bgResponseAttClientFindInformation = function(params) {
	this.connection = params[0];
	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[1], params[2]));

}
var _bgResponseAttClientReadByHandle = function(params) {
	this.connection = params[0];
	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
}
// var _bgResponseAttClientAttributeWrite = function(params) {
// 	this.connection = params[0];
// 	this.result = bitwise.numberFromUint8Bytes(params[1], params[2]);
// }
var _bgResponseAttClientWriteCommand = function(params) {
	this.connection = params[0];
	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[1], params[2]));
}
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
	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
}
var _bgResponseGAPDiscover= function(params) {
	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
}
var _bgResponseGAPConnectDirect = function(params) {
	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
	this.connection_handle = params[2];
}
var _bgResponseGAPEndProcedure = function(params) {
	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
}
// var _bgResponseGAPConnectSelective = function(params) {
// 	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
// 	this.connection_handle = params[2];
// }
// var _bgResponseGAPSetFiltering = function(params) {
// 	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
// }
// var _bgResponseGAPSetScanParameters = function(params) {
// 	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
// }
// var _bgResponseGAPSetAdvParameters = function(params) {
// 	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
// }
// var _bgResponseGAPSetAdvData = function(params) {
// 	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
// }
var _bgResponseGAPSetDirectedConnectableMode = function(params) {
	this.result = errorHandler.getErrorFromCode(bitwise.numberFromUint8Bytes(params[0], params[1]));
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
	2 	: 	[_bgResponseAttributesWrite, _bgResponseAttributesRead],// _bgResponseAttributesReadType],
// 	_bgResponseAttributesUserReadResponse, _bgResponseAttributesUserWriteResponse],

// 	// Connection Responses
	3	: 	[_bgResponseConnectionDisconnect],//_bgResponseConnectionGetRSSI], //_bgResponseConnectionUpdate,
// 	_bgResponseConnectionChannelMapGet, _bgResponseConnectionChannelMapSet, _bgResponseConnectionFeaturesGet,
	//_bgResponseConnectionGetStatus],// _bgResponseConnectionRawTx],

// 	// Attribute Client Responses
	4	: [_bgResponseAttClientFindByType, _bgResponseAttClientReadByGroupType, _bgResponseAttClientReadByType,
	_bgResponseAttClientFindInformation, _bgResponseAttClientReadByHandle], //_bgResponseAttClientAttributeWrite,
// 	_bgResponseAttClientWriteCommand, _bgResponseAttClientIndicateConfirm, _bgResponseAttClientReadLong,
// 	_bgResponseAttClientPrepareWrite, _bgResponseAttClientExecuteWrite, _bgResponseAttClientReadMultiple],

// 	// Security Manager Responses
// 	5 	: 	[_bgResponseSMEncryptStart, _bgResponseSMSetBondable, _bgResponseSMDeleteBonding,
//  _bgResponseSMPasskeyEntry, _bgResponseSMGetBonds, _bgResponseSMSetOOBData],

//  	// GAP Responses
	6 	: 	[_bgResponseGAPSetPrivacyFlags, _bgResponseGAPSetMode, _bgResponseGAPDiscover,
 _bgResponseGAPConnectDirect, _bgResponseGAPEndProcedure],// _bgResponseGAPConnectSelective],
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



module.exports.Responses = Responses;
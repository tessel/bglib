var _bglibPMode;

var PACKET_MODE = 1;
var FLOW_CONTROL = 0;

var DEBUG = 1;

var _bgmessageType = {
	Command : 0 << 7,
	Response : 0 << 7,
	Event : 1 << 7
}

var _bgtechnologyType = {
	Bluetooth : 0 << 3,
	WiFi : 1 << 3
}


var _bgcommandClass = {
	System : 0,
	PersistentStore : 1,
	AttributeDatabase : 2,
	Connection : 3,
	AttributeClient : 4,
	SecurityManager : 5,
	GenericAccessProfile : 6,
	Hardware : 7
}

var _bgcommandIDs = {

	// System
	System_Reset : 0,
	System_Hello : 1,
	System_Address_Get : 2,
	System_Reg_Write : 3,
	System_Reg_Read : 4,
	System_Get_Counters : 5,
	System_Get_Connections: 6,
	System_Read_Memory : 7,
	System_Get_Info : 8,
	System_Endpoint_Tx : 9,
	System_Whitelist_Append : 10,
	System_Whitelist_Remove : 11,
	System_Whitelist_Clear : 12,
	System_Endpoint_Rx : 13,
	System_Set_Watermarks : 14,

	// Flash
	Flash_PS_Defrag : 0,
	Flash_PS_Dump : 1,
	Flash_PS_Erase_All : 2,
	Flash_PS_Save : 3,
	Flash_PS_Load : 4,
	Flash_PS_Erase : 5,
	Flash_Erase_Page : 6,
	Flash_Write_Words : 7,

	// Attributes
	Attributes_Write : 0,
	Attributes_Read : 1,
	Attributes_Read_Type : 2,
	Attributes_User_Read_Response : 3,
	Attributes_User_Write_Response : 4,

	// Connection
	Connection_Disconnect : 0,
	Connection_Get_RSSI : 1,
	Connection_Update : 2,
	Connection_Version_Update : 3,
	Connection_Channel_Map_Get : 4,
	Connection_Channel_Map_Set : 5,
	Connection_Features_Get : 6,
	Connection_Get_Status : 7,
	Connection_Raw_Tx : 8,

	// Attribute Client
	Attclient_Find_By_Type_Value : 0,
	Attclient_Read_By_Group_Type : 1,
	Attclient_Read_By_Type : 2,
	Attclient_Find_Information : 3,
	Attclient_Read_By_Handle : 4,
	Attclient_Attribute_Write_Command : 5,
	Attclient_Write_Command : 6,
	Attclient_Indicate_Confirm : 7,
	Attclient_Read_Long : 8,
	Attclient_Prepare_Write : 9,
	Attclient_Execute_Write : 10,
	Attclient_Read_Multiple : 11,

	// Security Manager
	SM_Encrypt_Start : 0,
	SM_Set_Bondable_Mode : 1,
	SM_Delete_Bonding : 2,
	SM_Set_Parameters : 3,
	SM_Passkey_Entry : 4,
	SM_Get_Bonds : 5,
	SM_Set_OOB_Data : 6,


	// GAP
	GAP_Set_Privacy_Flags : 0,
	GAP_Set_Mode : 1,
	GAP_Discover : 2,
	GAP_Connect_Direct : 3,
	GAP_End_Procedure : 4,
	GAP_Connect_Selective : 5,
	GAP_Set_Filering : 6,
	GAP_Set_Scan_Parameters : 7,
	GAP_Set_Adv_Parameters : 8,
	GAP_Set_Adv_Data : 9,
	GAP_Set_Connectable_Mode : 10,

	// Hardware
	HW_IO_Port_Config_IRQ : 0,
	HW_Set_Soft_Timer : 1,
	HW_ADC_Read : 2,
	HW_IO_Port_Config_Direction : 3,
	HW_IO_Port_Config_Function : 4,
	HW_IO_Port_Config_Pull : 5,
	HW_IO_Port_Write : 6,
	HW_IO_Port_Read : 7,
	HW_SPI_Config : 8,
	HW_SPI_Transfer : 9,
	HW_I2C_Read : 10,
	HW_I2C_Write : 11,
	HW_Set_Tx_Power : 12,
	HW_Timer_Comparator : 13,

	// Test
	Test_Phy_Tx : 0,
	Test_Phy_Rx : 1,
	Test_Phy_End : 2,
	Test_Phy_Reset : 3,
	Test_Get_Channel_Map : 4,
	Test_Debug : 5,
	Test_Channel_Mode : 5,

	// DFU
	DFU_Reset : 0,
	DFU_Flash_Set_Address : 1,
	DFU_Flash_Upload : 2,
	DFU_Flash_Upload_Finish : 3
}

BGLib.prototype.EventNames = {
	0 : [],
	1 : [],
	2 : [],
	3 : [],
	4 : [],
	5 : [],
	6 : [],
	7 : ["portEventStatusChange"],
}

function Packet(packetHeader, payload) {
	this.packetHeader = packetHeader;
	this.payload = payload;
	this.callback = null;
}

Packet.prototype.getByteArray = function(callback) {

	// Create a new array
	var packetBytes =  [];

	// If there is no flow control, add the length byte
	if (_bglibPMode) {
		packetBytes.push(4 + this.packetHeader.payloadLowBits + this.packetHeader.payloadHighBits);
	}

	// Grab the packet header byte array
	packetBytes = packetBytes.concat(this.packetHeader.getByteArray());

	// Grab the payload byte array
	packetBytes = packetBytes.concat(this.payload.getByteArray());

	callback && callback(packetBytes);

	return packetBytes;
}


function PacketHeader(messageType, technologyType, payload, commandClass, commandID) {
	this.mType = messageType;
	this.tType = technologyType;
	this.payloadHighBits = payload.payloadLengthHighBits();
	this.payloadLowBits = payload.payloadLengthLowBits();
	this.cClass = commandClass;
	this.cID = commandID;
}

PacketHeader.prototype.getByteArray = function(){
	var bArray = [];
	bArray.push(this.mType | this.tType | this.payloadHighBits);
	bArray.push(this.payloadLowBits);
	bArray.push(this.cClass);
	bArray.push(this.cID);
	return bArray;
}

function Payload(payloadArray) {
	if( Array.isArray(payloadArray) ) {
    	this.rawPayload = payloadArray;
	} else {
		this.rawPayload = [].concat(payloadArray);
	}
}

Payload.prototype.payloadLengthHighBits = function() {
	var size = this.getPayloadByteSize();
	return getUpperBits(size);
}

Payload.prototype.payloadLengthLowBits = function() {
	var size = this.getPayloadByteSize();
	return getLowerBits(size);
}

Payload.prototype.getByteArray = function() {

	var byteArray = [];

	for (var i in this.rawPayload) {

		var payloadEntry = this.rawPayload[i];

		if ((typeof payloadEntry == 'number') || (typeof payloadEntry == 'string')) {

			var b = getByteVal(payloadEntry);

			for (var eachObj in b) {
				byteArray.push(b[eachObj]);
			}
			
		}
		else if (Array.isArray(payloadEntry)) {
			for (var j in payloadEntry) {

				var b = getByteVal(payloadEntry[j]);

				for (var eachObj in b) {
					byteArray.push(b[eachObj]);
				}
			}
		}
		else {
			console.log("Oh it's this error...");
			throw new Error("You can only send numbers or strings...");
		}
	}

	return byteArray;
}

function getByteVal(obj) {
	if (typeof obj == 'number') {
		if (obj < 0) {
			throw new Error("Cannot get number of bytes of negative number yet...");
		}
		return getBytesOfPositiveNumber(obj);
	}
	else if (typeof obj == 'string') {
		return getBytesOfString(obj);
	}
	else {
		throw new Error("You can only send numbers or strings...");
	}
}

Payload.prototype.getPayloadByteSize = function() {
	return this.getByteArray().length;
}

function getUpperBits(num) {
	return num >> 8;
}
function getLowerBits(num) {
	return num & 0xFF;
}

// Returns the actual bytes of a positive number
function getBytesOfPositiveNumber(num) {

	if (typeof num != 'number') {
		throw new ArgumentException("Argument must be a number!");
	}

		if (num < 0) {
		throw new ArgumentException("Argument must be a positive number!");
	}

	if (num == 0) return [0];

	var bytes = [];

	while (num != 0) {

		bytes.push(num & 0xFF)
		num = num >> 8;
	}

	return bytes;
}

// Returns the number of bytes needed to
// construct a string
function getBytesOfString(string) {

	if (typeof(string) != "string") {
		throw new ArgumentException("Argument must be a string!");
	}

	var bytes = [];

	for (var i = 0; i < string.length; i++) {

		bytes.push(string.charCodeAt(i));
	}

	return bytes;
}

// Returns the number of bytes needed to
// construct a positive number
function numberByteSize(number) {

	return getBytesOfPositiveNumber(number).length;
}

function numberFromBytes(bytes) {

	var num = 0;
	for (var i in bytes) {
		num += (bytes[i] << (i * 8))
	}

	return num;
}

function ArgumentException(message) {
	this.name = "ArgumentException";
	this.message = message;
}

function BGLib(packetMode) {
	_bglibPMode = packetMode;
} 

var bgapiRXBuffer = [];
var bgapiRXBufferPos = 0; 
var bgapiRXDataLen = 0;

var _bgResponseBoot = function(params) {
	this.name = "boot";
	this.dfu = params[0];
}
var _bgResponseHello = function(params) {
	this.name = "hello";
}

var _bgResponseAddressGet = function(params) {
	this.name = "addressGet";
	this.address = [params[0], params[1], params[2], params[3], params[4], params[5]];

	this.addressToString = function() {
		var str = this.address[0].toString() + this.address[1].toString() +this.address[2].toString() + 
			this.address[3].toString() + this.address[4].toString() + this.address[5].toString();
		return str;
	}
}
/*	
	System_Reg_Write : 3,
	System_Reg_Read : 4,
	System_Get_Counters : 5,
	System_Get_Connections: 6,
	System_Read_Memory : 7,
	System_Get_Info : 8,
	System_Endpoint_Tx : 9,
	System_Whitelist_Append : 10,
	System_Whitelist_Remove : 11,
	System_Whitelist_Clear : 12,
	System_Endpoint_Rx : 13,
	System_Set_Watermarks : 14,*/

var _bgResponseRegisterWrite = function(params) {

}


BGLib.prototype.Responses = {
	0 : [_bgResponseReset, _bgResponseHello, _bgResponseAddressGet],
}



var _bgEventPortStatusChange = function(params){
	this.name = "portStatusChange";
	this.timestamp = numberFromBytes([params[0], params[1], params[2], params[3]])
	this.port = params[4];
	this.irq = params[5];
	this.state = params[6];
}	

BGLib.prototype.Events = {
	7 : [_bgEventPortStatusChange],
}

BGLib.prototype.EventNames = {
	0 : [],
	1 : [],
	2 : [],
	3 : [],
	4 : [],
	5 : [],
	6 : [],
	7 : ["portEventStatusChange"],
}

var ParsedPacket = function(packet, responseType, response) {
	this.packet = packet;
	this.responseType = responseType;
	this.response = response;
}


BGLib.prototype.parseIncoming = function(incomingBytes, callback) {

	// Temporary until bind is working
	var self = this;

	// Parse and put packets back together
	this.reconstructPackets(incomingBytes, function(err, packets) {

		// if (DEBUG) {
		// 	console.log("We have ", packets.length, " packets.");
		// 	console.log("Packets: ", packets);
		// 	console.log("Payload: ", packets[0].payload);
		// }


		var parsedReturn = [];

		if (err) {
			console.log("There was an issue constructing the packet...");
			callback && callback(err, null);
		}

		// For each packet
		for (var i = 0; i < packets.length; i++) {

			// Parse the response into appropriate Params
			var packet = packets[i];

			var data;

			// If this packet is an event
			if ((packet.packetHeader.mType & 0x80) == 0x80) {

				if (DEBUG) console.log("We have an event!");
				// Create the event object
				data = new self.Events[packet.packetHeader.cClass][packet.packetHeader.cID](packet.payload.rawPayload);

				// Add the parsed packet to the return array
				parsedReturn.push(new ParsedPacket(packet, "Event", data));

			// If it was a response
			} else if ((packet.packetHeader.mType & 0x80) == 0x00) {

				// Create the response object
				data = new self.Responses[packet.packetHeader.cClass][packet.packetHeader.cID](packet.payload.rawPayload);

				// Add the parsed packet to the array
				parsedReturn.push(new ParsedPacket(packet, "Response", data));

			} else {
				if (DEBUG) console.log("What's up with this mType?: ", packet.packetHeader.mType);
				callback(new Error("Packet Parsing Error"), null);
			}
		};


		callback && callback(err, parsedReturn);

		return parsedReturn;

	});
}

BGLib.prototype.reconstructPackets = function(incomingBytes, callback) {

	var packets = [];

	// Create the packets
	for (var i = 0; i < incomingBytes.length; i++) {

		var ch = incomingBytes[i];

		if (bgapiRXBufferPos == 0) {
			// beginning of packet, check for correct framing/expected byte(s)
			// BGAPI packet for Bluetooth Smart Single Mode must be either Command/Response (0x00) or Event (0x80)
			if ((ch & 0x78) == 0x00) {
				// store new character in RX buffer
				bgapiRXBuffer[bgapiRXBufferPos++] = ch;
			} else {
				 callback(new Error("Packet Frame Error"), null); // packet format error
			}
		} 
		else {

			bgapiRXBuffer[bgapiRXBufferPos++] = ch;

			if (bgapiRXBufferPos == 2) {
				// just received "Length Low" byte, so store expected packet length
				bgapiRXDataLen = ch + ((bgapiRXBuffer[0] & 0x03) << 8);
			}
			else if (bgapiRXBufferPos == bgapiRXDataLen + 4) {
				// just received last expected bytes
				// reset RX packet buffer position to be ready for new packet
				bgapiRXBufferPos = 0;


				// Set up the header
				var type_hilen = bgapiRXBuffer[0];
				var lolen = bgapiRXBuffer[1];
				var cls = bgapiRXBuffer[2];
				var command = bgapiRXBuffer[3];

				var payloadData = [];
				// Set the data bits
				for (var j = 0; j < lolen; j++) {
					payloadData[j] = bgapiRXBuffer[4 + j];
				}

				var payload = new Payload(payloadData);

				var header = new PacketHeader(type_hilen & 0x80, type_hilen & 0x08, payload, cls, command);

				var packet = new Packet(header, payload);

				packets.push(packet);

				// const struct ble_msg *msg = ble_get_msg_hdr(hdr);

				// if (!msg) {
				// 	return -1;
				// }

				// msg->handler(data);
			}

		}
	}


	callback(null, packets);

}

/**************************************************************************
* Function: 		getPacket  
* Description:  	Takes a command ID, returns Packet object of corresponding command
* Params: 			command - the command ID of the relevant command
*					params - An array of parameters to put in payload
**************************************************************************/
BGLib.prototype.getPacket = function(command, params, callback) {

	// Get command information
	var payloadBytes = [];

	return this.verifyParams(command.paramCode, params, function(err) {

		// There's a problem with the params passed in.
		if (err) {	
			callback(err, null);
		}

		var paramCode = command.paramCode;

		// While there are still more params to add
		while (paramCode) {

			// Load the next parameter
			var param = params.shift();

			// Grab the next param code
			switch(paramCode & 0xF) {

				// This parameter should be 32 bits
				case 7:
				case 6:

					// Add each byte of param to array
					payloadBytes = payloadBytes.concat(numberIntoByteArray(param, 4));

					break;

				// This parameter should be 16 bits
				case 5:
				case 4:

					// Add each byte of param to array
					payloadBytes = payloadBytes.concat(numberIntoByteArray(param, 2));

					break;

				// This parameter is 8 bits
				case 3:
				case 2:

					// Add each byte of param to array
					payloadBytes = payloadBytes.concat(numberIntoByteArray(param, 1));

					break
				// This parameter is a data length and uint8 array
				case 9:
				case 8:

					var data_len = param;

					payloadBytes.push(data_len);

					var totalPacketSize = data_len + command.header.payloadLowBits;
					command.header.payloadLowBits = getLowerBits(totalPacketSize);
					command.header.payloadHighBits = getUpperBits(totalPacketSize);

					param = params.shift();
					payloadBytes.push(param);

					break;

				// This parameter is a hardware address
				case 10:

					payloadBytes = payloadBytes.concat(param);

				// uint16 array (and data length)
				case 11:

					var data_len = param;

					payloadBytes.push(getLowerBits(data_len));
					payloadBytes.push(getUpperBits(data_len));

					var totalPacketSize = data_len + command.header.payloadLowBits;
					command.header.payloadLowBits = getLowerBits(totalPacketSize);
					command.header.payloadHighBits = getUpperBits(totalPacketSize);

					param = params.shift();
					payloadBytes.push(param);
			}

			paramCode  = paramCode >> 4;
		}

		var payload = new Payload(payloadBytes);

		var payloadSize = payload.getPayloadByteSize();

		var header = new PacketHeader(_bgmessageType.Command,
			_bgtechnologyType.Bluetooth,
			payload, 
			command.header.cls, 
			command.header.command
			);

		var packet = new Packet(header, payload)
	
		callback && callback(null, packet);

		return packet;
	});
}

BGLib.prototype.verifyParams = function(paramCode, params, callback) {

	numParams = 0;

	if (!params) {
		if (paramCode)  return callback(new Error("Invalid parameters passed"));
		else return callback();
	}

	while (paramCode & 0xF) {
		numParams++;
		paramCode = paramCode >> 4;
	}


	if (numParams != params.length) {
		console.log("Number of params should be: " + numParams);
		console.log("Instead there are: ", params.length);
		return callback(new Error("Invalid parameters passed"));
	} else {
		return callback(null);
	}
}

function numberIntoByteArray(number, numBytes) {

	var byteArray = [];

	for (var i = 0; i < numBytes; i++) {
		byteArray.push(number & 0xFF);
		number >> 8;
	}
	return byteArray;
}

BGLib.prototype.getEventName = function(eventPacket, callback) {

}


BGLib.prototype.api = {

	// System
	reset : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Reset}, paramCode: 0x02},
	hello : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Hello}, paramCode: 0x00},
	addressGet : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Address_Get}, paramCode: 0x00},
	registerWrite : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Reg_Write}, paramCode: 0x24},
	registerRead : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Reg_Read}, paramCode: 0x04},
	getCounters : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Get_Counters}, paramCode: 0x00},
	getConnections : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Get_Connections}, paramCode: 0x00},
	readMemory : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Read_Memory}, paramCode: 0x26},
	getInfo : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Get_Info}, paramCode: 0x00},
	endpointTx : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Endpoint_Tx}, paramCode: 0x82},
	whitelistAppend : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Whitelist_Append}, paramCode: 0x2a},
	whitelistRemove : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Whitelist_Remove}, paramCode: 0x2a},
	whiteListClear : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Whitelist_Clear}, paramCode: 0x00},
	endpointRx : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Endpoint_Rx}, paramCode: 0x22},
	endpointSetWatermarks : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Reg_Write}, paramCode: 0x222},

	// 
	attributeWrite : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, cls : _bgcommandClass.AttributeClient, cid : 0x2}, paramCode: 0x022},
}

// Testing area
// var lib = new BGLib(PACKET_MODE);
// // console.log(lib.Events);
// // console.log(lib.Responses[System]);
// lib.parseIncoming([0x80, 0x07, 0x07, 0x00, 0x01, 0x02, 0x03, 0x04, 0x01, 0x10, 0x10, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], function(err, responses) {
// 	if (err) throw err;

// 	for (var i in responses) {
// 		console.log("Packet Parsed: ", responses[i]);
// 	}

// 	lib.parseIncoming([0, 1], function(err, responses) {
// 		if (err) throw err;

// 		for (var i in responses) {
// 			console.log("More Packets Parsed: ", responses[i]);
// 		}
// 	});
// });




module.exports.BGLib = BGLib;
module.exports.PACKET_MODE = PACKET_MODE;
module.exports.FLOW_CONTROL = FLOW_CONTROL;

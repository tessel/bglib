// Copyright 2014 Technical Machine, Inc. See the COPYRIGHT
// file at the top-level directory of this distribution.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

var libRes = require('./lib/bglib-responses');
var libEvent = require('./lib/bglib-events');

var DEBUG = 0;

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
	Hardware : 7,
	Test : 8,
	DFU : 9,
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
	Attclient_Attribute_Write : 5,
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
	GAP_Set_Filtering : 6,
	GAP_Set_Scan_Parameters : 7,
	GAP_Set_Adv_Parameters : 8,
	GAP_Set_Adv_Data : 9,
	GAP_Set_Directed_Connectable_Mode : 10,

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

// System Enumerations
bglib.prototype.Endpoints = {
	system_endpoint_api : 0,
	system_endpoint_test : 1,
	system_endpoint_script : 2,
	system_endpoint_usb : 3,
	system_endpoint_uart0 : 4,
	system_endpoint_uart1 : 5,
}

// Attribute Database Enumerations
bglib.prototype.AttributeChangeReason = {
	attributes_attribute_change_reason_write_request : 0,
	attributes_attribute_change_reason_write_command : 1,
	attributes_attribute_change_reason_write_request_user : 2,
}

bglib.prototype.AttributeStatusFlags = {
	attributes_attribute_status_flag_notify : 1,
	attributes_attribute_status_flag_indicate : 2,
}

// Connection Enumerations
bglib.prototype.ConnectionStatus = {
	connection_connected : 1,
	connection_encrypted : 1 << 1,
	connection_completed : 1 << 2,
	connection_parameters_change : 1 << 3,
}

// Attribute Client Enumerations
bglib.prototype.AttributeValueType = {
	attclient_attribute_value_type_read : 0,
	attclient_attribute_value_type_notify : 1,
	attclient_attribute_value_type_indicate : 2,
	attclient_attribute_value_type_read_by_type : 3,
	attclient_attribute_value_type_read_blob : 4,
	attclient_attribute_value_type_indicate_rsp_req : 5,
}

// Security Manager Enumerations
bglib.prototype.BondingKeys = {
	sm_bonding_key_ltk : 0x01,
	sm_bonding_key_addr_public : 0x02,
	sm_bonding_key_addr_static : 0x04,
	sm_bonding_key_irk : 0x08,
	sm_bonding_key_edivrand : 0x10,
	sm_bonding_key_csrk : 0x20,
	sm_bonding_key_masterid : 0x40,
}

bglib.prototype.SMPIO = {
	sm_io_capability_displayonly : 0,
	sm_io_capability_displayyesno : 1,
	sm_io_capability_keyboardonly : 2,
	sm_io_capability_noinputnooutput : 3,
	sm_io_capability_keyboarddisplay : 4,
}

// GAP Enumerations
bglib.prototype.AD_Flags = {
	GAP_AD_FLAG_LIMITED_DISCOVERABLE : 0x01,
	GAP_AD_FLAG_GENERAL_DISCOVERABLE : 0x02,
	GAP_AD_FLAG_BREDR_NOT_SUPPORTED : 0x04,
	GAP_AD_FLAG_SIMULTANEOUS_LEBREDR_CTRL : 0x10,
	GAP_AD_FLAG_SIMULTANEOUS_LEBREDR_HOST : 0x20,
	GAP_AD_FLAG_MASK : 0x1f
}

bglib.prototype.ADTypeFlags = {
	gap_ad_type_none : 0,
	gap_ad_type_flags : 1,
	gap_ad_type_services_16bit_more : 2,
	gap_ad_type_services_16bit_all : 3,
	gap_ad_type_services_32bit_more : 4,
	gap_ad_type_services_32bit_al : 5,
	gap_ad_type_services_128bit_more : 6,
	gap_ad_type_services_128bit_all : 7,
	gap_ad_type_localname_short : 8,
	gap_ad_type_localname_complete : 9,
	gap_ad_type_txpower : 10,
}

bglib.prototype.AdvertistingPolicy = {
	gap_adv_policy_all : 0,
	gap_adv_policy_whitelist_scan : 1,
	gap_adv_policy_whitelist_connect : 2,
	gap_adv_policy_whitelist_all : 3,
}

bglib.prototype.BluetoothAddressTypes = {
	gap_address_type_public : 0,
	gap_address_type_random : 1,
}

bglib.prototype.GAPConnectableMode = {
	gap_non_connectable : 0,
	gap_directed_connectable : 1,
	gap_undirected_connectable : 2,
	gap_scannable_connectable : 3,
}

bglib.prototype.GAPDiscoverableModes = {
	gap_non_discoverable : 0,
	gap_limited_discoverable : 1,
	gap_general_discoverable : 2,
	gap_broadcast : 3,
	gap_user_data : 4,
	gap_enhanced_broadcasting : 0x80,
}

bglib.prototype.GAPDiscoverMode = {
	gap_discover_limited : 0,
	gap_discover_generic : 1,
	gap_discover_observation : 2,
}

bglib.prototype.SCAN_HEADER_FLAGS = {
	GAP_SCAN_HEADER_ADV_IND : 0,
	GAP_SCAN_HEADER_ADV_DIRECT_IND : 1,
	GAP_SCAN_HEADER_ADV_NONCONN_IND : 2,
	GAP_SCAN_HEADER_SCAN_REQ : 3,
	GAP_SCAN_HEADER_SCAN_RSP : 4,
	GAP_SCAN_HEADER_CONNECT_REQ : 5,
	GAP_SCAN_HEADER_ADV_DISCOVER_IND : 6,
}

bglib.prototype.ScanPolicy = {
	gap_scan_policy_all : 0,
	gap_scan_policy_whitelist : 1
}

function Packet(messageType, technologyType, commandClass, commandID, payload, packetMode) {
	this.mType = messageType;
	this.tType = technologyType;
	this.payloadHighBits = payload.length >> 8;
	this.payloadLowBits = payload.length & 0xFF;
	this.cClass = commandClass;
	this.cID = commandID;
	this.payload = payload;
	this.packetMode = packetMode;
	this.callback = null;
}

Packet.prototype.getByteArray = function(callback) {

	// The total number of bytes will be the four header bytes plus payload
	var packetHeader;
	var numHeaderBytes = 4;
	var i = 0;

	// If we're in packet mode, it's one more byte
	if (this.packetMode) {
		numHeaderBytes++;
		// Create the packet
		packetHeader =  new Buffer(numHeaderBytes);
		// Add the length byte to the front
		packetHeader[i++] = this.payload.length + 4;
	}
	else {
		// Just make a normal header
		packetHeader =  new Buffer(numHeaderBytes);
	}

	// Make the buffer

	// Add each of the header bytes
	packetHeader[i++] = this.mType | this.tType | (this.payload.length >> 8);
	packetHeader[i++] = (this.payload.length & 0xFF);
	packetHeader[i++] = this.cClass;
	packetHeader[i++] = this.cID;

	var packetBytes = Buffer.concat([packetHeader, this.payload]);

	callback && callback(packetBytes);

	return packetBytes;
}

var ParsedPacket = function(packet, responseType, response) {
	this.packet = packet;
	this.responseType = responseType;
	this.response = response;
}

function bglib() {
	this.resetParser();
	this.packetMode = false;
}

bglib.prototype.resetParser = function() {
	this.bgapiRXBuffer = [];
	this.bgapiRXBufferPos = 0;
	this.bgapiRXDataLen = 0;
}

// IF you are not using packet mode, you'll need to
// set this variable so the length of the packets
// are appended to the packet.
bglib.prototype.setPacketMode = function(pMode) {
	this.packetMode = pMode;
}

bglib.prototype.parseIncoming = function(incomingBytes, callback) {

	var self = this;

	// Parse and put packets back together
	this.reconstructPackets(incomingBytes, function createResponse(err, packets) {

		// Array for parsed responses/events
		var parsedReturn = [];

		if (err) {
			if (DEBUG) console.log("There was an issue constructing a packet...");
			return callback && callback(err, null);
		}

		// For each packet
		for (var i = 0; i < packets.length; i++) {

			// Parse the response into appropriate Params
			var packet = packets[i];

			var data;

			if (packet.cClass < 0
				|| packet.cClass > Object.keys(_bgcommandClass).length) {
				if (DEBUG) console.log("Packet with invalid class");
				if (DEBUG) console.log("Popping packet with class: ", packet.cClass);
				packets.splice(i, 1);
				i--;
				continue;
			}

			// If this packet is an event
			if ((packet.mType & 0x80) == 0x80) {

				if (DEBUG) console.log("We have an event!");

				try {
					var eventCreator;
					// Check to see if we have an event object for this packet
					if ((eventCreator=libEvent.Events[packet.cClass][packet.cID])) {

					// Create the event object
					data = new eventCreator(packet.payload);

					// Add the parsed packet to the return array
					 parsedReturn.push(new ParsedPacket(packet, "Event", data));

					} else {
						throw new Error("No existing event creator for packet of class " + packet.cClass + " and command id " +  packet.cID);
					}
				} catch (e) {
					// Eventually do something smarter here
					 console.log(e);
					 continue;
				}
			// If it was a response
			} else if ((packet.mType & 0x80) == 0x00) {

				if (DEBUG) console.log("We have a response!");
				if (DEBUG) console.log("Class: ", packet.cClass, "command", packet.cID);

				// Create the response object
				try {
					var responseCreator;
					if ((responseCreator = libRes.Responses[packet.cClass][packet.cID])) {
						data = new responseCreator(packet.payload);

						// Add the parsed packet to the array
						parsedReturn.push(new ParsedPacket(packet, "Response", data));
					} else {
						throw new Error("No existing response creator for packet of class " + packet.cClass + " and command id " +  packet.cID);
					}
				} catch (e) {
					// Eventually do something smarter here
					console.log(e);
					continue;
				}

			} else {
				if (DEBUG) console.log("What's up with this mType?: ", packet.mType);
				callback(new Error("Packet Parsing Error"), null);
			}
		};
		// Return all the packets
		callback && callback(err, parsedReturn);

		return parsedReturn;

	});
}

bglib.prototype.reconstructPackets = function(incomingBytes, callback) {

	if (!incomingBytes) callback(new Error("No bytes passed into packet reconstruction"));

	var packets = [];

	// Create the packets
	for (var i = 0; i < incomingBytes.length; i++) {

		// Gran the callback byte
		var ch = incomingBytes[i];

		// If this is the beginning of the packet
		if (this.bgapiRXBufferPos == 0) {
			// check for correct framing/expected byte(s)
			// BGAPI packet for Bluetooth Smart Single Mode must be either Command/Response (0x00) or Event (0x80)
			if ((ch == 0x80) || (ch == 0x00)) {

				// store new character in RX buffer
				this.bgapiRXBuffer[this.bgapiRXBufferPos++] = ch;

			// If not, something screwy happened
			} else {

				if (DEBUG) console.log("Warning: Packet Frame Issue.");

				// Try to move forward to the callback packet frame.
				while (i < incomingBytes.length) {
					// If it's an event or response header
					if (incomingBytes[i] == 0x80 || incomingBytes[i] == 0x00) {

						// Go back one byte (because loop iteration will increase)
						i--;
						// Break out of while loop
						break;

					} else {
						i++;
					}
				}

				// return;
				continue;
			}
		}
		// If this is not the first byte of the packet
		else {

			// Add the byte to the rx Buffer
			this.bgapiRXBuffer[this.bgapiRXBufferPos++] = ch;

			// If this is the "length" byte
			if (this.bgapiRXBufferPos == 2) {

				// store expected packet length so we know when this packet is complete
				this.bgapiRXDataLen = ch + ((this.bgapiRXBuffer[0] & 0x03) << 8);
			}
			else if (this.bgapiRXBufferPos == this.bgapiRXDataLen + 4) {
				// just received last expected bytes
				// reset RX packet buffer position to be ready for new packet
				this.bgapiRXBufferPos = 0;


				// Set up the header
				var type_hilen = this.bgapiRXBuffer[0];
				var lolen = this.bgapiRXBuffer[1];
				var cls = this.bgapiRXBuffer[2];
				var command = this.bgapiRXBuffer[3];

				// We may have pulled misformed packets and we
				// need to make sure that we don't over index;
				var payloadLen = (lolen > (this.bgapiRXBuffer.length - 4) ? (this.bgapiRXBuffer.length - 4) : lolen);

				var payload = new Buffer(payloadLen);

				for (var j = 0; j < payloadLen; j++) {
					payload[j] = this.bgapiRXBuffer[4 + j];
				}

				var packet = new Packet(type_hilen & 0x80, type_hilen & 0x08, cls, command, payload, this.packetMode);

				// If we successfully created the packet
				if (packet) {

					packets.push(packet);

					if (DEBUG) console.log("added packet: ", packet);
				}
				else {
					console.log('Warning, packet creation was obstructed somehow.');
				}
			}

		}
	}

	callback(null, packets);

}

bglib.prototype.debugPacket = function(packet) {
  for (var i = 0; i < packet.length; i++) {
    console.log("Byte at index", i, "is", packet[i]);
  }
}

/*******************************************************/

/**************************************************************************
* Function: 		getPacket
* Description:  	Takes a command ID, returns Packet object of corresponding command
* Params: 			command - the command ID of the relevant command
*					params - An array of parameters to put in payload
**************************************************************************/
bglib.prototype.getPacket = function(command, params, callback) {

	// To allow users to not pass in an empty array when
	// they don't have params, check if the callback
	// was passed as second argument
	if ((!callback && typeof params == "function") || (!params && !callback)) {
		callback = params;
		params = [];
	}

	this.verifyParams(command.paramCode, params, function(err) {

		// Get command information
		var payloadBuffer = new Buffer(0);

		// There's a problem with the params passed in.
		if (err) {
			callback && callback(err, null);
			return;
		}

		var paramCode = command.paramCode;

		// While there are still more params to add
		while (paramCode) {

			// Get the next parameter
			var param = params.shift();

			// Grab the param type
			switch(paramCode & 0xF) {

				// This parameter is 32 bits
				case 7:
				case 6:

					// If it's already separated into an array for us
					if (Array.isArray(param)) {

						payloadBuffer = Buffer.concat([payloadBuffer, new Buffer(param)]);

					}
					else {
						// Add each byte of param to array
						var rBuf = new Buffer(4);
						rBuf.writeUInt32LE(param, 0);
						payloadBuffer = Buffer.concat([payloadBuffer, rBuf], payloadBuffer.length + rBuf.length);
					}

					break;

				// This parameter should be 16 bits
				case 5:
				case 4:
				// If it's already separated into an array for us
					if (Array.isArray(param)) {

						payloadBuffer = Buffer.concat([payloadBuffer, new Buffer(param)]);

					} else {
						// Add each byte of param to array
						var rBuf = new Buffer(2);
						rBuf.writeUInt16LE(param, 0);
						payloadBuffer = Buffer.concat([payloadBuffer, rBuf], payloadBuffer.length + rBuf.length);
					}

					break;

				// This parameter is 8 bits
				case 3:
				case 2:
					// Add each byte of param to array
					var rBuf = new Buffer(1);
					rBuf.writeUInt8(param, 0);
					payloadBuffer = Buffer.concat([payloadBuffer, rBuf], payloadBuffer.length + rBuf.length);

					break
				// This parameter is a data length and uint8 array
				case 9:
				case 8:

					var dataBuf;

					if (Buffer.isBuffer(param)) {
						dataBuf = param;
					}
					else if (Array.isArray(param) || typeof param == "string") {
						dataBuf = new Buffer(param);
					}
					else {
						return callback && callback(new Error("Invalid parameter type. Should be an Array or string"));
					}

					var dataLength = dataBuf.length;

					var totalPacketSize = dataLength + command.header.lolen;

					command.header.payloadLowBits = totalPacketSize & 0xFF;
					command.header.payloadHighBits = totalPacketSize >> 8;

					dataBuf = Buffer.concat([new Buffer([dataLength]), dataBuf], dataLength + 1);

					payloadBuffer = Buffer.concat([payloadBuffer, dataBuf], payloadBuffer.length + dataBuf.length);

					break;

				// This parameter is a hardware address
				case 10:
					var address;
					if (Array.isArray(param)) {
						address = new Buffer(address);
					}
					if (Buffer.isBuffer(param)) {
						address = param;
					}
					payloadBuffer = Buffer.concat([payloadBuffer, address]);

					break;

				// uint16 array (and data length)
				case 11:

					var dataBuf;

					if (Buffer.isBuffer(param)) {
						dataBuf = param;
					}
					else if (Array.isArray(param) || typeof param == "string") {
						dataBuf = new Buffer(param);
					}
					else {
						return callback && callback(new Error("Invalid parameter type. Should be an Array or string"));
					}
					// Times two because these are uint16s
					var dataLength = param.length * 2;

					var totalPacketSize = dataLength + command.header.lolen;

					command.header.payloadLowBits = totalPacketSize & 0xFF;
					command.header.payloadHighBits = totalPacketSize >> 8;

					dataBuf = Buffer.concat([new Buffer([dataLength]), new Buffer(dataBuf)], dataLength + 1);

					payloadBuffer = Buffer.concat([payloadBuffer, dataBuf], payloadBuffer.length + dataBuf.length);

					break;
			}

			paramCode  = paramCode >> 4;
		}
		// Make the packet with the payload and header
		var packet = new Packet(_bgmessageType.Command,
			_bgtechnologyType.Bluetooth,
			command.header.cls,
			command.header.command,
			payloadBuffer,
			this.packetMode);

		// Call the callback
		callback && callback(null, packet);

		// Return the packet if it was lazily created
		return packet;
	}.bind(this));
}

bglib.prototype.verifyParams = function(paramCode, params, callback) {

	// If there are no params
	if (!params) {
		// And the param code indicates that there should be, throw an err
		if (paramCode)  return callback(new Error("Need to pass in parameters"));

		// If there shouldn't be, just return
		else return callback(null);
	}

	var numParams = this.numParamsFromCode(paramCode);

	// Make sure the number passed in is correct
	if (numParams != params.length) {
		return callback(new Error("Invalid number of parameters passed for method"));
	} else {
		return callback(null);
	}
}

bglib.prototype.numParamsFromCode = function(paramCode) {
	var numParams = 0;
	// Calculate the number of params there should be
	while (paramCode & 0xF) {
		numParams++;
		paramCode = paramCode >> 4;
	}

	return numParams;
}

bglib.api = {

	// System
	systemReset : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Reset}, paramCode: 0x02},
	systemHello : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Hello}, paramCode: 0x00},
	systemAddressGet : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Address_Get}, paramCode: 0x00},
	systemRegisterWrite : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Reg_Write}, paramCode: 0x24},
	systemRegisterRead : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Reg_Read}, paramCode: 0x04},
	systemGetCounters : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Get_Counters}, paramCode: 0x00},
	systemGetConnections : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Get_Connections}, paramCode: 0x00},
	systemReadMemory : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 5, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Read_Memory}, paramCode: 0x26},
	systemGetInfo : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Get_Info}, paramCode: 0x00},
	systemEndpointTx : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Endpoint_Tx}, paramCode: 0x82},
	systemWhitelistAppend : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 7, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Whitelist_Append}, paramCode: 0x2a},
	systemWhitelistRemove : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 7, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Whitelist_Remove}, paramCode: 0x2a},
	systemWhiteListClear : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Whitelist_Clear}, paramCode: 0x00},
	systemEndpointRx : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Endpoint_Rx}, paramCode: 0x22},
	systemEndpointSetWatermarks : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.System, command : _bgcommandIDs.System_Reg_Write}, paramCode: 0x222},


	// Persistent Storage
	psDefrag : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.PersistentStore, command : _bgcommandIDs.Flash_PS_Defrag}, paramCode: 0x00},
	psDump : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.PersistentStore, command : _bgcommandIDs.Flash_PS_Dump}, paramCode: 0x00},
	psEraseAll : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.PersistentStore, command : _bgcommandIDs.Flash_PS_Erase_All}, paramCode: 0x00},
	psSave : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.PersistentStore, command : _bgcommandIDs.Flash_PS_Save}, paramCode: 0x84},
	psLoad : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.PersistentStore, command : _bgcommandIDs.Flash_PS_Load}, paramCode: 0x04},
	psErase : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.PersistentStore, command : _bgcommandIDs.Flash_PS_Erase}, paramCode: 0x04},
	flashErasePage : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.PersistentStore, command : _bgcommandIDs.Flash_Erase_Page}, paramCode: 0x02},
	flashWriteWords : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.PersistentStore, command : _bgcommandIDs.Flash_Write_Words}, paramCode: 0x84},

	// Attribute Database
	attributesWrite : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 4, cls : _bgcommandClass.AttributeDatabase, command : _bgcommandIDs.Attributes_Write}, paramCode: 0x824},
	attributesRead : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 4, cls : _bgcommandClass.AttributeDatabase, command : _bgcommandIDs.Attributes_Read}, paramCode: 0x44},
	attributesReadType : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.AttributeDatabase, command : _bgcommandIDs.Attributes_Read_Type}, paramCode: 0x04},
	attributesUserReadResponse : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.AttributeDatabase, command : _bgcommandIDs.Attributes_User_Read_Response}, paramCode: 0x822},
	attributesUserWriteResponse : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.AttributeDatabase, command : _bgcommandIDs.Attributes_User_Write_Response}, paramCode: 0x22},


	// Connection
	connectionDisconnect : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.Connection, command : _bgcommandIDs.Connection_Disconnect}, paramCode: 0x02},
	connectionGetRSSI : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.Connection, command : _bgcommandIDs.Connection_Get_RSSI}, paramCode: 0x02},
	connectionUpdate : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 9, cls : _bgcommandClass.Connection, command : _bgcommandIDs.Connection_Update}, paramCode: 0x44442},
	connectionVersion : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.Connection, command : _bgcommandIDs.Connection_Version_Update}, paramCode: 0x02},
	connectionChannelMapGet : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.Connection, command : _bgcommandIDs.Connection_Channel_Map_Get}, paramCode: 0x02},
	connectionChannelMapSet : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.Connection, command : _bgcommandIDs.Connection_Channel_Map_Set}, paramCode: 0x82},
	connectionFeaturesGet : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.Connection, command : _bgcommandIDs.Connection_Features_Get}, paramCode: 0x02},
	connectionGetStatus : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.Connection, command : _bgcommandIDs.Connection_Get_Status}, paramCode: 0x02},
	connectionRawTx : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.Connection, command : _bgcommandIDs.Connection_Raw_Tx}, paramCode: 0x82},

	// Attribute Client
	attClientFindByTypeValue : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 8, cls : _bgcommandClass.AttributeClient, command : _bgcommandIDs.Attclient_Find_By_Type_Value}, paramCode: 0x84442},
	attClientReadByGroupType : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 6, cls : _bgcommandClass.AttributeClient, command : _bgcommandIDs.Attclient_Read_By_Group_Type}, paramCode: 0x8442},
	attClientReadByType : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 6, cls : _bgcommandClass.AttributeClient, command : _bgcommandIDs.Attclient_Read_By_Type}, paramCode: 0x8442},
	attClientFindInformation : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 5, cls : _bgcommandClass.AttributeClient, command : _bgcommandIDs.Attclient_Find_Information}, paramCode: 0x442},
	attClientReadByHandle : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.AttributeClient, command : _bgcommandIDs.Attclient_Read_By_Handle}, paramCode: 0x42},
	attClientAttributeWrite : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 4, cls : _bgcommandClass.AttributeClient, command : _bgcommandIDs.Attclient_Attribute_Write}, paramCode: 0x842},
	attClientWriteCommand : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 4, cls : _bgcommandClass.AttributeClient, command : _bgcommandIDs.Attclient_Write_Command}, paramCode: 0x842},
	attClientIndicateConfirm : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.AttributeClient, command : _bgcommandIDs.Attclient_Indicate_Confirm}, paramCode: 0x02},
	attClientReadLong : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.AttributeClient, command : _bgcommandIDs.Attclient_Read_Long}, paramCode: 0x42},
	attClientPrepareWrite : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 6, cls : _bgcommandClass.AttributeClient, command : _bgcommandIDs.Attclient_Prepare_Write}, paramCode: 0x8442},
	attClientExecuteWrite : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.AttributeClient, command : _bgcommandIDs.Attclient_Execute_Write}, paramCode: 0x22},
	attClientReadMultiple : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.AttributeClient, command : _bgcommandIDs.Attclient_Read_Multiple}, paramCode: 0x82},

	// Security Manager
	smEncryptStart : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.SecurityManager, command : _bgcommandIDs.SM_Encrypt_Start}, paramCode: 0x22},
	smSetBondableMode : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.SecurityManager, command : _bgcommandIDs.SM_Set_Bondable_Mode}, paramCode: 0x02},
	smDeleteBonding : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.SecurityManager, command : _bgcommandIDs.SM_Delete_Bonding}, paramCode: 0x02},
	smSetParameters : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.SecurityManager, command : _bgcommandIDs.SM_Set_Parameters}, paramCode: 0x222},
	smPasskeyEntry : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 5, cls : _bgcommandClass.SecurityManager, command : _bgcommandIDs.SM_Passkey_Entry}, paramCode: 0x62},
	smGetBonds : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.SecurityManager, command : _bgcommandIDs.SM_Get_Bonds}, paramCode: 0x00},
	smSetOOBData: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.SecurityManager, command : _bgcommandIDs.SM_Set_OOB_Data}, paramCode: 0x08},


	// GAP
	gapSetPrivacyFlags: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.GenericAccessProfile, command : _bgcommandIDs.GAP_Set_Privacy_Flags}, paramCode: 0x22},
	gapSetMode: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.GenericAccessProfile, command : _bgcommandIDs.GAP_Set_Mode}, paramCode: 0x22},
	gapDiscover: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.GenericAccessProfile, command : _bgcommandIDs.GAP_Discover}, paramCode: 0x02},
	gapConnectDirect: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0xf, cls : _bgcommandClass.GenericAccessProfile, command : _bgcommandIDs.GAP_Connect_Direct}, paramCode: 0x44442a},
	gapEndProcedure: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.GenericAccessProfile, command : _bgcommandIDs.GAP_End_Procedure}, paramCode: 0x00},
	gapConnectSelective: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 8, cls : _bgcommandClass.GenericAccessProfile, command : _bgcommandIDs.GAP_Connect_Selective}, paramCode: 0x4444},
	gapSetFiltering: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.GenericAccessProfile, command : _bgcommandIDs.GAP_Set_Filtering}, paramCode: 0x222},
	gapSetScanParameters: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 5, cls : _bgcommandClass.GenericAccessProfile, command : _bgcommandIDs.GAP_Set_Scan_Parameters}, paramCode: 0x244},
	gapSetAdvParameters: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 5, cls : _bgcommandClass.GenericAccessProfile, command : _bgcommandIDs.GAP_Set_Adv_Parameters}, paramCode: 0x244},
	gapSetAdvData: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.GenericAccessProfile, command : _bgcommandIDs.GAP_Set_Adv_Data}, paramCode: 0x82},
	gapSetDirectedConnectable: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 7, cls : _bgcommandClass.GenericAccessProfile, command : _bgcommandIDs.GAP_Set_Directed_Connectable_Mode}, paramCode: 0x2a},

	// Hardware
	hwIOPortConfigIRQ: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.Hardware, command : _bgcommandIDs.HW_IO_Port_Config_IRQ}, paramCode: 0x222},
	hwSetSoftTimer: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 6, cls : _bgcommandClass.Hardware, command : _bgcommandIDs.HW_Set_Soft_Timer}, paramCode: 0x226},
	hwADCRead: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.Hardware, command : _bgcommandIDs.HW_ADC_Read}, paramCode: 0x222},
	hwIOPortConfigDirection: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.Hardware, command : _bgcommandIDs.HW_IO_Port_Config_Direction}, paramCode: 0x22},
	hwIOPortConfigFunction: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.Hardware, command : _bgcommandIDs.HW_IO_Port_Config_Function}, paramCode: 0x22},
	hwIOPortConfigPull: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.Hardware, command : _bgcommandIDs.HW_IO_Port_Config_Pull}, paramCode: 0x222},
	hwIOPortWrite: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.Hardware, command : _bgcommandIDs.HW_IO_Port_Write}, paramCode: 0x222},
	hwIOPortRead: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.Hardware, command : _bgcommandIDs.HW_IO_Port_Read}, paramCode: 0x22},
	hwSPIConfig: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 6, cls : _bgcommandClass.Hardware, command : _bgcommandIDs.HW_SPI_Config}, paramCode: 0x222222},
	hwSPITransfer: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 2, cls : _bgcommandClass.Hardware, command : _bgcommandIDs.HW_SPI_Transfer}, paramCode: 0x824},
	hwI2CRead: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.Hardware, command : _bgcommandIDs.HW_I2C_Read}, paramCode: 0x222},
	hwI2CWrite: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.Hardware, command : _bgcommandIDs.HW_I2C_Write}, paramCode: 0x822},
	hwSetTxPower: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.Hardware, command : _bgcommandIDs.HW_Set_Tx_Power}, paramCode: 0x02},
	hwTimerComparator: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 5, cls : _bgcommandClass.Hardware, command : _bgcommandIDs.HW_Timer_Comparator}, paramCode: 0x4222},

	// Test
	testPhyTx: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 3, cls : _bgcommandClass.Test, command : _bgcommandIDs.Test_Phy_Tx}, paramCode: 0x00},
	testPhyRx: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.Test, command : _bgcommandIDs.Test_Phy_Rx}, paramCode: 0x00},
	testPhyEnd: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.Test, command : _bgcommandIDs.Test_Phy_End}, paramCode: 0x04},
	testPhyReset: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.Test, command : _bgcommandIDs.Test_Phy_Reset}, paramCode: 0x00},
	testGetChannelMap: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.Test, command : _bgcommandIDs.Test_Get_Channel_Map}, paramCode: 0x08},
	testDebug : {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.Test, command : _bgcommandIDs.Test_Debug}, paramCode: 0x08},
	testgetChannelMode: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.Test, command : _bgcommandIDs.Test_Channel_Mode}, paramCode: 0x00},

	// DFU
	dfuReset: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.DFU, command : _bgcommandIDs.DFU_Reset}, paramCode: 0x02},
	dfuFlashSetAddress: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 4, cls : _bgcommandClass.DFU, command : _bgcommandIDs.DFU_Flash_Set_Address}, paramCode: 0x06},
	dfuFlashUpload: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 1, cls : _bgcommandClass.DFU, command : _bgcommandIDs.DFU_Flash_Upload}, paramCode: 0x08},
	dfuFlashUploadFinish: {header : {tType: _bgtechnologyType.Bluetooth, mType: _bgmessageType.Command, lolen : 0, cls : _bgcommandClass.DFU, command : _bgcommandIDs.DFU_Flash_Upload_Finish}, paramCode: 0x00},
}

module.exports = bglib;

// Copyright 2014 Technical Machine, Inc. See the COPYRIGHT
// file at the top-level directory of this distribution.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

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
			return e;
		case 0x184:
			e.message = "Command Not Recognized";
			e.detail = "Command was not recognized";
			return e;
		case 0x185:
			e.message = "Timeout";
			e.detail = "Command or Procedure failed due to timeout";
			return e;
		case 0x186:
			e.message = "Not Connected";
			e.detail = "Connection handle passed to command is not a valid handle";
			return e;
		case 0x187:
			e.message = "Flow";
			e.detail = "Command would cause either underflow or overflow error";
			return e;
		case 0x188:
			e.message = "User Attribute";
			e.detail = "User attribute was accessed through API which is not supported";
			return e;
		case 0x189:
			e.message = "Invalid License Key";
			e.detail = "No valid license key found";
			return e;
		case 0x18A:
			e.message = "Command Too Long";
			e.detail = "Command would cause either underflow or overflow error";
			return e;
		case 0x187:
			e.message = "Out of Bonds";
			e.detail = "Bonding procedure can't be started because device has no space left for bond.";
			return e;

		//Bluetooth Errors
		case 0x205:
			e.message = "Authentication Failure";
			e.detail = "Pairing or authentication failed due to incorrect results in the pairing or authentication procedure. This could be due to an incorrect PIN or Link Key";
			return e;
		case 0x206:
			e.message = "Pin or Key Missing";
			e.detail = "Pairing failed because of missing PIN, or authentication failed because of missing Key.";
			return e;
		case 0x207:
			e.message = "Memory Capacity Exceeded";
			e.detail = "Controller is out of memory.";
			return e;
		case 0x208:
			e.message = "Connection Timeout";
			e.detail = "Link supervision timeout has expired.";
			return e;
		case 0x209:
			e.message = "Connection Limit Exceeded";
			e.detail = "Controller is at limit of connections it can support.";
			return e;
		case 0x20C:
			e.message = "Command Disallowed";
			e.detail = "Command requested cannot be executed because the Controller is in a state where it cannot process this command at this time.";
			return e;
		case 0x212:
			e.message = "Invalid Command Parameters";
			e.detail = "Command contained invalid parameters."
			return e;
			return e;
		case 0x213:
			e.message = "Remote User Terminated Connection";
			e.detail = "User on the remote device terminated the connection.";
			return e;
		case 0x216:
			e.message = "Connection Terminated by Local Host";
			e.detail = "Local device terminated the connection.";
			return e;
		case 0x222:
			e.message = "LL Response Timeout";
			e.detail = "CConnection terminated due to link-layer procedure timeout.";
			return e;
		case 0x228:
			e.message = "LL Instant Passed";
			e.detail = "Received link-layer control packet where instant was in the past.";
			return e;
		case 0x23A:
			e.message = "Controller Busy";
			e.detail = "Operation was rejected because the controller is busy and unable to process the request.";
			return e;
		case 0x23B:
			e.message = "Unacceptable Connection Interval";
			e.detail = "The Unacceptable Connection Interval error code indicates that the remote device terminated the connection because of an unacceptable connection interval.";
			return e;
		case 0x23C:
			e.message = "Directed Advertising Timeout";
			e.detail = "Directed advertising completed without a connection being created.";
			return e;
		case 0x23D:
			e.message = "MIC Failure";
			e.detail = "Connection was terminated because the Message Integrity Check (MIC) failed on a received packet.";
			return e;
		case 0x23E:
			e.message = "Connection Failed to be Established";
			e.detail = "LL initiated a connection but the connection has failed to be established. Controller did not receive any packets from remote end.";
			return e;

		// Security Errors
		case 0x301:
			e.message = "Passkey Entry Failed";
			e.detail = "The user input of passkey failed, for example, the user cancelled the operation";
			return e;
		case 0x302:
			e.message = "OOB Data is not available";
			e.detail = "Out of Band data is not available for authentication.";
			return e;
		case 0x303:
			e.message = "Authentication Requirements";
			e.detail = "The pairing procedure cannot be performed as authentication requirements cannot be met due to IO capabilities of one or both devices";
			return e;
		case 0x304:
			e.message = "Confirm Value Failed";
			e.detail = "The confirm value does not match the calculated compare value.";
			return e;
		case 0x305:
			e.message = "Pairing Not Supported";
			e.detail = "Pairing is not supported by the device.";
			return e;
		case 0x306:
			e.message = "Encryption Key Size";
			e.detail = "The resultant encryption key size is insufficient for the security requirements of this device.";
			return e;
		case 0x307:
			e.message = "Command Not Supported";
			e.detail = "The SMP command received is not supported on this device.";
			return e;
		case 0x308:
			e.message = "Unspecified Reason";
			e.detail = "Pairing failed due to an unspecified reason.";
			return e;
		case 0x309:
			e.message = "Repeated Attempts";
			e.detail = "Pairing or authentication procedure is disallowed because too little time has elapsed since last pairing request or security request.";
			return e;
		case 0x30A:
			e.message = "Invalid Parameters";
			e.detail = "The Invalid Parameters error code indicates: the command length is invalid or a parameter is outside of the specified range.";
			return e;

		// Attribute Protocol Errors
		case 0x0401:
			e.message = "Invalid Handle";
			e.detail = "The attribute handle given was not valid on this server.";
			return e;
		case 0x0402:
			e.message = "Read Not Permitted";
			e.detail = "The attribute cannot be read.";
			return e;
		case 0x0403:
			e.message = "Write Not Permitted ";
			e.detail = "The attribute cannot be written.";
			return e;
		case 0x0404:
			e.message = "Invalid PDU";
			e.detail = "The attribute PDU was invalid.";
			return e;
		case 0x0405:
			e.message = "Insufficient Authentication";
			e.detail = "The attribute requires authentication before it can be read or written.";
			return e;
		case 0x0406:
			e.message = "Request Not Supported";
			e.detail = "Attribute Server does not support the request received from the client.";
			return e;
		case 0x0407:
			e.message = "Invalid Offset";
			e.detail = "Offset specified was past the end of the attribute.";
			return e;
		case 0x0408:
			e.message = "Insufficient Authorization";
			e.detail = "The attribute requires authorization before it can be read or written.";
			return e;
		case 0x0409:
			e.message = "Prepare Queue Full";
			e.detail = "Too many prepare writes have been queued.";
			return e;
		case 0x040A:
			e.message = "Attribute Not Found";
			e.detail = "No attribute found within the given attribute handle range.";
			return e;
		case 0x040B:
			e.message = "Attribute Not Long";
			e.detail = "The attribute cannot be read or written using the Read Blob Request.";
			return e;
		case 0x040C:
			e.message = "Insufficient Encryption Key Size";
			e.detail = "The Encryption Key Size used for encrypting this link is insufficient.";
			return e;
		case 0x040D:
			e.message = "Invalid Attribute Value Length";
			e.detail = "The attribute value length is invalid for the operation.";
			return e;
		case 0x040E:
			e.message = "Unlikely Error";
			e.detail = "The attribute request that was requested has encountered an error that was unlikely, and therefore could not be completed as requested.";
			return e;
		case 0x040F:
			e.message = "Insufficient Encryption";
			e.detail = "The attribute requires encryption before it can be read or written.";
			return e;
		case 0x0410:
			e.message = "Unsupported Group Type";
			e.detail = "The attribute type is not a supported grouping attribute as defined by a higher layer specification.";
			return e;
		case 0x0411:
			e.message = "Insufficient Resources";
			e.detail = "Insufficient Resources to complete the request.";
			return e;
		case 0x0480:
			e.message = "Application Error Codes";
			e.detail = "Application error code defined by a higher layer specification.";
			return e;
	}

	return -1;
}

function BGLibError() {
	this.name = "BGLibError";
	this.message = "Generic BGLib Error";
	this.detail = "";
}

BGLibError.prototype = new Error();
BGLibError.prototype.constructor = BGLibError;

module.exports.BGLibError = BGLibError;
module.exports.getErrorFromCode = getErrorFromCode;

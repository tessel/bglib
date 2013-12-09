function getUpperBits(num) {
	return num >> 8;
}
function getLowerBits(num) {
	return num & 0xFF;
}

// Returns the actual bytes of a positive number
function getUint8BytesOfNumber(num) {

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
function numberUint8ByteSize(number) {

	return getUint8BytesOfNumber(number).length;
}

function numberFromUint8Bytes(bytes) {

	// If the user passed in a bunch of arguments
	// Instead of an array

	if (!Array.isArray(bytes)) {
		bytes = arguments;
	}

	var num = 0;
	for (var i in bytes) {
		num += (bytes[i] << (i * 8))
	}

	return num;
}

function numberIntoNLengthByteArray(number, n) {

	var byteArray = [];

	for (var i = 0; i < n; i++) {
		byteArray.push(number & 0xFF);
		number >> 8;
	}
	// console.log("Returning: ", byteArray);
	return byteArray;
}

function getUint8ByteVal(obj) {
	if (typeof obj == 'number') {
		if (obj < 0) {
			throw new Error("Cannot get number of bytes of negative number yet...");
		}
		return getUint8BytesOfNumber(obj);
	}
	else if (typeof obj == 'string') {
		return getBytesOfString(obj);
	}
	else {
		throw new Error("You can only send numbers or strings...");
	}
}

module.exports.getUpperBits = getUpperBits;
module.exports.getLowerBits = getLowerBits;
module.exports.getBytesOfString = getBytesOfString;
module.exports.getUint8BytesOfNumber = getUint8BytesOfNumber;
module.exports.numberUint8ByteSize = numberUint8ByteSize;
module.exports.numberFromUint8Bytes = numberFromUint8Bytes;
module.exports.numberIntoNLengthByteArray = numberIntoNLengthByteArray;
module.exports.getUint8ByteVal = getUint8ByteVal;
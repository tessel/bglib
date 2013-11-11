var bitwise = require('../BitwiseOperations/BitwiseOperations');

/***************************************
*		SYSTEM RESPONSES
****************************************/ 


var _bgEventPortStatusChange = function(params){
	this.timestamp = bitwise.numberFromUint8Bytes([params[0], params[1], params[2], params[3]])
	this.port = params[4];
	this.irq = params[5];
	this.state = params[6];
}	

var Events = {
	0: [],
	1: [],
	2: [],
	3: [],
	4: [],
	5: [],
	6: [],
	7: [_bgEventPortStatusChange],
	8: [],
}
	
module.exports.Events = Events;
module.exports.EventNames = EventNames;



// Buffer.prototype.slice = function(start, end) {
// 	var len = this.length;
// 	start = ~~start;
// 	end = (end == undefined) ? len : ~~end;

// 	if (start < 0) {
// 		start += len;
// 		if (start < 0) start = 0;
// 	} 
// 	else if (start > len) {
// 		start = len;
// 	}

// 	if (end < 0) {
// 	end += len;
// 	if (end < 0)
// 	  end = 0;
// 	} else if (end > len) {
// 	end = len;
// 	}

// 	if (end < start)
// 	end = start;

// 	var newLen = end-start;
// 	var buf = new Buffer(newLen);
// 	for (var i = 0; i < newLen; i++) {
// 		buf[i] = this[start + i];
// 	}

// 	return buf;
// }

var buf1 = new Buffer(4);

buf1[0] = 0x3;
buf1[1] = 0x4;
buf1[2] = 0x23;
buf1[3] = 0x42;

console.log(buf1);

var buf2 = new Buffer(2);

buf2[0] = 0x10;
buf2[1] = 0x05;

console.log(buf2);

buf4 = new Buffer(0);

var buf3 = Buffer.concat([buf1, buf2, buf4]);

console.log(buf3);

var buf5 = buf3.slice(2, 4);
console.log(buf5);	
console.log(buf3);
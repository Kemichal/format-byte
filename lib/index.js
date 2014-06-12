"use strict";

var prefix = {
	bin: {
		_: 1,
		K: Math.pow(1024, 1),
		M: Math.pow(1024, 2),
		G: Math.pow(1024, 3),
		T: Math.pow(1024, 4),
		P: Math.pow(1024, 5),
		E: Math.pow(1024, 6),
		Z: Math.pow(1024, 7),
		Y: Math.pow(1024, 8)
	},
	dec: {
		_: 1,
		K: Math.pow(1000, 1),
		M: Math.pow(1000, 2),
		G: Math.pow(1000, 3),
		T: Math.pow(1000, 4),
		P: Math.pow(1000, 5),
		E: Math.pow(1000, 6),
		Z: Math.pow(1000, 7),
		Y: Math.pow(1000, 8)
	},
	biggestToSmallest: [
		'Y',
		'Z',
		'E',
		'P',
		'T',
		'G',
		'M',
		'K',
		'_'
	]
};

var _validInput = function(input) {
	if (!/^\d+(\.\d+){0,1} {0,1}([kKMGTPEZY]{0,1}i{0,1}){0,1}B/.test(input)) {
		throw new Error('Invalid input: ' + input);
	} else {
		return true;
	}
};
exports._validInput = _validInput;

var _getNumber = function(input) {
	_validInput(input);
	var regex = /^\d+(\.\d+){0,1}/;
	return parseFloat(input.match(regex)[0]);
};
exports._getNumber = _getNumber;

var _getPrefix = function(input) {
	_validInput(input);
	var prefix = input.replace(/^.+([kKMGTPEZY]).{1,2}$/, '$1');
	if (prefix === input) {
		prefix = '_';
	}
	var type = input.indexOf('i') > 0 ? 'bin' : 'dec';
	return {prefix: prefix, type: type};
};
exports._getPrefix = _getPrefix;

var toBytes = function(input) {
	var pre = _getPrefix(input);
	if (pre.prefix === '_') {
		return _getNumber(input);
	} else {
		return _getNumber(input)*prefix[pre.type][pre.prefix.toUpperCase()];	
	}
};
exports.toBytes = toBytes;

var toBinary = function(input, decimals) {
	if (decimals === undefined) {
		decimals = 2;
	}

	var bytes = toBytes(input);

	for (var i = 0; i < prefix.biggestToSmallest.length; i++) {
		var p = prefix.biggestToSmallest[i];
		if ((bytes / prefix.bin[p]) >= 1 ) {
			return ((bytes / prefix.bin[p]).toFixed(decimals) + ' ' + p +'iB').replace('_i', '');
		}
	}
};
exports.toBinary = toBinary;

var toDecimal = function(input, decimals) {
	if (decimals === undefined) {
		decimals = 2;
	}

	var bytes = toBytes(input);

	for (var i = 0; i < prefix.biggestToSmallest.length; i++) {
		var p = prefix.biggestToSmallest[i];
		if ((bytes / prefix.dec[p]) >= 1 ) {
			return ((bytes / prefix.dec[p]).toFixed(decimals) + ' ' + p +'B').replace('_', '');
		}
	}
};
exports.toDecimal = toDecimal;

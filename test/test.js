/* globals describe, it*/
"use strict";

var expect = require('chai').expect;
var FormatByte = require('../index');


describe('FormatByte', function() {

	describe('#_validInput()', function() {

		it('should throw error if input is invalid.', function() {
			expect(function() {
				FormatByte._validInput('1Mb');
			}).to.throw(Error, /Invalid input/);
		});

		it('shouldn\'t throw error if input is valid.', function() {
			expect(function() {
				FormatByte._validInput('1MB');
			}).to.not.throw(Error, /Invalid input/);
		});

	});

	describe('#_getNumber()', function() {

		it('should return the number part of the input', function() {
			expect(FormatByte._getNumber('2B')).to.equal(2);
			expect(FormatByte._getNumber('1kB')).to.equal(1);
			expect(FormatByte._getNumber('1.5 MB')).to.equal(1.5);
			expect(FormatByte._getNumber('1025TiB')).to.equal(1025);
		});
		
	});

	describe('#_getPrefix()', function() {

		it('should return an object representing the prefix and type', function() {
			expect(JSON.stringify(FormatByte._getPrefix('2B'))).to.equal(JSON.stringify({prefix: '_', type: 'dec'}));
			expect(JSON.stringify(FormatByte._getPrefix('1kB'))).to.equal(JSON.stringify({prefix: 'k', type: 'dec'}));
			expect(JSON.stringify(FormatByte._getPrefix('1.5 MB'))).to.equal(JSON.stringify({prefix: 'M', type: 'dec'}));
			expect(JSON.stringify(FormatByte._getPrefix('1025YiB'))).to.equal(JSON.stringify({prefix: 'Y', type: 'bin'}));
		});
		
	});

	describe('#toBytes()', function() {

		it('should parse the input string and return the equivalent number of bytes', function() {

			expect(FormatByte.toBytes('2B')).to.equal(2);

			expect(FormatByte.toBytes('1 kB')).to.equal(1000);
			expect(FormatByte.toBytes('1 kiB')).to.equal(1024);

			expect(FormatByte.toBytes('1.5 MB')).to.equal(1500000);
			expect(FormatByte.toBytes('1.5 MiB')).to.equal(1572864);

			expect(FormatByte.toBytes('1000.5 kB')).to.equal(1000500);
			expect(FormatByte.toBytes('1000.5 kiB')).to.equal(1024512);

			expect(FormatByte.toBytes('1 TB')).to.equal(1000000000000);
			expect(FormatByte.toBytes('1 TiB')).to.equal(1099511627776);

		});

	});	

	describe('#toBinary()', function() {
		it('should convert input to base-2', function() {

			expect(FormatByte.toBinary('1024B', 0)).to.equal('1 KiB');
			expect(FormatByte.toBinary('1024B')).to.equal('1.00 KiB');

			expect(FormatByte.toBinary('1572864B', 1)).to.equal('1.5 MiB');

			expect(FormatByte.toBinary('1.2 KB', 2)).to.equal('1.17 KiB');
		});

	});

	describe('#toDecimal()', function() {
		it('should convert input to base-10', function() {
			
			expect(FormatByte.toDecimal('1000B', 0)).to.equal('1 KB');
			expect(FormatByte.toDecimal('1000B')).to.equal('1.00 KB');

			expect(FormatByte.toDecimal('1500000B', 1)).to.equal('1.5 MB');

			expect(FormatByte.toDecimal('1.17 KiB', 1)).to.equal('1.2 KB');
		});
	});
});

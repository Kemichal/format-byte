[![Build Status](https://travis-ci.org/Kemichal/format-byte.svg?branch=master)](https://travis-ci.org/Kemichal/format-byte)

# Format Byte
NodeJS module for converting and formating strings of bytes.

## Usage
Format Byte isn't published to NPM. Add the following as a dependency in package.json
```json
"format-byte": "Kemichal/format-byte"
```
and then do `npm install`.

Require like a normal NodeJS module.
```js
var fb = require('format-byte');
```
__Examples__
```js
// Print 3 terabyte as tebibytes, 2 decimals (default).
console.log(fb.toBinary('3TB'));
// 2.73 TiB

// Print 3 million bytes as mebibytes, one decimal.
console.log(fb.toBinary('3000000B', 1));
// 2.9 MiB
```

## Functions
### toBinary(input, [decimals])
__Arguments__

* `input` - Bytes as a string.
* `decimals` - Number of decimal points.

__Examples__
```js
console.log(fb.toBinary('1024B'));
// 1.00 KiB

console.log(fb.toBinary('1024', 0));
// 1 KiB
```

### toDecimal(input, [decimals])
__Arguments__

* `input` - Bytes as a string.
* `decimals` - Number of decimal points.

__Examples__
```js
console.log(fb.toBinary('1000B'));
// 1.00 KB

console.log(fb.toBinary('1000', 0));
// 1 KB
```

### toBytes(input)
__Arguments__

* `input` - Bytes as a string.

__Examples__
```js
console.log(fb.toBytes('1KiB'));
// 1024
```

'use strict';

const fs = require('fs');
const path = require('path');

let readableStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf8');
let writeableStream = process.stdout;

// Так тоже работает
// readableStream.on('data', function(chunk){ 
//   writeableStream.write(chunk);
// });

readableStream.pipe(writeableStream);
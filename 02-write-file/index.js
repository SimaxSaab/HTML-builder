'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const rl = readline.createInterface( process.stdin );

let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'text.txt'), 'utf8');


console.log('Enter your text please:');

rl.on('line', (input) => {
  if (input == 'exit') {
    console.log('Got \'exit\'! Bye-bye!');
    process.exit(0);
  }
  writeableStream.write(input);
});

process.on('SIGINT', function () {
  console.log('Got Ctrl-C! Bye-bye!');
  process.exit(0);
});

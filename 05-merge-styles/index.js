const fsr = require('fs/promises');
const fs = require('fs');
const path = require('path');

let writeableStream = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));

try {
  const files = fsr.readdir(path.resolve(__dirname, 'styles'), {withFileTypes: true});
  files.then((files) => {
    for (const file of files) {
      if (!file.isDirectory() && path.extname(file.name) === '.css') {
        let readableStream = fs.createReadStream(path.resolve(__dirname, 'styles', file.name), 'utf8');
        readableStream.pipe(writeableStream);
      }
    }
  });
} catch (err) {
  console.error(err);
}
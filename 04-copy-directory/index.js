const fs = require('fs/promises');
const path = require('path');

fs.mkdir(path.resolve(__dirname, 'files-copy'), {recursive: true});

try {
  const files = fs.readdir(path.resolve(__dirname, 'files'), {withFileTypes: true});
  files.then((files) => {
    for (const file of files) {
      fs.copyFile(path.resolve(__dirname, 'files', file.name), path.resolve(__dirname, 'files-copy', file.name));
    }
  });
} catch (err) {
  console.error(err);
}

const fs = require('fs/promises');
const path = require('path');

try {
  const files = fs.readdir(path.resolve(__dirname, 'secret-folder'), {withFileTypes: true});
  files.then((files) => {
    for (const file of files) {
      if (!file.isDirectory()) {
        fs.stat(path.resolve(__dirname, 'secret-folder', file.name)).then(obj => {
          let str = `${file.name} - ${path.extname(file.name)} - ${obj.size}`;
          console.log(str);
        });
      }
    }
  });
} catch (err) {
  console.error(err);
}
const fs = require('fs/promises');
const path = require('path');

try {
  const files = fs.readdir(path.resolve(__dirname, 'secret-folder'), {withFileTypes: true});
  files.then((files) => {
    for (const file of files) {
      if (!file.isDirectory()) {
        fs.stat(path.resolve(__dirname, 'secret-folder', file.name)).then(obj => {
          let str = `${file.name.split('.')[0]} - ${path.extname(file.name).split('.')[1]} - ${obj.size}`;
          console.log(str);
        });
      }
    }
  });
} catch (err) {
  console.error(err);
}
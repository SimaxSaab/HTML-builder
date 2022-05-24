const fs = require('fs/promises');
const path = require('path');

async function copy() {
  await fs.rm(path.resolve(__dirname, 'files-copy'), {recursive: true, force: true});
  await fs.mkdir(path.resolve(__dirname, 'files-copy'), {recursive: true});
  const files = await fs.readdir(path.resolve(__dirname, 'files'), {withFileTypes: true});
  files.forEach(async (file) => {
    await fs.copyFile(path.resolve(__dirname, 'files', file.name), path.resolve(__dirname, 'files-copy', file.name));
  });
}

copy();

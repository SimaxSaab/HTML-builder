const fsr = require('fs/promises');
const fs = require('fs');
const path = require('path');

let tempTemplate = [], newTemplate = '';

const makedir = async () => {
  await fsr.rm(path.resolve(__dirname, 'project-dist'), {recursive: true, force: true});
  // make output dir
  await fsr.mkdir(path.resolve(__dirname, 'project-dist'), {recursive: true});
};

// make new index base template
const styleAndTemp = async () => {
  fs.readFile(path.resolve(__dirname, 'template.html'), 'utf8', (err, data) => {
    tempTemplate = data.split('{{');
    if (tempTemplate.length === 0) return;
    newTemplate += tempTemplate[0];
    async function createNewTemp() {
      for (let i = 1; i < tempTemplate.length; i++) {
        let components = tempTemplate[i].split('}}');
        let insert = await fsr.readFile(path.resolve(__dirname, 'components', `${components[0]}.html`));
        newTemplate += insert + components[1];
      }
      fsr.writeFile(path.resolve(__dirname, 'project-dist', 'index.html'), newTemplate);
    }
    createNewTemp();
  });

  let writeableCss = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'style.css'));

  try {
    const files = fsr.readdir(path.resolve(__dirname, 'styles'), {withFileTypes: true});
    files.then((files) => {
      for (const file of files) {
        if (!file.isDirectory() && path.extname(file.name) === '.css') {
          let readableStream = fs.createReadStream(path.resolve(__dirname, 'styles', file.name), 'utf8');
          readableStream.pipe(writeableCss);
        }
      }
    });
  } catch (err) {
    console.error(err);
  }

  await fsr.mkdir(path.resolve(__dirname, 'project-dist', 'assets'), {recursive: true});
};

async function copy(src, dest) {
  const files = await fsr.readdir(path.resolve(__dirname, src), {withFileTypes: true});
  files.forEach(async (file) => {
    if (!file.isDirectory()) {
      await fsr.copyFile(path.resolve(__dirname, src, file.name), path.resolve(__dirname, dest, file.name));
    } else {
      await fsr.mkdir(path.resolve(__dirname, dest, file.name));
      await copy(path.resolve(__dirname, src, file.name), path.resolve(__dirname, dest, file.name));
    }
  });
}

const main = async () => {
  await makedir();
  await styleAndTemp();
  await copy('assets', 'project-dist/assets');
};

main();

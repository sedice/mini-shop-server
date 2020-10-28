const path = require('path');
const fs = require('fs');
const {assert} = require("../utils")

function installModule(app,moduleName) {
  assert(!app[moduleName],`${moduleName} has been installed`);

  let module = app[moduleName] = [];
  let files = fs.readdirSync(path.resolve(__dirname,'../',moduleName));
  files.forEach((file) => {
    if (path.extname(file) === '.js') {
      let fileName = path.basename(file,'.js');
      assert(!module[fileName],`${fileName} has been installed in this ${moduleName}`);
      module[fileName] = require(path.resolve(__dirname,'../',moduleName,file));
    }
  })
}

module.exports = (app) => {
  ['controller','service','model'].forEach(name => {
    installModule(app,name);
    console.log(app[name]);
  })
}
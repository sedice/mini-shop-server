const { fstat } = require('fs');
const {resolve} = require('path');
const {existsSync} = require('fs');
const mode = process.env.NODE_ENV;
const filePath = resolve(__dirname,`./config.${mode}.js`);
if (!existsSync(filePath)) {
  console.error(`cant found config file named ${filePath},process exit`)
  process.exit(-1);
}

const config = require(filePath);
module.exports = config;
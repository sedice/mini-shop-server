const bcrypt = require("bcrypt");
const { hashSync } = require("bcryptjs");

function assert(condition, msg) {
  if (!condition) {
    throw new Error(msg);
  }
}

/**
 * 加密密码
 * @param {String} password 
 */
function encryptPassword(password) {
  let salt = bcrypt.genSaltSync(5);
  let hash = bcrypt.hashSync(password,salt);
  return hash;
}

/**
 * 判断明文密码和加密密码是不是对应同一个密码
 * @param {String} password 明文密码
 * @param {String} hash 数据库里存入的加密密码
 */
function comparePassword(password,hash) {
  return bcrypt.compareSync(password,hash);
}

module.exports = {
  assert,
  encryptPassword,
  comparePassword
};

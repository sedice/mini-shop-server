const mongoose = require("mongoose");
mongoose.Promise = global.Promise
const config = require("../config");

const db = mongoose.connection;

db.on('error',() => {
  console.log(`数据库${config.dburl}连接失败`);
})
db.on('open',() => {
  console.log(`数据库${config.dburl}连接成功`);
})

mongoose.set('useCreateIndex', true);
mongoose.connect(config.dburl,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex:false,
});

module.exports = mongoose;
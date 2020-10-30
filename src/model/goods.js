const mongoose = require("../db/mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Schema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  price:Number,
  detail:String,
  shop:ObjectId,
  imgs:[String]
},{
  versionKey:false,
  collection:"goods"
});

module.exports = mongoose.model('Goods',Schema);
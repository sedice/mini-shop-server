const mongoose = require("../db/mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Schema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  avatar:String,
  sex:Number, /*0 or 1, man or woman*/
},{
  versionKey:false,
  collection:"users"
});

module.exports = mongoose.model('User',Schema);
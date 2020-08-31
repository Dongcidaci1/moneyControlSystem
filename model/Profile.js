const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ProfileSchema=new Schema({
  type:{
    type:String
  },
  describe:{
    type:String
  },
  incode:{
    type:String,
    required:true
  },
  expend:{
    type:String,
    required:true
  },
  cash:{
    type:String,
    required:true
  },
  remark:{
    type:String
  }

})

module.exports=Profile=mongoose.model("profiles",ProfileSchema);
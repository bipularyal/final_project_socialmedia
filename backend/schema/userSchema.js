const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 4,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    skills:{
        type:Array,
        default:[]
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }, 
    contact_info:{
        type:String,
        default:""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema); 
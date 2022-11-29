const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    classification:{
        type:String
    },
    ref_link:{
        type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
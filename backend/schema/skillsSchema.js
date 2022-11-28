const mongoose = require("mongoose");

const SkillsSchema = new mongoose.Schema(
  {
    name:{
        type: String,
        required: true,
      },
    userId: {
        type: Array,
        required: true,
      },

  },
);

module.exports = mongoose.model("Skills", SkillsSchema);
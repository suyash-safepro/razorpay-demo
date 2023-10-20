const mongoose = require("mongoose");
const countSchema = new mongoose.Schema(
  {
    authkey: {
      type: String,
      required: [true, "auth key is required"],
    },
    cameraId: {
      type: String,
      required: [true, "camera id is required"],
    },
    people_enter: {
      type: String,
      required: [true, "camera id is required"],
    },
    people_leave: {
      type: String,
      required: [true, "camera id is required"],
    },
    male_entering: {
      type: String,
      required: [true, "camera id is required"],
    },
    female_entering: {
      type: String,
      required: [true, "camera id is required"],
    },
    male_leaving: {
      type: String,
      required: [true, "camera id is required"],
    },
    female_leaving: {
      type: String,
      required: [true, "camera id is required"],
    },
    url: {
      type: String,
      required: [true, "camera id is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("people_count", countSchema);

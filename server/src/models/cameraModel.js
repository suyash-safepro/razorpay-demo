const mongoose = require("mongoose");
const cameraRegistration = new mongoose.Schema(
  {
    cameraIp: {
      type: String,
      required: [true, "camera ip is required"],
    },
    cameraId: {
      type: String,
      required: [true, "camera id is required"],
      unique: [true, "camera id should be unique"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    rtspLink: {
      type: String,
      required: [true, "camera ip is required"],
      unique: [true, "rtsp link should be unique"],
    },
    authkey: {
      type: String,
      required: [true, "authkey is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("camera", cameraRegistration);

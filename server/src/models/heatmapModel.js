const mongoose = require("mongoose");
const heatMapSchema = new mongoose.Schema(
  {
    cameraIp: {
      type: String,
      required: [true, "camera ip is required"],
    },
    cameraId: {
      type: String,
      required: [true, "camera id is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    heatMap: {
      type: String,
      required: [true, "heatmap is required"],
    },
    authkey: {
      type: String,
      required: [true, "authkey is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("heatmap", heatMapSchema);

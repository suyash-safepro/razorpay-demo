const express = require("express");
const {
  getCount,
  createCount,
  getVideo,
} = require("../controllers/countController");

const router = express.Router();

//Get Count || GET
router.get("/:cameraId/:date", getCount);

//Get Video || GET
router.get("/video/:cameraId/:date", getVideo);

//Register Count || POST
router.post("/", createCount);

module.exports = router;

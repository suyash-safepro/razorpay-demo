const express = require("express");
const {
  getHeatMap,
  createHeatMap,
  getAllHeatMap,
} = require("../controllers/heatmapController");

const router = express.Router();

//Get Heatmap || GET
router.get("/:id", getHeatMap);

//Register Heatmap || POST
router.post("/", createHeatMap);

//Get All Heatmap || GET
// router.get("/", getAllHeatMap);

module.exports = router;

const heatmapModel = require("../models/heatmapModel");

const getHeatMap = async (req, res) => {
  try {
    const cameraId = req.params.id;

    const data = await heatmapModel
      .findOne({ cameraId })
      .sort({ createdAt: -1 });

    return res.status(201).send({
      success: true,
      message: `Get last camera Heatmap`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in geting heatmap",
      error,
    });
  }
};

const createHeatMap = async (req, res) => {
  try {
    const { cameraIp, cameraId, location, heatMap, authkey } = req.body;
    if (cameraIp && cameraId && location && heatMap && authkey) {
      const creatingHeatmap = new heatmapModel(req.body);
      await creatingHeatmap.save();

      return res.status(201).send({
        success: true,
        message: `New Heatmap added`,
        data: creatingHeatmap,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in geting heatmap",
      error,
    });
  }
};

const getAllHeatMap = async (req, res) => {
  try {
    // const cameraId = req.params.id;

    const heatmap = await heatmapModel.find();
    //   .sort({ createdAt: -1 })
    //   .limit(1);

    return res.status(201).send({
      success: true,
      message: `Get last camera Heatmap`,
      heatmap,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in geting all heatmap",
      error,
    });
  }
};

module.exports = { getHeatMap, getAllHeatMap, createHeatMap };

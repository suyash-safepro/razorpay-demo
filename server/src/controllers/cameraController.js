const cameraModel = require("../models/cameraModel");

const createCamera = async (req, res) => {
  try {
    const { cameraIp, cameraId, location, rtspLink, authkey } = req.body;
    const camera = await cameraModel.findOne({
      $or: [{ cameraId }, { rtspLink }],
    });
    if (!camera) {
      if (cameraIp && cameraId && location && rtspLink && authkey) {
        const creatingCamera = new cameraModel(req.body);
        await creatingCamera.save();

        return res.status(201).send({
          success: true,
          message: `New Camera added`,
          data: creatingCamera,
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Camera already exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Camera",
      error,
    });
  }
};

const getAllCamera = async (req, res) => {
  try {
    const camera = await cameraModel.find().sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Get all cameras",
      data: camera,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Geting All Camera",
      error,
    });
  }
};

const getCamera = async (req, res) => {
  try {
    const cameraId = req.params.id;
    const camera = await cameraModel.findOne({ _id: cameraId });
    return res.status(200).send({
      success: true,
      message: "Get cameras",
      camera,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Geting All Camera",
      error,
    });
  }
};

module.exports = { createCamera, getAllCamera, getCamera };

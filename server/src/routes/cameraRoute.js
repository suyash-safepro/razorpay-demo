const express = require("express");
const {
  createCamera,
  getAllCamera,
  getCamera,
} = require("../controllers/cameraController");
// const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//Register Camera || POST
router.post("/", createCamera);

//Get Camera || GET
// router.get("/:id", getCamera);

//Get All Camera || GET
router.get("/", getAllCamera);

module.exports = router;

const express = require("express");
const { getAllIps, getIp } = require("../controllers/ipController");

const router = express.Router();

//Get All Ips || GET
router.get("/", getAllIps);

//Get Ip || GET
router.get("/:id", getIp);

module.exports = router;

const express = require("express");
const {
  register,
  login,
  orders,
  paymentVerify,
  getKey,
} = require("../controllers/userController");

const router = express.Router();

//Register || POST
router.post("/register", register);

//Login || POST
router.post("/login", login);

router.post("/order", orders);
router.get("/get_key", getKey);
router.post("/payment_verify", paymentVerify);

module.exports = router;

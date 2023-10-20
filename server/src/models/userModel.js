const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: [true, "customerId is required"],
    },
    firstname: {
      type: String,
      required: [true, "firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    businessName: {
      type: String,
      required: [true, "businessName is required"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    state: {
      type: String,
      required: [true, "state is required"],
    },
    country: {
      type: String,
      required: [true, "country is required"],
    },
    pincode: {
      type: String,
      required: [true, "pincode is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);

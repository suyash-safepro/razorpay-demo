const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mail");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const register = async (req, res) => {
  try {
    //check for existing user
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already registered",
      });
    }

    //hashed password
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //creating model instance
    // const user = new userModel({
    //   Customer_ID: req.body.Customer_ID,
    //   First_Name: req.body.First_Name,
    //   Last_Name: req.body.Last_Name,
    //   Email_ID: req.body.Email_ID.toLowerCase(),
    //   Business_Name: req.body.Business_Name,
    //   Pin_Code: req.body.Pin_Code,
    //   City: req.body.City,
    //   State: req.body.State,
    //   Address: req.body.Address,
    //   Country: req.body.Country,
    //   Phone: req.body.Phone,
    //   Password: hashedPassword,
    // });

    req.body.email = req.body.email.toLowerCase();
    req.body.password = hashedPassword;

    const user = new userModel(req.body);
    await user.save();

    //sending mail
    // var mailOptions = {
    //   from: ' "Retailytics" <welcome@facesense.co> ',
    //   to: userAccount.Email_ID,
    //   subject: "From Retailytics",
    //   html: `<p>Dear <strong>${userAccount.First_Name} !</strong></p>
    //                     <p>User ID:- <strong>${userAccount.Email_ID}</strong></p>
    //                     <p>Password:- <strong>${req.body.password}</strong></p>
    //             `,
    // };

    // await transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("verification Sent!!!!");
    //   }
    // });

    return res.status(200).send({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

//login
const login = async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (!user) {
      return res.status(404).send({
        success: true,
        message: "User not found",
        user,
      });
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(404).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        authkey: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        status_code: 200,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "20h",
      }
    );
    return res.status(200).send({
      success: true,
      message: "Login successfully",
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: token,
      status_code: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

const orders = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZOR_KEY,
      key_secret: process.env.RAZOR_SECRET,
    });

    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
      // receipt: "order_receipt_1",
    };

    const order = await instance.orders.create(options);

    return res.status(200).send({
      success: true,
      message: "Payment successful",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Order API",
      error,
    });
  }
};

const paymentVerify = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZOR_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSign == razorpay_signature) {
      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    }

    // return res.status(200).send({
    //   success: true,
    //   message: "Payment successful",
    // });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Order API",
      error,
    });
  }
};

const getKey = async (req, res) => {
  try {
    return res.status(200).send({
      success: true,
      message: "Get key successful",
      key: process.env.RAZOR_KEY,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Order API",
      error,
    });
  }
};

module.exports = { register, login, orders, getKey, paymentVerify };

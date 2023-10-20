const nodemailer = require("nodemailer");

const mail = async () => {
  nodemailer.createTransport({
    host: "",
    port: 465,
    secure: true,
    auth: {
      user: "",
      pass: "",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

module.exports = mail;

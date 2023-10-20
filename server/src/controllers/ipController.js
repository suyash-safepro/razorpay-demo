const find = require("local-devices");

const getAllIps = async (req, res) => {
  try {
    const ips = await find();
    return res.status(200).send({
      success: true,
      message: `Get all IPS`,
      data: ips,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in geting Count",
      error,
    });
  }
};

const getIp = async (req, res) => {
  try {
    const ipAddress = req.params.ip;
    const ip = await find({ address: ipAddress });
    return res.status(200).send({
      success: true,
      message: `Get all IPS`,
      data: ip,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in geting Count",
      error,
    });
  }
};

module.exports = { getAllIps, getIp };

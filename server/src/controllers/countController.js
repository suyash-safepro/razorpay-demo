const countModel = require("../models/countModel");

const getCount = async (req, res) => {
  try {
    const cameraId = req.params.cameraId;
    const date = req.params.date;

    // const count = countModel.find({
    //   cameraId,
    //   createdAt: {
    //     $gte: new Date(new Date(date).setHours(0, 0, 0)),
    //     $lte: new Date(new Date(date).setHours(23, 59, 59)),
    //   },
    // });

    const count = await countModel.aggregate([
      {
        $match: {
          cameraId,
          createdAt: {
            $gte: new Date(new Date(date).setHours(0, 0, 0)),
            $lte: new Date(new Date(date).setHours(23, 59, 59)),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          peopleEntered: { $sum: { $toInt: "$peopleEntered" } },
          peopleLeave: { $sum: { $toInt: "$peopleLeave" } },
          maleEntered: { $sum: { $toInt: "$maleEntered" } },
          maleLeave: { $sum: { $toInt: "$maleLeave" } },
          femaleEntered: { $sum: { $toInt: "$femaleEntered" } },
          femaleLeave: { $sum: { $toInt: "$femaleLeave" } },
        },
      },
    ]);

    return res.status(201).send({
      success: true,
      message: `Get last camera count`,
      data: count,
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

const createCount = async (req, res) => {
  try {
    const {
      cameraId,
      peopleEntered,
      peopleLeave,
      maleEntered,
      maleLeave,
      femaleEntered,
      femaleLeave,
      url,
      authkey,
    } = req.body;

    if (
      cameraId &&
      peopleEntered &&
      peopleLeave &&
      maleEntered &&
      maleLeave &&
      femaleEntered &&
      femaleLeave &&
      url &&
      authkey
    ) {
      const checkingCameraAvailability = await countModel.findOne({ cameraId });

      if (checkingCameraAvailability) {
        let lastDocAddedDatetime = new Date(
          checkingCameraAvailability.createdAt
        );
        let currentDatetime = new Date();

        const difference = currentDatetime - lastDocAddedDatetime;
        const SEC = 1000,
          MIN = 60 * SEC,
          HRS = 60 * MIN;
        const hourDifference = `${Math.floor(difference / HRS)}`;

        let insertBlankData = [];
        if (hourDifference >= 2) {
          for (let i = 1; i > hourDifference; i++) {
            insertBlankData.push({
              cameraId,
              peopleEntered: "00",
              peopleLeave: "00",
              maleEntered: "00",
              maleLeave: "00",
              femaleEntered: "00",
              femaleLeave: "00",
              url: "",
              authkey,
            });
          }
          await countModel.insert(insertBlankData);
        }

        if (hourDifference >= 1) {
          const count = new countModel(req.body);
          await count.save();
          return res.status(201).send({
            success: true,
            message: `New Count added`,
            // data: count,
          });
        } else {
          const count = await countModel.updateOne(
            { cameraId: checkingCameraAvailability.cameraId },
            {
              peopleEntered,
              peopleLeave,
              maleEntered,
              maleLeave,
              femaleEntered,
              femaleLeave,
              url,
            },
            { new: true }
          );
          return res.status(201).send({
            success: true,
            message: `Update Count`,
            // data: count,
          });
        }
      } else {
        const count = new countModel(req.body);
        await count.save();
        return res.status(201).send({
          success: true,
          message: `New Count added`,
          // data: count,
        });
      }
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
      message: "Error in geting Count",
      error,
    });
  }
};

const getVideo = async () => {
  try {
    const cameraId = req.params.cameraId;
    const date = req.params.date;

    const count = countModel
      .findOne({
        cameraId,
        createdAt: {
          $gte: new Date(new Date(date).setHours(0, 0, 0)),
          $lte: new Date(new Date(date).setHours(23, 59, 59)),
        },
      })
      .sort({ createdAt: -1 });

    return res.status(201).send({
      success: true,
      message: `Get last camera video`,
      data: count.url,
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

module.exports = { getCount, createCount, getVideo };

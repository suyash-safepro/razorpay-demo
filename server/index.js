const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/database");

//dot config
dotenv.config();

//mongodb conncetion
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use("/api/v1/user", require("./src/routes/userRoute"));
app.use("/api/v1/ip", require("./src/routes/ips"));
app.use("/api/v1/camera", require("./src/routes/cameraRoute"));
app.use("/api/v1/heatmap", require("./src/routes/heatmapRoute"));
app.use("/api/v1/count", require("./src/routes/countRoute"));

// const PORT = process.env.PORT || 8000;
app.listen(process.env.PORT, () => {
  console.log("Nodo server running on port" + process.env.PORT);
});

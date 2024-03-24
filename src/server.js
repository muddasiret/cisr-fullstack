const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const allRoutes = require("./lib/routes");
const sequelize = require("./lib/models");
const s3Router = require("./lib/routes/s3Router");

const { PORT = 3000 } = process.env;

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve API requests from the router
app.use("/api", allRoutes);

// S3 upload
app.use("/s3", s3Router);

// Serve app production bundle (Frontend/REACT)
app.use(express.static("dist/app"));

// Handle client routing, return all requests to the app
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "app/index.html"));
});

// Start server
sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const allRoutes = require("./lib/routes");

const { PORT = 3001 } = process.env;

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve API requests from the router
app.use("/api", allRoutes);

// Serve app production bundle (Frontend/REACT)
app.use(express.static("dist/app"));

// Handle client routing, return all requests to the app
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "app/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
// routers/s3.js

const express = require("express");
const createPresignedPost = require("../utils/s3");

const s3Router = express.Router();
s3Router.post("/signed_url", async (req, res) => {
  try {
    let { key, content_type } = req.body;
    key = "public/" + key;
    const data = await createPresignedPost({ key, contentType: content_type });
    return res.send({
      status: "success",
      data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
});

module.exports = s3Router;

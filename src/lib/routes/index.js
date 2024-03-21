const express = require("express");

const adminController = require("../controllers");

const router = express.Router();

router.get("/news", adminController.getNews);
router.post("/news-update", adminController.postNews);
router.post("/news-add", adminController.getNews);

module.exports = router;

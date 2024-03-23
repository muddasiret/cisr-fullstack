const express = require("express");

const adminController = require("../controllers");

const router = express.Router();

router.get("/news", adminController.getNews);
router.post("/news-update", adminController.postNews);
router.put("/news-update", adminController.editNews);
router.post("/news-delete", adminController.deleteNews);

module.exports = router;

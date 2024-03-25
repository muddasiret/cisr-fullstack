const express = require("express");

const newsController = require("../controllers/news");

const router = express.Router();

// NEWS
router.get("/news", newsController.getNews);
router.post("/news-update", newsController.postNews);
router.put("/news-update", newsController.editNews);
router.post("/news-delete", newsController.deleteNews);

module.exports = router;

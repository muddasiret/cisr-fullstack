const express = require("express");

const newsController = require("../controllers/news");
const eventsController = require("../controllers/events");
const homeController = require("../controllers/home");

const router = express.Router();

// NEWS
router.get("/news", newsController.getNews);
router.post("/news-update", newsController.postNews);
router.put("/news-update", newsController.editNews);
router.post("/news-delete", newsController.deleteNews);

// Events
router.get("/events", eventsController.getEvents);
router.post("/events-update", eventsController.postEvents);
router.put("/events-update", eventsController.editEvents);
router.post("/events-delete", eventsController.deleteEvents);

// Home
router.get("/home", homeController.getHomeData);
router.post("/home-update", homeController.postHomeData);
router.put("/home-update", homeController.editHomeData);

module.exports = router;

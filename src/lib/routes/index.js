const express = require("express");

const newsController = require("../controllers/news");
const eventsController = require("../controllers/events");
const galleryController = require("../controllers/gallery");
const bottomcardsController = require("../controllers/bottomcards");
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

// Image gallery
router.get("/gallery", galleryController.getGallery);
router.post("/gallery-update", galleryController.postGallery);
router.put("/gallery-update", galleryController.editGallery);
router.post("/gallery-delete", galleryController.deleteGallery);

// Image gallery
router.get("/bottomcards", bottomcardsController.getBottomcards);
router.post("/bottomcards-update", bottomcardsController.postBottomcards);
router.put("/bottomcards-update", bottomcardsController.editBottomcards);
router.post("/bottomcards-delete", bottomcardsController.deleteBottomcards);

module.exports = router;

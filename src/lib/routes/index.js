const express = require("express");

const newsController = require("../controllers/news");
const eventsController = require("../controllers/events");
const galleryController = require("../controllers/gallery");
const bottomcardsController = require("../controllers/bottomcards");
const homeController = require("../controllers/home");
const aboutController = require("../controllers/about");
const paperController = require("../controllers/paper");

const router = express.Router();

// NEWS
router.get("/news", newsController.getNews);
router.get("/news/:slug", newsController.getSingleNews);
router.post("/news-update", newsController.postNews);
router.put("/news-update", newsController.editNews);
router.post("/news-delete", newsController.deleteNews);

// Events
router.get("/events", eventsController.getEvents);
router.get("/events/:slug", eventsController.getSingleEvent);
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

// About
router.get("/about", aboutController.getAbout);
router.post("/about-update", aboutController.postAbout);
router.put("/about-update", aboutController.editAbout);

// About
router.post("/visionmission-update", aboutController.postVisionMission);
router.put("/visionmission-update", aboutController.editVisionMission);
router.put("/visionmission-delete", aboutController.deleteVissionMission);

// NEWS
router.get("/paper", paperController.getPaper);
router.get("/paper/:slug", paperController.getSinglePaper);
router.post("/paper-update", paperController.postPaper);
router.put("/paper-update", paperController.editPaper);
router.post("/paper-delete", paperController.deletePaper);

module.exports = router;

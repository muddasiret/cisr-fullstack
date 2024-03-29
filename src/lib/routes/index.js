const express = require("express");

const newsController = require("../controllers/news");
const eventsController = require("../controllers/events");
const galleryController = require("../controllers/gallery");
const bottomcardsController = require("../controllers/bottomcards");
const homeController = require("../controllers/home");
const aboutController = require("../controllers/about");
const paperController = require("../controllers/paper");
const profileController = require("../controllers/profiles");
const projectController = require("../controllers/projects");
const booksController = require("../controllers/books");
const sowaseedController = require("../controllers/sowaseed");

const router = express.Router();

// NEWS
router.get("/news", newsController.getNews);
router.get("/news/:slug", newsController.getSingleNews);
router.post("/news-update", newsController.postNews);
router.put("/news-update", newsController.editNews);
router.post("/news-delete", newsController.deleteNews);

// Profiles
router.get("/profiles", profileController.getProfiles);
router.get("/profiles/:slug", profileController.getSingleProfiles);
router.post("/profiles-update", profileController.postProfiles);
router.put("/profiles-update", profileController.editProfiles);
router.post("/profiles-delete", profileController.deleteProfiles);

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

// Visionmission
router.post("/visionmission-update", aboutController.postVisionMission);
router.put("/visionmission-update", aboutController.editVisionMission);
router.put("/visionmission-delete", aboutController.deleteVissionMission);

// PAPER
router.get("/paper", paperController.getPaper);
router.get("/paper/:slug", paperController.getSinglePaper);
router.post("/paper-update", paperController.postPaper);
router.put("/paper-update", paperController.editPaper);
router.post("/paper-delete", paperController.deletePaper);

// Projects
router.get("/projects", projectController.getProjects);
router.get("/projects/:slug", projectController.getSingleProjects);
router.post("/projects-update", projectController.postProjects);
router.put("/projects-update", projectController.editProjects);
router.post("/projects-delete", projectController.deleteProjects);

// Books
router.get("/books", booksController.getBooks);
router.get("/books/:slug", booksController.getSingleBook);
router.post("/books-update", booksController.postBooks);
router.put("/books-update", booksController.editBooks);
router.post("/books-delete", booksController.deleteBooks);

// Projects
router.get("/sowaseed", sowaseedController.getSowaseed);
router.post("/sowaseed-update", sowaseedController.postSowaseed);
router.put("/sowaseed-update", sowaseedController.editSowaseed);
router.post("/sowaseed-delete", sowaseedController.deleteSowaseed);

module.exports = router;

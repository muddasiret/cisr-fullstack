const Gallery = require("../models/gallery");

exports.getGallery = (req, res) => {
  Gallery.findAll().then((allGallery) => {
    res.json({ allGallery });
  });
};

exports.postGallery = (req, res) => {
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const image = req.body.image;
  Gallery.create({
    title,
    subtitle,
    image,
  }).then((updatedGallery) => {
    Gallery.findAll().then((allGallery) => {
      res.json({ allGallery, updatedGallery });
    });
  });
};

exports.editGallery = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const image = req.body.image;
  Gallery.findByPk(id)
    .then((gallery) => {
      gallery.title = title;
      gallery.subtitle = subtitle;
      gallery.image = image;
      return gallery.save();
    })
    .then((updatedGallery) => {
      Gallery.findAll().then((allGallery) => {
        res.json({ allGallery, updatedGallery });
      });
    });
};

exports.deleteGallery = (req, res) => {
  const id = req.body.id;
  Gallery.findByPk(id)
    .then((gallery) => {
      return gallery.destroy();
    })
    .then((updatedGallery) => {
      Gallery.findAll().then((allGallery) => {
        res.json({ allGallery, updatedGallery });
      });
    });
};

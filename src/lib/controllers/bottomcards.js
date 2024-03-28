const Bottomcards = require("../models/bottomCards");

exports.getBottomcards = (req, res) => {
  Bottomcards.findAll().then((allBottomcards) => {
    res.json({ allBottomcards });
  });
};

exports.postBottomcards = (req, res) => {
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const link = req.body.link;
  const image = req.body.image;
  Bottomcards.create({
    title,
    subtitle,
    image,
    link,
  }).then((updatedBottomcards) => {
    Bottomcards.findAll().then((allBottomcards) => {
      res.json({ allBottomcards, updatedBottomcards });
    });
  });
};

exports.editBottomcards = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const link = req.body.link;
  const image = req.body.image;
  Bottomcards.findByPk(id)
    .then((bottomcards) => {
      bottomcards.title = title;
      bottomcards.subtitle = subtitle;
      bottomcards.link = link;
      bottomcards.image = image;
      return bottomcards.save();
    })
    .then((updatedBottomcards) => {
      Bottomcards.findAll().then((allBottomcards) => {
        res.json({ allBottomcards, updatedBottomcards });
      });
    });
};

exports.deleteBottomcards = (req, res) => {
  const id = req.body.id;
  Bottomcards.findByPk(id)
    .then((bottomcards) => {
      return bottomcards.destroy();
    })
    .then((updatedBottomcards) => {
      Bottomcards.findAll().then((allBottomcards) => {
        res.json({ allBottomcards, updatedBottomcards });
      });
    });
};

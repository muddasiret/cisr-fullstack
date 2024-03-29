const Sowaseed = require("../models/sowaseed");
const slugify = require("slugify");

exports.getSowaseed = (req, res) => {
  Sowaseed.findAll().then((allSowaseed) => {
    res.json({ allSowaseed });
  });
};

exports.postSowaseed = (req, res) => {
  const name = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const day = req.body.day;
  const slug = slugify(title, { lower: true });
  Sowaseed.create({
    name,
    image,
    description,
    day,
    slug,
  })
    .then((updatedSowaseed) => {
      Sowaseed.findAll()
        .then((allSowaseed) => {
          res.json({ allSowaseed, updatedSowaseed });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Server Error");
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.editSowaseed = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const image = req.body.image;
  const day = req.body.day;
  Sowaseed.findByPk(id)
    .then((sowaseed) => {
      sowaseed.name = name;
      sowaseed.description = description;
      sowaseed.image = image;
      sowaseed.day = day;
      return sowaseed.save();
    })
    .then((updatedSowaseed) => {
      Sowaseed.findAll().then((allSowaseed) => {
        res.json({ allSowaseed, updatedSowaseed });
      });
    });
};

exports.deleteSowaseed = (req, res) => {
  const id = req.body.id;
  Sowaseed.findByPk(id)
    .then((sowaseed) => {
      return sowaseed.destroy();
    })
    .then((updatedSowaseed) => {
      Sowaseed.findAll().then((allSowaseed) => {
        res.json({ allSowaseed, updatedSowaseed });
      });
    });
};

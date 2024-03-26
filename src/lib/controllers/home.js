const Home = require("../models/home");

exports.getHomeData = (req, res) => {
  Home.findAll().then((homeData) => {
    res.json({ homeData });
  });
};

exports.postHomeData = (req, res) => {
  const name = req.body.name;
  const specifications = req.body.specifications;
  Home.create({
    name,
    specifications,
  }).then((updatedHomeData) => {
    Home.findAll().then((homeData) => {
      res.json({ homeData, updatedHomeData });
    });
  });
};

exports.editHomeData = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const specifications = req.body.specifications;
  Home.findByPk(id)
    .then((home) => {
      home.name = name;
      home.specifications = specifications;
      return home.save();
    })
    .then((updatedHomeData) => {
      Home.findAll().then((homeData) => {
        res.json({ homeData, updatedHomeData });
      });
    });
};

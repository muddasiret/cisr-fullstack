const slugify = require("slugify");
const Profiles = require("../models/profiles");

exports.getProfiles = (req, res) => {
  Profiles.findAll().then((allProfiles) => {
    res.json({ allProfiles });
  });
};

exports.getSingleProfiles = async (req, res) => {
  try {
    const { slug } = req.params;
    const content = await Profiles.findOne({ where: { slug } });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.postProfiles = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const designation = req.body.designation;
  const image = req.body.image;
  const slug = slugify(title, { lower: true });
  Profiles.create({
    name,
    description,
    designation,
    image,
    slug,
  })
    .then((updatedProfiles) => {
      Profiles.findAll().then((allProfiles) => {
        res.json({ allProfiles, updatedProfiles });
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.editProfiles = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const designation = req.body.designation;
  const image = req.body.image;
  Profiles.findByPk(id)
    .then((profiles) => {
      profiles.name = name;
      profiles.description = description;
      profiles.designation = designation;
      profiles.image = image;
      return profiles.save();
    })
    .then((updatedProfiles) => {
      Profiles.findAll().then((allProfiles) => {
        res.json({ allProfiles, updatedProfiles });
      });
    });
};

exports.deleteProfiles = (req, res) => {
  const id = req.body.id;
  Profiles.findByPk(id)
    .then((profiles) => {
      return profiles.destroy();
    })
    .then((updatedProfiles) => {
      Profiles.findAll().then((allProfiles) => {
        res.json({ allProfiles, updatedProfiles });
      });
    });
};

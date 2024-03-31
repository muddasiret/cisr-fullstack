const slugify = require("slugify");
const Team = require("../models/team");

exports.getTeam = (req, res) => {
  Team.findAll().then((allTeam) => {
    res.json({ allTeam });
  });
};

exports.getSingleTeam = async (req, res) => {
  try {
    const { slug } = req.params;
    const content = await Team.findOne({ where: { slug } });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.postTeam = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const designation = req.body.designation;
  const image = req.body.image;
  const slug = slugify(name, { lower: true });
  Team.create({
    name,
    description,
    designation,
    image,
    slug,
  })
    .then((updatedTeam) => {
      Team.findAll().then((allTeam) => {
        res.json({ allTeam, updatedTeam });
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.editTeam = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const designation = req.body.designation;
  const image = req.body.image;
  Team.findByPk(id)
    .then((team) => {
      team.name = name;
      team.description = description;
      team.designation = designation;
      team.image = image;
      return team.save();
    })
    .then((updatedTeam) => {
      Team.findAll().then((allTeam) => {
        res.json({ allTeam, updatedTeam });
      });
    });
};

exports.deleteTeam = (req, res) => {
  const id = req.body.id;
  Team.findByPk(id)
    .then((team) => {
      return team.destroy();
    })
    .then((updatedTeam) => {
      Team.findAll().then((allTeam) => {
        res.json({ allTeam, updatedTeam });
      });
    });
};

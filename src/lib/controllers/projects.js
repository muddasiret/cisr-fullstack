const slugify = require("slugify");
const Projects = require("../models/projects");

exports.getProjects = (req, res) => {
  Projects.findAll().then((allProjects) => {
    res.json({ allProjects });
  });
};

exports.getSingleProjects = async (req, res) => {
  try {
    const { slug } = req.params;
    const content = await Projects.findOne({ where: { slug } });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.postProjects = (req, res) => {
  const title = req.body.title;
  const short_description = req.body.description;
  const body = req.body.body;
  const image = req.body.image;
  const team = req.body.team;
  const slug = slugify(title, { lower: true });
  Projects.create({
    title,
    short_description,
    body,
    image,
    slug,
    team,
  })
    .then((updatedProjects) => {
      Projects.findAll().then((allProjects) => {
        res.json({ allProjects, updatedProjects });
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.editProjects = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const short_description = req.body.short_description;
  const body = req.body.body;
  const image = req.body.image;
  const team = req.body.team;
  Projects.findByPk(id)
    .then((projects) => {
      projects.title = title;
      projects.short_description = short_description;
      projects.body = body;
      projects.image = image;
      projects.team = team;
      return projects.save();
    })
    .then((updatedProjects) => {
      Projects.findAll().then((allProjects) => {
        res.json({ allProjects, updatedProjects });
      });
    });
};

exports.deleteProjects = (req, res) => {
  const id = req.body.id;
  Projects.findByPk(id)
    .then((projects) => {
      return projects.destroy();
    })
    .then((updatedProjects) => {
      Projects.findAll().then((allProjects) => {
        res.json({ allProjects, updatedProjects });
      });
    });
};

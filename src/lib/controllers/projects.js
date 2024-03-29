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
  const description = req.body.description;
  const image = req.body.image;
  const slug = slugify(title, { lower: true });
  Projects.create({
    title,
    description,
    image,
    slug,
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
  const description = req.body.description;
  const image = req.body.image;
  const section = req.body.section;
  Projects.findByPk(id)
    .then((projects) => {
      projects.title = title;
      projects.description = description;
      projects.image = image;
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

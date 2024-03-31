const slugify = require("slugify");
const Faculty = require("../models/faculty");

exports.getFaculty = (req, res) => {
  Faculty.findAll().then((allFaculty) => {
    res.json({ allFaculty });
  });
};

exports.getSingleFaculty = async (req, res) => {
  try {
    const { slug } = req.params;
    const content = await Faculty.findOne({ where: { slug } });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.postFaculty = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const designation = req.body.designation;
  const image = req.body.image;
  const slug = slugify(name, { lower: true });
  Faculty.create({
    name,
    description,
    designation,
    image,
    slug,
  })
    .then((updatedFaculty) => {
      Faculty.findAll().then((allFaculty) => {
        res.json({ allFaculty, updatedFaculty });
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.editFaculty = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const designation = req.body.designation;
  const image = req.body.image;
  Faculty.findByPk(id)
    .then((faculty) => {
      faculty.name = name;
      faculty.description = description;
      faculty.designation = designation;
      faculty.image = image;
      return faculty.save();
    })
    .then((updatedFaculty) => {
      Faculty.findAll().then((allFaculty) => {
        res.json({ allFaculty, updatedFaculty });
      });
    });
};

exports.deleteFaculty = (req, res) => {
  const id = req.body.id;
  Faculty.findByPk(id)
    .then((faculty) => {
      return faculty.destroy();
    })
    .then((updatedFaculty) => {
      Faculty.findAll().then((allFaculty) => {
        res.json({ allFaculty, updatedFaculty });
      });
    });
};

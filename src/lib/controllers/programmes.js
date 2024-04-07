const slugify = require("slugify");
const Programmes = require("../models/programmes");

exports.getProgrammes = (req, res) => {
  Programmes.findAll().then((allProgrammes) => {
    res.json({ allProgrammes });
  });
};

exports.getSingleProgrammes = async (req, res) => {
  try {
    const { slug } = req.params;
    const content = await Programmes.findOne({ where: { slug } });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.postProgrammes = (req, res) => {
  const title = req.body.title;
  const youtube_link = req.body.youtube_link;
  const body = req.body.body;
  const image = req.body.image;
  const faculty = req.body.faculty;
  const slug = slugify(title, { lower: true });
  const syllabus = req.body.syllabus;
  const howtoapply = req.body.howtoapply;
  const type = req.body.type;
  Programmes.create({
    title,
    youtube_link,
    body,
    image,
    slug,
    faculty,
    syllabus,
    howtoapply,
    type
  })
    .then((updatedProgrammes) => {
      Programmes.findAll().then((allProgrammes) => {
        res.json({ allProgrammes, updatedProgrammes });
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.editProgrammes = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const type = req.body.type;
  const youtube_link = req.body.youtube_link;
  const body = req.body.body;
  const image = req.body.image;
  const faculty = req.body.faculty;
  const syllabus = req.body.syllabus;
  const howtoapply = req.body.howtoapply;
  Programmes.findByPk(id)
    .then((projects) => {
      projects.title = title;
      projects.youtube_link = youtube_link;
      projects.body = body;
      projects.image = image;
      projects.faculty = faculty;
      projects.syllabus = syllabus;
      projects.howtoapply = howtoapply;
      projects.type = type;
      return projects.save();
    })
    .then((updatedProgrammes) => {
      Programmes.findAll().then((allProgrammes) => {
        res.json({ allProgrammes, updatedProgrammes });
      });
    });
};

exports.deleteProgrammes = (req, res) => {
  const id = req.body.id;
  Programmes.findByPk(id)
    .then((projects) => {
      return projects.destroy();
    })
    .then((updatedProgrammes) => {
      Programmes.findAll().then((allProgrammes) => {
        res.json({ allProgrammes, updatedProgrammes });
      });
    });
};

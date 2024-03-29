const slugify = require("slugify");
const Paper = require("../models/paper");

exports.getPaper = (req, res) => {
  Paper.findAll().then((allPaper) => {
    res.json({ allPaper });
  });
};

exports.getSinglePaper = async (req, res) => {
  try {
    const { slug } = req.params;
    const content = await Paper.findOne({ where: { slug } });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.postPaper = (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const pdf_link = req.body.pdf_link;
  const image = req.body.image;
  const slug = slugify(title, { lower: true });
  Paper.create({
    title,
    pdf_link,
    image,
    author,
    slug,
  })
    .then((updatedPaper) => {
      Paper.findAll().then((allPaper) => {
        res.json({ allPaper, updatedPaper });
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.editPaper = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const author = req.body.author;
  const pdf_link = req.body.pdf_link;
  const image = req.body.image;
  Paper.findByPk(id)
    .then((paper) => {
      paper.title = title;
      paper.pdf_link = pdf_link;
      paper.image = image;
      paper.author = author;
      return paper.save();
    })
    .then((updatedPaper) => {
      Paper.findAll().then((allPaper) => {
        res.json({ allPaper, updatedPaper });
      });
    });
};

exports.deletePaper = (req, res) => {
  const id = req.body.id;
  Paper.findByPk(id)
    .then((paper) => {
      return paper.destroy();
    })
    .then((updatedPaper) => {
      Paper.findAll().then((allPaper) => {
        res.json({ allPaper, updatedPaper });
      });
    });
};

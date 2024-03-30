const Books = require("../models/books");
const slugify = require("slugify");

exports.getBooks = (req, res) => {
  Books.findAll().then((allBooks) => {
    res.json({ allBooks });
  });
};

exports.getSingleBook = async (req, res) => {
  try {
    const { slug } = req.params;
    const content = await Books.findOne({ where: { slug } });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.postBooks = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const author = req.body.author;
  const youtube_link = req.body.youtube_link;
  const slug = slugify(title, { lower: true });
  Books.create({
    title,
    image,
    description,
    author,
    slug,
    youtube_link,
  })
    .then((updatedBooks) => {
      Books.findAll()
        .then((allBooks) => {
          res.json({ allBooks, updatedBooks });
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

exports.editBooks = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const author = req.body.author;
  const youtube_link = req.body.youtube_link;
  Books.findByPk(id)
    .then((books) => {
      books.title = title;
      books.description = description;
      books.image = image;
      books.author = author;
      books.youtube_link = youtube_link;
      return books.save();
    })
    .then((updatedBooks) => {
      Books.findAll().then((allBooks) => {
        res.json({ allBooks, updatedBooks });
      });
    });
};

exports.deleteBooks = (req, res) => {
  const id = req.body.id;
  Books.findByPk(id)
    .then((books) => {
      return books.destroy();
    })
    .then((updatedBooks) => {
      Books.findAll().then((allBooks) => {
        res.json({ allBooks, updatedBooks });
      });
    });
};

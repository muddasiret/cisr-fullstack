const Events = require("../models/events");
const slugify = require("slugify");

exports.getEvents = (req, res) => {
  Events.findAll().then((allEvents) => {
    res.json({ allEvents });
  });
};

exports.getSingleEvent = async (req, res) => {
  try {
    const { slug } = req.params;
    const content = await Events.findOne({ where: { slug } });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.postEvents = (req, res) => {
  const title = req.body.title;
  const date = req.body.date;
  const time = req.body.time;
  const location = req.body.location;
  const description = req.body.description;
  const image = req.body.image;
  const youtube_link = req.body.youtube_link;
  const slug = slugify(title, { lower: true });
  Events.create({
    title,
    date,
    time,
    location,
    image,
    description,
    slug,
    youtube_link,
  })
    .then((updatedEvents) => {
      Events.findAll()
        .then((allEvents) => {
          res.json({ allEvents, updatedEvents });
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

exports.editEvents = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const date = req.body.date;
  const time = req.body.time;
  const location = req.body.location;
  const description = req.body.description;
  const image = req.body.image;
  const youtube_link = req.body.youtube_link;
  Events.findByPk(id)
    .then((events) => {
      events.title = title;
      events.date = date;
      events.time = time;
      events.location = location;
      events.description = description;
      events.image = image;
      events.youtube_link = youtube_link;
      return events.save();
    })
    .then((updatedEvents) => {
      Events.findAll().then((allEvents) => {
        res.json({ allEvents, updatedEvents });
      });
    });
};

exports.deleteEvents = (req, res) => {
  const id = req.body.id;
  Events.findByPk(id)
    .then((events) => {
      return events.destroy();
    })
    .then((updatedEvents) => {
      Events.findAll().then((allEvents) => {
        res.json({ allEvents, updatedEvents });
      });
    });
};

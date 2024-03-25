const Events = require("../models/events");

exports.getEvents = (req, res) => {
  Events.findAll().then((allEvents) => {
    res.json({ allEvents });
  });
};

exports.postEvents = (req, res) => {
  const title = req.body.title;
  const date = req.body.date;
  const time = req.body.time;
  const location = req.body.location;
  const description = req.body.description;
  const image = req.body.image;
  Events.create({
    title,
    date,
    time,
    location,
    image,
    description,
  }).then((updatedEvents) => {
    Events.findAll().then((allEvents) => {
      res.json({ allEvents, updatedEvents });
    });
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
  Events.findByPk(id)
    .then((events) => {
      events.title = title;
      events.date = date;
      events.time = time;
      events.location = location;
      events.description = description;
      events.image = image;
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

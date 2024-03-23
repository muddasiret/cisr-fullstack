const News = require("../models/news");

exports.getNews = (req, res) => {
  News.findAll().then((news) => {
    res.json(news);
  });
};

exports.postNews = (req, res) => {
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const youtube = req.body.youtube;
  const description = req.body.description;
  const pdf_text = req.body.pdf_text;
  const pdf_link = req.body.pdf_link;
  const image = req.body.image;
  const section = req.body.section;
  News.create({
    title,
    subtitle,
    youtube,
    description,
    pdf_text,
    pdf_link,
    image,
    section,
  }).then((addednews) => {
    res.json(addednews);
  });
};

exports.editNews = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const youtube = req.body.youtube;
  const description = req.body.description;
  const pdf_text = req.body.pdf_text;
  const pdf_link = req.body.pdf_link;
  const image = req.body.image;
  const section = req.body.section;
  News.findByPk(id)
    .then((news) => {
      news.title = title;
      news.subtitle = subtitle;
      news.youtube = youtube;
      news.description = description;
      news.pdf_text = pdf_text;
      news.pdf_link = pdf_link;
      news.image = image;
      news.section = section;
      return news.save();
    })
    .then((updatedNews) => {
      console.log("updatedNews", updatedNews);
      res.json(updatedNews);
    });
};

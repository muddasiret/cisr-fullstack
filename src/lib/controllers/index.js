const News = require("../models/news");

exports.getNews = (req, res) => {
  News.findAll().then((allNews) => {
    res.json({ allNews });
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
  }).then((updatedNews) => {
    News.findAll().then((allNews) => {
      res.json({ allNews, updatedNews });
    });
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
      console.log(news);
      return news.save();
    })
    .then((updatedNews) => {
      News.findAll().then((allNews) => {
        res.json({ allNews, updatedNews });
      });
    });
};

exports.deleteNews = (req, res) => {
  const id = req.body.id;
  News.findByPk(id)
    .then((news) => {
      return news.destroy();
    })
    .then((updatedNews) => {
      News.findAll().then((allNews) => {
        res.json({ allNews, updatedNews });
      });
    });
};

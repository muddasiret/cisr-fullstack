const About = require("../models/about");
const Visionmission = require("../models/visionmission");

async function getAboutdata(_, res) {
  try {
    const aboutPromise = About.findAll();
    const visionMissionPromise = Visionmission.findAll();
    const [about, visionmission] = await Promise.all([
      aboutPromise,
      visionMissionPromise,
    ]);
    res.json({ about, visionmission });
  } catch (err) {
    res.status(500).send("Server Error");
  }
}

exports.getAbout = async (req, res) => {
  getAboutdata(req, res);
};

exports.postAbout = (req, res) => {
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const body = req.body.body;
  About.create({
    title,
    subtitle,
    body,
  }).then((updatedAbout) => {
    About.findAll().then((about) => {
      res.json({ about, updatedAbout });
    });
  });
};

exports.postVisionMission = (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  Visionmission.create({
    title,
    body,
  }).then(() => {
    getAboutdata(req, res);
  });
};

exports.editVisionMission = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const body = req.body.body;
  Visionmission.findByPk(id)
    .then((visionmission) => {
      about.title = title;
      about.body = body;
      return visionmission.save();
    })
    .then(() => {
      getAboutdata(req, res);
    });
};

exports.editAbout = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const body = req.body.body;
  About.findByPk(id)
    .then((about) => {
      about.title = title;
      about.subtitle = subtitle;
      about.body = body;
      return about.save();
    })
    .then(() => {
      getAboutdata(req, res);
    });
};

exports.deleteAbout = (req, res) => {
  const id = req.body.id;
  About.findByPk(id)
    .then((about) => {
      return about.destroy();
    })
    .then(() => {
      getAboutdata(req, res);
    });
};

exports.deleteVissionMission = (req, res) => {
  const id = req.body.id;
  Visionmission.findByPk(id)
    .then((visionmission) => {
      return visionmission.destroy();
    })
    .then(() => {
      getAboutdata(req, res);
    });
};

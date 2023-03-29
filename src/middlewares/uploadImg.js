const multer = require("multer");
const mime = require("mime");
const basePath = process.env.FILES_URL;
const layersDir = `${basePath}/layers`;

const fileFilter = (req, file, cb, err) => {
  const type = mime.getExtension(file.mimetype);
  const conditions = ["png"];
  if (
    ![...file.originalname].some((e) => [" ", "#"].includes(e)) &&
    conditions.includes(`${type}`)
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id, name } = req.params;
    cb(null, `${layersDir}/${id}/${name}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports = { fileFilter, storage };

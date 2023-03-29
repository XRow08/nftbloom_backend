const router = require("express").Router();
const multer = require("multer");
const { storage, fileFilter } = require("../middlewares/uploadImg");
const upload = multer({ storage, fileFilter }).single("image");
const {
  startCreating,
  buildSetup,
  createCategoryLayer,
  deleteCategoryLayer,
  findAllLayers,
  findImages,
  editCategoryLayer,
} = require(`../main`);

router.post("/create-layer", async (req, res) => {
  createCategoryLayer(req.body)
    .then((response) => res.status(response).send(response))
    .catch((err) => res.status(401).send(err));
});

router.put("/edit-layer", async (req, res) => {
  editCategoryLayer(req.body)
    .then((response) => res.status(response).send(response))
    .catch((err) => res.status(401).send(err));
});

router.post("/delete-layer", async (req, res) => {
  deleteCategoryLayer(req.body)
    .then((response) => res.status(response).send(response))
    .catch((err) => res.status(401).send(err));
});

router.get("/get-layers/:id", async (req, res) => {
  findAllLayers(req.params.id)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).send(err));
});

router.post("/layer-image/:id/:name", async (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("error1");
    } else if (err) {
      console.log("error2");
    }
  });
  res.json("liso");
});

router.get("/get-layers/:id/:name", async (req, res) => {
  findImages(req.params)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).send(err));
});

router.post("/start-preview/:id", async (req, res) => {
  startCreating(req.params.id, req.body)
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;

const registerNewUser = require("../../usecase/register");
const Login = require("../../usecase/login");
const router = require("express").Router();

router.post("/login", async (req, res) => {
  Login(req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(401).json(err));
});

router.post("/register", async (req, res) => {
  registerNewUser(req.body)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;

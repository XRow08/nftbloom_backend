const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const path = require("path");
const server = require("http").createServer(app);
const usersRoutes = require("./src/router/user");
const nftRoutes = require("./src/router/nft");

dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.set("trust proxy", true);
app.use("/layers", express.static(path.join(__dirname, "layers")));

// Routes
app.use("/user", usersRoutes);
app.use("/nft", nftRoutes);
app.get("/", (req, res) =>
  res.send(`Welcome to NFT BLOOM SERVER! ENV: ${process.env.ENVIROMENT}`)
);

// Server
server.listen(process.env.PORT | 3001, () => {
  console.log(
    `NFT Bloom SERVER listening at https://nftbloom.onrender.com || ENV: ${process.env.ENVIROMENT}`
  );
});

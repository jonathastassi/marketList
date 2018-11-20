const port = 8000;
const express = require("express");
require("express-group-routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const consign = require("consign");
const jwt = require("jsonwebtoken");

require("dotenv").load();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("jwt", jwt);

const http = require("http").Server(app);
const io = require("socket.io")(http, { origins: "*:*" });

io.use(function(socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, process.env.JWT_KEY, function(
      err,
      decoded
    ) {
      if (err) return next(new Error("Authentication error"));
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", socket => {
  console.log("User connected");
  console.log(socket);
});
app.set("io", io);

app.use("/uploads", express.static("uploads"));

app.use("*", (req, res, next) => {
  // console.log(req.originalUrl);
  if (
    req.originalUrl == "/api/v1/user/login" ||
    req.originalUrl == "/api/v1/user/register"
  ) {
    next();
  } else {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.headers["authorization"];

    if (!token) {
      res.status(401).send({ message: "Não autorizado!" });
    } else {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          res.status(401).send({ message: "Não autorizado!" });
        } else {
          req.user_id = decoded.user;
          next();
        }
      });
    }
  }
});

consign({ cwd: "src" })
  .include("database")
  .then("models")
  .then("controllers")
  .then("routes")
  .into(app);

app.use((req, res, next) => {
  req.app = app;
  return next();
});

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});

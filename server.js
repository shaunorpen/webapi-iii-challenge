const express = require("express");
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

server.use(express.json());

server.use("/api/users", logger, userRouter);
server.use("/api/posts", logger, postRouter);

server.get("*", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger(req, _res, next) {
  const { method, baseUrl } = req;
  const timestamp = new Date();
  console.log(
    `*** NEW REQUEST ***\n Method: ${method}\n URL: ${baseUrl}\n Timestamp: ${timestamp}`
  );
  next();
}

module.exports = server;

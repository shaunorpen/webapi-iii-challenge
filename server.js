const express = require("express");

const server = express();

server.get("*", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

function logger(req, res, next) {
  const { method, url } = req;
  const timestamp = new Date();
  console.log(
    `*** NEW REQUEST ***\n Method: ${method}\n URL: ${url}\n Timestamp: ${timestamp}`
  );
  next();
}

module.exports = server;

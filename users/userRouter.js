const express = require("express");
const router = express.Router();
const users = require("./userDb");

router.post("/", validateUser, (req, res) => {
  users
    .insert(req.user)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message:
          "Something went wrong adding the user to the database: " +
          error.message
      });
    });
});

router.post("/:id/posts", validateUserId, (req, res) => {});

router.get("/", (req, res) => {
  users
    .get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message:
          "Something went wrong getting users from the database: " +
          error.message
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {});

router.get("/:id/posts", validateUserId, (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {});

router.put("/:id", validateUserId, (req, res) => {});

function validateUserId(req, res, next) {
  users
    .getById(req.params.id)
    .then(data => {
      if (data) {
        req.user = data;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message:
          "There was a problem retrieving the user with id x from the database: " +
          error.message
      });
    });
}

function validateUser(req, res, next) {
  if (Object.keys(req.body).length) {
    if (Object.keys(req.body).includes("name")) {
      req.user = req.body;
      next();
    } else {
      res.status(400).json({ message: "missing required name field" });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  // - `validatePost` validates the `body` on a request to create a new post
  // - if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing post data" }`
  // - if the request `body` is missing the required `text` field, cancel the request and respond with status `400` and `{ message: "missing required text field" }`
}

module.exports = router;

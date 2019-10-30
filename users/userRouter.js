const express = require("express");
const router = express.Router();
const users = require("./userDb");

router.post("/", (req, res) => {
  users
    .insert(req.body)
    .then(
      data => {
        res.status(201).json(data);
      }
    )
    .catch(error => {
      res.status(500).json({
        message: "Something went wrong adding the user to the database: " + error.message,
      })
    })
});

router.post("/:id/posts", (req, res) => {});

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

router.get("/:id", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

function validateUserId(req, res, next) {
  // - `validateUserId` validates the user id on every request that expects a user id parameter
  // - if the `id` parameter is valid, store that user object as `req.user`
  // - if the `id` parameter does not match any user id in the database, cancel the request and respond with status `400` and `{ message: "invalid user id" }`
}

function validateUser(req, res, next) {
  // - `validateUser` validates the `body` on a request to create a new user
  // - if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing user data" }`
  // - if the request `body` is missing the required `name` field, cancel the request and respond with status `400` and `{ message: "missing required name field" }`
}

function validatePost(req, res, next) {
  // - `validatePost` validates the `body` on a request to create a new post
  // - if the request `body` is missing, cancel the request and respond with status `400` and `{ message: "missing post data" }`
  // - if the request `body` is missing the required `text` field, cancel the request and respond with status `400` and `{ message: "missing required text field" }`
}

module.exports = router;

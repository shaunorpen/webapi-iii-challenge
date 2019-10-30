const express = require("express");
const posts = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  posts
    .get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: "There was a problem retrieving posts: " + error.message
      });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  posts
    .remove(req.post.id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: "There was a problem deleting the post: " + error.message
      });
    });
});

router.put("/:id", validatePostId, validatePostUpdates, (req, res) => {
  posts
    .update(req.post.id, { ...req.post, ...req.updatedPost })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: "There was a problem updating the post: " + error.message
      });
    });
});

function validatePostId(req, res, next) {
  posts
    .getById(req.params.id)
    .then(data => {
      if (data) {
        req.post = data;
        next();
      } else {
        res.status(404).json({
          message: "There is no post with that id"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "There was a problem getting post by id: " + error.message
      });
    });
}

function validatePostUpdates(req, res, next) {
  const post = Object.keys(req.body);
  if (post.length) {
    req.updatedPost = req.body;
    next();
  } else {
    res.status(400).json({
      message: "Please add updated post details to the request"
    });
  }
}

module.exports = router;

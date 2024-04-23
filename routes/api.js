const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
} = require("../db/post.js");

router.get("/posts", async (req, res) => {
  try {
    const allPosts = await getAllPosts();
    res.status(200).send(allPosts);
  } catch (error) {
    console.error("error on api/posts route", error);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await getPostById(parseInt(req.params.id));
    if (post) {
      res.status(200).send(post);
    } else {
      res.status(404).send("no post exists with that id");
    }
  } catch (error) {
    console.error("error on api/posts/:id route", error);
  }
});

router.post("/posts", async (req, res) => {
  if (req.user) {
    try {
      const newPost = await createPost(
        req.body.title,
        req.body.content,
        req.user.id
      );
      res.status(201).send(newPost);
    } catch (error) {
      console.error("error on api/posts route", error);
    }
  } else {
    res.status(401).send("you must be logged in to create a post");
  }
});

router.put("/posts/:id", async (req, res) => {
  if (req.user) {
    try {
      let updateData = {};
      for (key in req.body) {
        if (key === "title" || key === "content") {
          updateData[key] = req.body[key];
        }
      }
      const updatedPost = await updatePost(
        parseInt(req.params.id),
        updateData,
        req.user.id
      );
      if (updatedPost) {
        res.status(200).send(updatedPost);
      } else {
        res.status(404).send("You have no posts with that Id");
      }
    } catch (error) {
      console.error("error on api/posts/:id route", error);
    }
  } else {
    res
      .status(401)
      .send(
        "you are either not logged in, or you are trying to update someone else's post"
      );
  }
});

module.exports = router;

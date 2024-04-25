const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsByUser,
  toggleLike,
} = require("../db/post.js");

router.get("/posts", async (req, res) => {
  try {
    const allPosts = await getAllPosts();
    res.status(200).send(allPosts);
  } catch (error) {
    console.error("error on api/posts GET route", error);
  }
});

//new: get posts by user
router.get("/posts/user", async (req, res) => {
  if (req.user) {
    try {
      const userPosts = await getPostsByUser(req.user.id);
      res.status(200).send(userPosts);
    } catch (error) {
      console.error("error on user GET route", error);
    }
  } else {
    res.status(401).send("you must be logged in to do that");
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
    console.error("error on api/posts/:id GET route", error);
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
      console.error("error on api/posts POST route", error);
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
      console.error("error on api/posts/:id PUT route", error);
    }
  } else {
    res.status(401).send("you must be logged in to update a post");
  }
});

router.delete("/posts/:id", async (req, res) => {
  if (req.user) {
    try {
      const deletedPost = await deletePost(
        parseInt(req.params.id),
        req.user.id
      );
      if (deletedPost) {
        res.status(200).send(deletedPost);
      } else {
        res.status(404).send("could not find a post with that author");
      }
    } catch (error) {
      console.error("error on api/posts/:id DELETE route", error);
    }
  } else {
    res.status(401).send("you must be logged in to delete a post ");
  }
});

router.post("/posts/likes", async (req, res) => {
  if (req.user){
    try {
      const likeMessage = await toggleLike(
        parseInt(req.user.id),
        parseInt(req.body.postId)
      );
      res.send(likeMessage);
    } catch (error) {
      console.error("error on likes route", error)
    }
  }else{
    res.send({msg: "you must be signed in to like a post"})
  }
 
});

module.exports = router;

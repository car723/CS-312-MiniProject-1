const express = require("express");
const router = express.Router();

// In-memory store
let posts = [];
let idCounter = 1;

// Home (list + create form)
router.get("/", (req, res) => {
  res.render("index", { posts });
});

// Create new post
router.post("/posts", (req, res) => {
  const { author, title, content } = req.body;
  const newPost = {
    id: idCounter++,
    author,
    title,
    content,
    createdAt: new Date().toLocaleString()
  };
  posts.push(newPost);
  res.redirect("/");
});

// Edit form
router.get("/posts/:id/edit", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.send("Post not found!");
  res.render("edit", { post });
});

// Update post
router.put("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
    post.author = req.body.author;
  }
  res.redirect("/");
});

// Delete post
router.delete("/posts/:id", (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect("/");
});

module.exports = router;

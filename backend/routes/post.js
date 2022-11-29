const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()



// creating a post
router.post("/",jsonParser, async (req, res) => {
    
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);   
    } catch (err) {
      res.status(500).json(err);
    }
  });
// updating a post

router.put("/:id", jsonParser,async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
})

// deleting a post


router.delete("/:id", jsonParser,async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("post deleted as you wished");
      } else {
        res.status(403).json("sorry can't delete anyone else's post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


// Find and get one post 


router.get("/:id", jsonParser,async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
});


//get user's all posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


  // get all user's all posts
  router.get("/timeline/:userId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const allPosts = await Post.find();
      res.status(200).json(allPosts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  module.exports = router;
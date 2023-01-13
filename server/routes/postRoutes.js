const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');

router.post("/createPost", async (request, response ) => { 
    const { title, description } = request.body
  
    try {
        const newPost = new Post({
            title,
            description
        });
        const savedPost = await newPost.save();
        response.json(savedPost);
    } catch (err) {
        console.error(err);
        response.status(500).send();
    }
});

router.get("/getPosts", async (request, response) => {
    try {
        const posts = await Post.find();
        response.json(posts);
    } catch (err) {
        console.error(err);
        response.status(500).send();
    }
});

router.get("/getPost/:id", async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        response.json(post);
    } catch (err) {
        console.error(err);
        response.status(500).send();
    }
});


router.put("/updatePost/:id", async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (post) {
            post.title = request.body.title;
            post.description = request.body.description;
            const updatedPost = await post.save();
            response.json(updatedPost);
        } else {
            response.status(404).json({ message: "Post not found" });
        }
    } catch (err) {
        console.error(err);
        response.status(500).send();
    }
});


router.delete("/deletePost/:id", async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (post) {
            await post.remove();
            response.json({ message: "Post removed" });
        } else {
            response.status(404).json({ message: "Post not found" });
        }
    } catch (err) {
        console.error(err);
        response.status(500).send();
    }
});



  
  module.exports = router;
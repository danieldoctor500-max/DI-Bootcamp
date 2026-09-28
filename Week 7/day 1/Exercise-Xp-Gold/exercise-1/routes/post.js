const express = require("express");

const router = express.Router();

// In-memory database
const posts = [
    {
        id: 1,
        title: "My First Blog Post",
        content: "This is my first blog post using Express.js.",
        timestamp: new Date().toISOString()
    },
    {
        id: 2,
        title: "Learning Node.js",
        content: "I am learning how to build APIs with Node.js.",
        timestamp: new Date().toISOString()
    }
];

// GET /posts
// Retrieve all blog posts
router.get("/", (req, res) => {
    res.status(200).json(posts);
});

// GET /posts/:id
// Retrieve one blog post
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "Post ID must be a number"
        });
    }

    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    res.status(200).json(post);
});

// POST /posts
// Create a new blog post
router.post("/", (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: "Title and content are required"
        });
    }

    if (
        typeof title !== "string" ||
        typeof content !== "string"
    ) {
        return res.status(400).json({
            message: "Title and content must be strings"
        });
    }

    const newPost = {
        id: posts.length > 0
            ? Math.max(...posts.map((post) => post.id)) + 1
            : 1,
        title: title.trim(),
        content: content.trim(),
        timestamp: new Date().toISOString()
    };

    if (!newPost.title || !newPost.content) {
        return res.status(400).json({
            message: "Title and content cannot be empty"
        });
    }

    posts.push(newPost);

    res.status(201).json({
        message: "Post created successfully",
        post: newPost
    });
});

// PUT /posts/:id
// Update an existing blog post
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "Post ID must be a number"
        });
    }

    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: "Title and content are required"
        });
    }

    if (
        typeof title !== "string" ||
        typeof content !== "string"
    ) {
        return res.status(400).json({
            message: "Title and content must be strings"
        });
    }

    if (!title.trim() || !content.trim()) {
        return res.status(400).json({
            message: "Title and content cannot be empty"
        });
    }

    post.title = title.trim();
    post.content = content.trim();
    post.timestamp = new Date().toISOString();

    res.status(200).json({
        message: "Post updated successfully",
        post
    });
});

// DELETE /posts/:id
// Delete a blog post
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "Post ID must be a number"
        });
    }

    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const deletedPost = posts.splice(postIndex, 1)[0];

    res.status(200).json({
        message: "Post deleted successfully",
        post: deletedPost
    });
});

module.exports = router;
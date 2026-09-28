const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let posts = [
    {
        id: 1,
        title: "Introduction to Node.js",
        content: "Node.js allows JavaScript to run outside the browser."
    },
    {
        id: 2,
        title: "Learning Express",
        content: "Express makes it easier to build web APIs with Node.js."
    },
    {
        id: 3,
        title: "REST APIs",
        content: "REST APIs allow applications to communicate using HTTP."
    }
];

// GET /posts
app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

// GET /posts/:id
app.get("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    res.status(200).json(post);
});

// POST /posts
app.post("/posts", (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            message: "Title and content are required"
        });
    }

    const newPost = {
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
        title,
        content
    };

    posts.push(newPost);

    res.status(201).json(newPost);
});

// PUT /posts/:id
app.put("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const { title, content } = req.body;

    if (title !== undefined) {
        post.title = title;
    }

    if (content !== undefined) {
        post.content = content;
    }

    res.status(200).json(post);
});

// DELETE /posts/:id
app.delete("/posts/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const deletedPost = posts.splice(postIndex, 1);

    res.status(200).json({
        message: "Post deleted successfully",
        post: deletedPost[0]
    });
});

// Invalid route handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Server error handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Internal server error"
    });
});

app.listen(PORT, () => {
    console.log(`Blog API server is running on http://localhost:${PORT}`);
});
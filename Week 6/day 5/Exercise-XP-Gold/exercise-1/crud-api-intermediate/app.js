import express from "express";
import axios from "axios";

const app = express();
const PORT = 5000;

const API_URL = "https://jsonplaceholder.typicode.com/posts";

app.use(express.json());

// GET all posts
app.get("/api/posts", async (req, res) => {
    try {
        const response = await axios.get(API_URL);

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching posts:", error.message);

        res.status(500).json({
            message: "Failed to fetch posts"
        });
    }
});

// GET one post
app.get("/api/posts/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const response = await axios.get(`${API_URL}/${id}`);

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching post:", error.message);

        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(500).json({
            message: "Failed to fetch post"
        });
    }
});

// CREATE post
app.post("/api/posts", async (req, res) => {
    try {
        const { title, body, userId } = req.body;

        if (!title || !body || !userId) {
            return res.status(400).json({
                message: "title, body and userId are required"
            });
        }

        const response = await axios.post(API_URL, {
            title,
            body,
            userId
        });

        res.status(201).json(response.data);
    } catch (error) {
        console.error("Error creating post:", error.message);

        res.status(500).json({
            message: "Failed to create post"
        });
    }
});

// UPDATE post
app.put("/api/posts/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const { title, body, userId } = req.body;

        const response = await axios.put(`${API_URL}/${id}`, {
            id: Number(id),
            title,
            body,
            userId
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error updating post:", error.message);

        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(500).json({
            message: "Failed to update post"
        });
    }
});

// DELETE post
app.delete("/api/posts/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await axios.delete(`${API_URL}/${id}`);

        res.status(200).json({
            message: `Post ${id} deleted successfully`
        });
    } catch (error) {
        console.error("Error deleting post:", error.message);

        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(500).json({
            message: "Failed to delete post"
        });
    }
});

// Invalid route
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Internal server error"
    });
});

app.listen(PORT, () => {
    console.log(`Intermediate CRUD API running on http://localhost:${PORT}`);
});
import express from "express";
import { fetchPosts } from "./data/dataService.js";

const app = express();
const PORT = 5000;

app.get("/api/posts", async (req, res) => {
    try {
        const posts = await fetchPosts();

        console.log("Posts successfully retrieved and sent.");

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error retrieving posts:", error.message);

        res.status(500).json({
            message: "Failed to retrieve posts"
        });
    }
});

app.listen(PORT, () => {
    console.log(`CRUD API server is running on http://localhost:${PORT}`);
});
const postModel = require("../models/postModel");

const getPosts = async (req, res) => {
    try {
        const posts = await postModel.getAllPosts();

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve posts"
        });
    }
};

const getPost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await postModel.getPostById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve post"
        });
    }
};

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const result = await postModel.createPost(title, content);

        res.status(201).json({
            message: "Post created successfully",
            post: result[0]
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create post"
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const result = await postModel.updatePost(
            id,
            title,
            content
        );

        if (result.length === 0) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post updated successfully",
            post: result[0]
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update post"
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await postModel.deletePost(id);

        if (deleted === 0) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete post"
        });
    }
};

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};
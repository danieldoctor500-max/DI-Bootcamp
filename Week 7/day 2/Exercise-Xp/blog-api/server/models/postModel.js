const db = require("../config/database");

const getAllPosts = () => {
    return db("posts")
        .select("*")
        .orderBy("id", "asc");
};

const getPostById = (id) => {
    return db("posts")
        .where({ id })
        .first();
};

const createPost = (title, content) => {
    return db("posts")
        .insert({
            title,
            content
        })
        .returning("*");
};

const updatePost = (id, title, content) => {
    return db("posts")
        .where({ id })
        .update({
            title,
            content
        })
        .returning("*");
};

const deletePost = (id) => {
    return db("posts")
        .where({ id })
        .del();
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
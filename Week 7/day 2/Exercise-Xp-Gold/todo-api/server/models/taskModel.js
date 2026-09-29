const db = require("../config/database");

const getAllTasks = () => {
    return db("tasks").select("*").orderBy("id");
};

const getTaskById = (id) => {
    return db("tasks").where({ id }).first();
};

const createTask = (task) => {
    return db("tasks")
        .insert(task)
        .returning("*");
};

const updateTask = (id, task) => {
    return db("tasks")
        .where({ id })
        .update(task)
        .returning("*");
};

const deleteTask = (id) => {
    return db("tasks")
        .where({ id })
        .del();
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
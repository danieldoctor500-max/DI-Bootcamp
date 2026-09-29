const express = require("express");

const {
    register,
    login,
    getUsers,
    getUser,
    updateUser
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/users", getUsers);

router.get("/users/:id", getUser);

router.put("/users/:id", updateUser);

module.exports = router;
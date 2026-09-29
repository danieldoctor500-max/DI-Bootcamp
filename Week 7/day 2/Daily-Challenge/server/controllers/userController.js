const bcrypt = require("bcrypt");
const db = require("../config/database");
const UserModel = require("../models/userModel");
const PasswordModel = require("../models/passwordModel");

const SALT_ROUNDS = 10;

// POST /register
const register = async (req, res) => {
    const {
        email,
        username,
        first_name,
        last_name,
        password
    } = req.body;

    if (
        !email ||
        !username ||
        !first_name ||
        !last_name ||
        !password
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long"
        });
    }

    try {
        const existingUser = await UserModel.getUserByUsername(username);

        if (existingUser) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            SALT_ROUNDS
        );

        const result = await db.transaction(async (trx) => {
            const [user] = await UserModel.createUser(trx, {
                email,
                username,
                first_name,
                last_name
            });

            await PasswordModel.createPassword(trx, {
                username,
                password: hashedPassword
            });

            return user;
        });

        res.status(201).json({
            message: "User registered successfully",
            user: result
        });
    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Failed to register user"
        });
    }
};


// POST /login
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    try {
        const user = await UserModel.getUserByUsername(username);

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const passwordRecord =
            await PasswordModel.getPasswordByUsername(username);

        if (!passwordRecord) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            passwordRecord.password
        );

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            user
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Failed to login"
        });
    }
};


// GET /users
const getUsers = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();

        res.status(200).json(users);
    } catch (error) {
        console.error("Get users error:", error);

        res.status(500).json({
            message: "Failed to retrieve users"
        });
    }
};


// GET /users/:id
const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.getUserById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Get user error:", error);

        res.status(500).json({
            message: "Failed to retrieve user"
        });
    }
};


// PUT /users/:id
const updateUser = async (req, res) => {
    const { id } = req.params;

    const {
        email,
        username,
        first_name,
        last_name
    } = req.body;

    if (!email && !username && !first_name && !last_name) {
        return res.status(400).json({
            message: "At least one field is required"
        });
    }

    try {
        const existingUser = await UserModel.getUserById(id);

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const updateData = {};

        if (email !== undefined) {
            updateData.email = email;
        }

        if (username !== undefined) {
            updateData.username = username;
        }

        if (first_name !== undefined) {
            updateData.first_name = first_name;
        }

        if (last_name !== undefined) {
            updateData.last_name = last_name;
        }

        const [updatedUser] = await UserModel.updateUser(
            id,
            updateData
        );

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Update user error:", error);

        res.status(500).json({
            message: "Failed to update user"
        });
    }
};


module.exports = {
    register,
    login,
    getUsers,
    getUser,
    updateUser
};
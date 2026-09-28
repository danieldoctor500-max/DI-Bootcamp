const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

app.use(express.json());

const JWT_SECRET = "my_secret_key";

const users = [];

// Register
app.post("/api/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email, and password are required."
            });
        }

        const existingUser = users.find(
            user => user.email === email
        );

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword
        };

        users.push(newUser);

        res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Registration failed."
        });
    }
});

// Login
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const user = users.find(
            user => user.email === email
        );

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email
            },
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login successful.",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: "Login failed."
        });
    }
});

// Profile
app.get("/api/profile", (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization token is required."
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Invalid authorization format."
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        res.json({
            message: "Profile retrieved successfully.",
            user: decoded
        });
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token."
        });
    }
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found."
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`User login server is running on http://localhost:${PORT}`);
});
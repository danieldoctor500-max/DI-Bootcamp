const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 5000;

// Store connected users in memory
const users = new Map();

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Socket.io connection
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a room
    socket.on("joinRoom", ({ username, room }) => {
        if (
            typeof username !== "string" ||
            typeof room !== "string"
        ) {
            socket.emit("joinError", {
                message: "Username and room are required."
            });

            return;
        }

        const cleanUsername = username.trim();
        const cleanRoom = room.trim();

        if (!cleanUsername || !cleanRoom) {
            socket.emit("joinError", {
                message: "Username and room cannot be empty."
            });

            return;
        }

        // Prevent joining multiple rooms with the same socket
        const existingUser = users.get(socket.id);

        if (existingUser) {
            socket.leave(existingUser.room);

            users.delete(socket.id);

            sendActiveUsers(existingUser.room);
        }

        // Join Socket.io room
        socket.join(cleanRoom);

        // Store user information
        users.set(socket.id, {
            username: cleanUsername,
            room: cleanRoom
        });

        // Confirm successful join
        socket.emit("joinedRoom", {
            username: cleanUsername,
            room: cleanRoom
        });

        // Notify other users
        socket.to(cleanRoom).emit("notification", {
            message: `${cleanUsername} joined the room`
        });

        // Update active users
        sendActiveUsers(cleanRoom);

        console.log(
            `${cleanUsername} joined room: ${cleanRoom}`
        );
    });

    // Send message
    socket.on("sendMessage", (message) => {
        const user = users.get(socket.id);

        if (!user) {
            socket.emit("notification", {
                message: "You must join a room before sending messages."
            });

            return;
        }

        if (typeof message !== "string") {
            return;
        }

        const cleanMessage = message.trim();

        if (!cleanMessage) {
            return;
        }

        const chatMessage = {
            username: user.username,
            message: cleanMessage,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })
        };

        // Send message to everyone in the same room
        io.to(user.room).emit("newMessage", chatMessage);
    });

    // Leave room
    socket.on("leaveRoom", () => {
        leaveCurrentRoom(socket);
    });

    // Disconnect
    socket.on("disconnect", () => {
        const user = users.get(socket.id);

        if (user) {
            socket.to(user.room).emit("notification", {
                message: `${user.username} left the room`
            });

            users.delete(socket.id);

            sendActiveUsers(user.room);

            console.log(
                `${user.username} disconnected from ${user.room}`
            );
        } else {
            console.log(`User disconnected: ${socket.id}`);
        }
    });
});


// Remove a user from their current room
function leaveCurrentRoom(socket) {
    const user = users.get(socket.id);

    if (!user) {
        return;
    }

    socket.to(user.room).emit("notification", {
        message: `${user.username} left the room`
    });

    socket.leave(user.room);

    users.delete(socket.id);

    sendActiveUsers(user.room);

    socket.emit("leftRoom");

    console.log(
        `${user.username} left room: ${user.room}`
    );
}


// Send active users in a room
function sendActiveUsers(room) {
    const activeUsers = [];

    for (const user of users.values()) {
        if (user.room === room) {
            activeUsers.push(user.username);
        }
    }

    io.to(room).emit("activeUsers", activeUsers);
}


// Start server
server.listen(PORT, () => {
    console.log(
        `Chat server running at http://localhost:${PORT}`
    );
});
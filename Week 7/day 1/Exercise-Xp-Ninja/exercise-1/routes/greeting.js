const express = require("express");

const router = express.Router();

// List of available emojis
const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

// GET /
// Display the greeting form
router.get("/", (req, res) => {
    const emojiOptions = emojis
        .map((emoji) => `<option value="${emoji}">${emoji}</option>`)
        .join("");

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Emoji Greeting App</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    background: #f4f4f4;
                    padding: 50px;
                }

                .container {
                    background: white;
                    max-width: 500px;
                    margin: auto;
                    padding: 30px;
                    border-radius: 10px;
                }

                input, select, button {
                    width: 90%;
                    padding: 12px;
                    margin: 10px;
                    font-size: 16px;
                }

                button {
                    cursor: pointer;
                }
            </style>
        </head>

        <body>
            <div class="container">
                <h1>Emoji Greeting App</h1>

                <form method="POST" action="/greet">
                    <label for="name">Enter your name:</label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                    >

                    <label for="emoji">Choose an emoji:</label>

                    <select id="emoji" name="emoji">
                        ${emojiOptions}
                    </select>

                    <button type="submit">
                        Greet Me
                    </button>
                </form>
            </div>
        </body>
        </html>
    `);
});

// POST /greet
// Process the form
router.post("/greet", (req, res) => {
    const { name, emoji } = req.body;

    // Validate name
    if (!name || !name.trim()) {
        return res.status(400).send(`
            <h1>Name is required</h1>
            <a href="/">Go back</a>
        `);
    }

    // Validate emoji
    if (!emojis.includes(emoji)) {
        return res.status(400).send(`
            <h1>Invalid emoji selected</h1>
            <a href="/">Go back</a>
        `);
    }

    const cleanName = name.trim();

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Greeting</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    background: #f4f4f4;
                    padding: 50px;
                }

                .greeting {
                    background: white;
                    max-width: 600px;
                    margin: auto;
                    padding: 40px;
                    border-radius: 10px;
                }

                .emoji {
                    font-size: 60px;
                }

                a {
                    display: inline-block;
                    margin-top: 20px;
                }
            </style>
        </head>

        <body>
            <div class="greeting">
                <div class="emoji">${emoji}</div>

                <h1>
                    Hello, ${cleanName}!
                </h1>

                <p>
                    ${emoji} Welcome! It's great to see you.
                </p>

                <a href="/">Create another greeting</a>
            </div>
        </body>
        </html>
    `);
});

module.exports = router;
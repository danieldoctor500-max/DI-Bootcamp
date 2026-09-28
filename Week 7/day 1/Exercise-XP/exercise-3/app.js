const express = require('express');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/books', bookRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

app.listen(PORT, () => {
    console.log(`Book API running at http://localhost:${PORT}`);
});
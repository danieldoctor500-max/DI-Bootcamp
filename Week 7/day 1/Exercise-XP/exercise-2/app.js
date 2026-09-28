const express = require('express');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/todos', todoRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});

app.listen(PORT, () => {
    console.log(`Todo API running at http://localhost:${PORT}`);
});
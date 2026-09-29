const knex = require("knex");

const db = knex({
    client: "pg",
    connection: {
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "doctor45",
        database: "quiz_game"
    }
});

module.exports = db;
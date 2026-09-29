const knex = require("knex");

const db = knex({
    client: "pg",
    connection: {
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "doctor45",
        database: "todo_api"
    }
});

module.exports = db;
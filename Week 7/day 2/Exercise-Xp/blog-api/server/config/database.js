const knex = require("knex");

const db = knex({
    client: "pg",
    connection: {
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "twende35",
        database: "blog_api"
    }
});

module.exports = db;
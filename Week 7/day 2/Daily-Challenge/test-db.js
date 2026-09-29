const db = require("./server/config/database");

async function testConnection() {
    try {
        const result = await db.raw("SELECT current_database()");
        console.log("Database connected successfully.");
        console.log("Database:", result.rows[0].current_database);
    } catch (error) {
        console.error("Database connection failed:", error.message);
    } finally {
        await db.destroy();
    }
}

testConnection();
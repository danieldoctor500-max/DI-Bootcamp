const db = require("../config/database");

const UserModel = {
    getAllUsers() {
        return db("users")
            .select(
                "id",
                "email",
                "username",
                "first_name",
                "last_name"
            );
    },

    getUserById(id) {
        return db("users")
            .where({ id })
            .first();
    },

    getUserByUsername(username) {
        return db("users")
            .where({ username })
            .first();
    },

    createUser(trx, userData) {
        return trx("users")
            .insert(userData)
            .returning([
                "id",
                "email",
                "username",
                "first_name",
                "last_name"
            ]);
    },

    updateUser(id, userData) {
        return db("users")
            .where({ id })
            .update(userData)
            .returning([
                "id",
                "email",
                "username",
                "first_name",
                "last_name"
            ]);
    }
};

module.exports = UserModel;
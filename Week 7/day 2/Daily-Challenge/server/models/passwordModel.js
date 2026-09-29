const db = require("../config/database");

const PasswordModel = {
    createPassword(trx, passwordData) {
        return trx("hashpwd")
            .insert(passwordData)
            .returning(["id", "username"]);
    },

    getPasswordByUsername(username) {
        return db("hashpwd")
            .where({ username })
            .first();
    },

    updatePassword(trx, username, password) {
        return trx("hashpwd")
            .where({ username })
            .update({ password });
    }
};

module.exports = PasswordModel;
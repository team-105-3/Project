const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        f_name: String,
        l_name: String,
        email: String,
        password: String,
        key: String
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);
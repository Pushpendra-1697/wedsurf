const { Schema, model } = require("mongoose");

//Schema/blueprint of user
const userSchema = new Schema(
    {
        name: String,
        password: { type: String, required: true },
        phone: Number,
        location: String,
        email: { type: String, required: true }
    },
    { versionKey: false, timestamps: true }
);

//Model of event
const UserModel = model("user", userSchema);

module.exports = UserModel;
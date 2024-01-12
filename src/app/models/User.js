const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserInfoModel = new Schema(
    {
        password: { type: String, required: true },
        email: { type: String, required: true, lowercase: true },
        firstName: { type: String, required: true },
        lastName: { type: String },
        job: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("userinfo", UserInfoModel);

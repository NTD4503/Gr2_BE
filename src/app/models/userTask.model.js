const { Schema, model } = require("mongoose");
const { userTableName } = require("./user.model");
const { taskTableName } = require("./Task.model");
const ObjectId = Schema.Types.ObjectId;

const UserTaskTableName = "usertask";

const UserTaskSchema = new Schema(
    {
        role: { type: Number },
        userId: { type: ObjectId, ref: userTableName },
        taskId: { type: ObjectId, ref: taskTableName },
    },
    {
        versionKey: false,
    },
);

const UserTaskModel = model(UserTaskTableName, UserTaskSchema);

module.exports = { UserTaskModel, UserTaskTableName };

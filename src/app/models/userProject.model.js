const { Schema, model } = require("mongoose");
const { userTableName } = require("./user.model");
const { projectTableName } = require("./Project.model");

const ObjectId = Schema.Types.ObjectId;
const UserProjectTableName = "userproject";

const UserProjectSchema = new Schema(
    {
        role: { type: Number },
        userId: { type: ObjectId, ref: userTableName },
        projectId: { type: ObjectId, ref: projectTableName },
    },
    {
        versionKey: false,
    },
);

const UserProjectModel = model(UserProjectTableName, UserProjectSchema);

module.exports = { UserProjectModel, UserWorkspaceTableName };

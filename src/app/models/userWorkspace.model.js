const { Schema, model } = require("mongoose");
const { userTableName } = require("./user.model");
const { workspaceTableName } = require("./workspace.model");

const ObjectId = Schema.Types.ObjectId;
const UserWorkspaceTableName = "userworkspace";

const UserWorkspaceSchema = new Schema(
    {
        role: { type: Number },
        userId: { type: ObjectId, ref: userTableName },
        wsId: { type: ObjectId, ref: workspaceTableName },
    },
    {
        versionKey: false,
    },
);

const UserWorkspaceModel = model(UserWorkspaceTableName, UserWorkspaceSchema);

module.exports = { UserWorkspaceModel, UserWorkspaceTableName };

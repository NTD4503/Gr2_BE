const { Schema, model } = require("mongoose");
const { userTableName } = require("./user.model");
const { workspaceTableName } = require("./workspace.model");

const ObjectId = Schema.Types.ObjectId;
const workspaceCommentTableName = "workspacecomment";

const WorkspaceCommentSchema = new Schema(
    {
        userId: { type: ObjectId, ref: userTableName },
        wsId: { type: ObjectId, ref: workspaceTableName },
        description: { type: String },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

const WorkspaceCommentModel = model(workspaceCommentTableName, WorkspaceCommentSchema);

module.exports = { WorkspaceCommentModel, UserWorkspaceTableName };

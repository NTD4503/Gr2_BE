const { Schema, model } = require("mongoose");

const workspaceTableName = "workspace";

const WorkspaceSchema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        code: { type: String },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

const WorkspaceModel = model(workspaceTableName, WorkspaceSchema);

module.exports = { WorkspaceModel, workspaceTableName };

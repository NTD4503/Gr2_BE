const { Schema, model } = require("mongoose");
const { userTableName } = require("./user.model");
const { workspaceTableName } = require("./workspace.model");
const ObjectId = Schema.Types.ObjectId;

const projectTableName = "project";

const ProjectSchema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        userId: { type: ObjectId, ref: userTableName },
        wsId: { type: ObjectId, ref: workspaceTableName },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

const ProjectModel = model(projectTableName, ProjectSchema);

module.exports = { ProjectModel, projectTableName };

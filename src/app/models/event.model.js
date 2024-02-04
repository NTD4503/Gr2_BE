const { Schema, model } = require("mongoose");
const { userTableName } = require("./user.model");
const { workspaceTableName } = require("./workspace.model");
const ObjectId = Schema.Types.ObjectId;

const eventTableName = "event";

const EventSchema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        userId: { type: ObjectId, ref: userTableName },
        startTime: { type: Date },
        endTime: { type: Date },
        wsId: { type: ObjectId, ref: workspaceTableName },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

const EventModel = model(eventTableName, EventSchema);

module.exports = { EventModel, eventTableName };

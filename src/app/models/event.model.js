const { Schema, model } = require("mongoose");
const { userTableName } = require("./user.model");
const ObjectId = Schema.Types.ObjectId;

const eventTableName = "event";

const EventSchema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        userId: { type: ObjectId, ref: userTableName },
        startTime: { type: Date },
        endTime: { type: Date },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

const EventModel = model(eventTableName, EventSchema);

module.exports = { EventModel, eventTableName };

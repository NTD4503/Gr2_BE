const Config = require("../../util/Config");
const { EventModel } = require("../models/event.model");
const { mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class EventController {
    async create(req, res) {
        try {
            const { userId, name, description, startTime, endTime, wsId } = req.body;

            const newEvent = await EventModel.create({
                userId,
                name,
                description,
                startTime,
                endTime,
                wsId,
            });
            newEvent.save();

            return res.status(200).json(newEvent);
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getEvent(req, res) {
        try {
            const { userId } = req.body;

            const event = await EventModel.find({ userId });

            return res.status(200).json(event);
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async editEvent(req, res) {
        try {
            const { _id, name, description, startTime, endTime, wsId } = req.body;

            const event = await EventModel.updateOne(
                { _id },
                {
                    name,
                    description,
                    startTime,
                    endTime,
                    wsId,
                },
            );

            return res.status(200).json(event);
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async deleteEvent(req, res) {
        try {
            const { _id } = req.body;

            const event = await EventModel.deleteOne({ _id });

            return res.status(200).json(event);
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getEventByWs(req, res) {
        try {
            let event;
            const { selectedWs, userId } = req.body;

            const workspaceIds = selectedWs.map(workspaceId => new ObjectId(workspaceId));

            if (selectedWs.length) {
                event = await EventModel.find({ userId, wsId: { $in: workspaceIds } });
            } else {
                event = await EventModel.find({ userId });
            }
            return res.status(200).json(event);
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new EventController();

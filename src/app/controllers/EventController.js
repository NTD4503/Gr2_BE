const Config = require("../../util/Config");
const { EventModel } = require("../models/event.model");

class EventController {
    async create(req, res) {
        try {
            const { userId, name, description, startTime, endTime } = req.body;

            const newEvent = await EventModel.create({
                userId,
                name,
                description,
                startTime,
                endTime,
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
            const { _id, name, description, startTime, endTime } = req.body;

            const event = await EventModel.updateOne(
                { _id },
                {
                    name,
                    description,
                    startTime,
                    endTime,
                },
            );

            return res.status(200).json(event);
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new EventController();

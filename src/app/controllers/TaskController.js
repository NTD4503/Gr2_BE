const Config = require("../../util/Config");
const { TaskModel } = require("../models/Task.model");
const { UserTaskModel } = require("../models/userTask.model");

class TaskController {
    async create(req, res) {
        try {
            const {
                userId,
                name,
                description,
                startTime,
                deadline,
                priority,
                workspaceId,
                type,
                projectId,
                memberId,
            } = req.body;

            const newTask = await TaskModel.create({
                name,
                description,
                startTime,
                deadline,
                priority,
                progress: 0,
                workspaceId,
                type,
                projectId,
            });
            newTask.save();

            await UserTaskModel.create({
                userId,
                taskId: newTask._id,
                role: Config.USERTASK_ROLE_ADMIN,
            });

            if (memberId.length > 0) {
                memberId.foreach(async memId => {
                    await UserTaskModel.create({
                        userId: memId,
                        taskId: newTask._id,
                        role: Config.USERTASK_ROLE_MEMBER,
                    });
                });
            }

            return res.status(200).json(newTask);
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new TaskController();

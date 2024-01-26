const Config = require("../../util/Config");
const { UserTaskModel } = require("../models/userTask.model");
const { WorkspaceModel } = require("../models/workspace.model");

class WorkspaceController {
    async create(req, res) {
        try {
            const { userId, name, description, memberId } = req.body;

            const newTask = await WorkspaceModel.create({
                name,
                description,
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

module.exports = new WorkspaceController();

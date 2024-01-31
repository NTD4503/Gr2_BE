const Config = require("../../util/Config");
const { mongoose } = require("mongoose");
const { UserTaskModel } = require("../models/userTask.model");
const { UserWorkspaceModel } = require("../models/userWorkspace.model");
const { WorkspaceModel } = require("../models/workspace.model");
const { ProjectModel } = require("../models/Project.model");
const { UserProjectModel } = require("../models/userProject.model");
const { TaskModel } = require("../models/Task.model");
const ObjectId = mongoose.Types.ObjectId;

class ProjectController {
    async create(req, res) {
        try {
            const { userId, name, description, memberId, deadline, wsId } = req.body;

            const newPrj = await ProjectModel.create({
                name,
                description,
                userId,
                deadline,
                wsId,
            });
            newPrj.save();

            await UserProjectModel.create({
                userId,
                projectId: newPrj._id,
                role: Config.USERPROJECT_ROLE_ADMIN,
            });

            console.log("memberId: ", memberId);

            if (memberId.length > 0) {
                console.log(typeof memberId);
                await Promise.all(
                    memberId.map(async mem => {
                        console.log("created memberId: ", mem);
                        await UserProjectModel.create({
                            userId: mem,
                            projectId: newPrj._id,
                            role: Config.USERPROJECT_ROLE_MEMBER,
                        });
                    }),
                );
            }

            return res.status(200).json(newPrj);
        } catch (err) {
            console.log(err);
        }
    }

    async getTaskOfProject(req, res) {
        try {
            const { _id } = req.body;

            const allTask = await TaskModel.aggregate([
                { $match: { projectId: new ObjectId(_id) } },
                // {
                //     $lookup: {
                //         from: "usertasks",
                //         localField: "_id",
                //         foreignField: "taskId",
                //         as: "usertasks"
                //     },
                // },
            ]);

            return res.status(200).json(allTask);
        } catch (err) {
            console.log(err);
        }
    }
    async getAllUserOfProject(req, res) {
        try {
            const { _id } = req.body;

            const allTask = await UserProjectModel.aggregate([
                { $match: { projectId: new ObjectId(_id) } },
                {
                    $lookup: {
                        from: "userinfos",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userInfo",
                    },
                },
                {
                    $unwind: "$userInfo",
                },
            ]);

            return res.status(200).json(allTask);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new ProjectController();

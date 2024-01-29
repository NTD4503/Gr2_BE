const Config = require("../../util/Config");
const { mongoose } = require("mongoose");
const { UserTaskModel } = require("../models/userTask.model");
const { UserWorkspaceModel } = require("../models/userWorkspace.model");
const { WorkspaceModel } = require("../models/workspace.model");
const ObjectId = mongoose.Types.ObjectId;

function generateRandomCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    return code;
}
class WorkspaceController {
    async create(req, res) {
        try {
            const { userId, name, description, memberId } = req.body;

            const newWs = await WorkspaceModel.create({
                name,
                description,
                code: generateRandomCode(),
            });
            newWs.save();

            await UserWorkspaceModel.create({
                userId,
                wsId: newWs._id,
                role: Config.USERWORKSPACE_ROLE_ADMIN,
            });

            return res.status(200).json(newWs);
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAll(req, res) {
        try {
            const { userId } = req.body;

            const workspaces = await UserWorkspaceModel.aggregate([
                { $match: { userId: new ObjectId(userId) } },
                {
                    $lookup: {
                        from: "workspaces", // assuming the name of your workspace collection
                        localField: "wsId",
                        foreignField: "_id",
                        as: "workspace",
                    },
                },
                { $unwind: "$workspace" },
                {
                    $project: {
                        role: 1,
                        workspace: 1,
                    },
                },
            ]);

            return res.status(200).json(workspaces);
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    async getDetailWs(req, res) {
        try {
            const { _id } = req.body;

            const workspaces = await WorkspaceModel.aggregate([
                { $match: { _id: new ObjectId(_id) } },
                {
                    $lookup: {
                        from: "projects",
                        localField: "_id",
                        foreignField: "wsId",
                        as: "project",
                    },
                },
                {
                    $lookup: {
                        from: "tasks",
                        localField: "_id",
                        foreignField: "workspaceId",
                        as: "tasks",
                    },
                },
                {
                    $lookup: {
                        from: "usertasks",
                        localField: "tasks._id",
                        foreignField: "taskId",
                        as: "usertasks",
                    },
                },
                {
                    $lookup: {
                        from: "userinfos",
                        localField: "usertasks.userId",
                        foreignField: "_id",
                        as: "usertask",
                    },
                },
                {
                    $addFields: {
                        "tasks.firstName": "$usertask.firstName",
                        "tasks.lastName": "$usertask.lastName",
                        "tasks.role": "$usertasks.role",
                        "tasks.userId": "$usertasks.userId",
                    },
                },
                {
                    $lookup: {
                        from: "userworkspaces",
                        localField: "_id",
                        foreignField: "wsId",
                        as: "members",
                    },
                },
                // {
                //     $unwind: "$members",
                // },
                {
                    $lookup: {
                        from: "userinfos",
                        localField: "members.userId", // Trường userId trong members
                        foreignField: "_id",
                        as: "member",
                    },
                },
                // {
                //     $addFields: {
                //         "member.role": "$members.role", // Thêm trường role vào member
                //     },
                // },
                // { $unwind: "$member" },
                {
                    $project: {
                        usertask: 0,
                        usertasks: 0,
                    },
                },
            ]);

            return res.status(200).json(workspaces);
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new WorkspaceController();

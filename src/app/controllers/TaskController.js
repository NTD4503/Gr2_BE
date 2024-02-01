const Config = require("../../util/Config");
const { mongoose } = require("mongoose");
const { TaskModel } = require("../models/Task.model");
const { UserTaskModel } = require("../models/userTask.model");
const ObjectId = mongoose.Types.ObjectId;

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
                status: Config.TASK_PROGRESS.TO_DO,
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

            // if (memberId && memberId?.length) {
            //     memberId.foreach(async memId => {
            //         await UserTaskModel.create({
            //             userId: memId,
            //             taskId: newTask._id,
            //             role: Config.USERTASK_ROLE_MEMBER,
            //         });
            //     });
            // }

            if (memberId && memberId.length > 0) {
                await Promise.all(
                    memberId.map(async memId => {
                        await UserTaskModel.create({
                            userId: memId,
                            taskId: newTask._id,
                            role: Config.USERTASK_ROLE_MEMBER,
                        });
                    }),
                );
            }

            return res.status(200).json(newTask);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAllTasksByUserId(req, res) {
        try {
            const { userId } = req.body;
            const allTasks = await UserTaskModel.aggregate([
                {
                    $match: {
                        userId: new ObjectId(userId),
                    },
                },
                {
                    $lookup: {
                        from: "tasks",
                        localField: "taskId",
                        foreignField: "_id",
                        as: "taskInfo",
                    },
                },
                {
                    $lookup: {
                        from: "projects",
                        localField: "taskInfo.projectId",
                        foreignField: "_id",
                        as: "projectInfo",
                    },
                },
                {
                    $lookup: {
                        from: "workspaces",
                        localField: "taskInfo.workspaceId",
                        foreignField: "_id",
                        as: "workspaceInfo",
                    },
                },
                {
                    $unwind: "$taskInfo",
                },
                {
                    $unwind: {
                        path: "$projectInfo",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $unwind: {
                        path: "$workspaceInfo",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $addFields: {
                        "taskInfo.projectName": "$projectInfo.name",
                        "taskInfo.workspaceName": "$workspaceInfo.name",
                        "taskInfo.userRole": "$role",
                        // usertask: {
                        //     $arrayElemAt: [
                        //         {
                        //             $filter: {
                        //                 input: "$userinfos",
                        //                 as: "usertask",
                        //                 cond: { $eq: ["$$userinfos._id", new ObjectId(userId)] },
                        //             },
                        //         },
                        //         0,
                        //     ],
                        // },
                    },
                },
            ]);
            res.status(200).json(allTasks);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateTask(req, res) {
        try {
            const { taskId, status, name, description, startTime, deadline, priority } = req.body;
            const updateTask = await TaskModel.updateOne(
                { _id: taskId },
                {
                    $set: {
                        status,
                        name,
                        description,
                        startTime,
                        deadline,
                        priority,
                    },
                },
            );
            res.status(200).json(updateTask);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteTask(req, res) {
        try {
            const { taskId } = req.body;
            const updateTask = await TaskModel.deleteOne({ _id: taskId });
            res.status(200).json(updateTask);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new TaskController();

const express = require("express");
const router = express.Router();

const APIConfig = require("../util/APIConfig");
const TaskController = require("../app/controllers/TaskController");

// Authentications
router.post(APIConfig.CREATE_TASK, TaskController.create);
router.post(APIConfig.GET_ALL_TASK_BY_USERID, TaskController.getAllTasksByUserId);
router.post(APIConfig.UPDATE_TASK, TaskController.updateTask);
router.post(APIConfig.DELETE_TASK, TaskController.deleteTask);

module.exports = router;

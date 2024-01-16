const express = require("express");
const router = express.Router();

const APIConfig = require("../util/APIConfig");
const TaskController = require("../app/controllers/TaskController");

// Authentications
router.post(APIConfig.CREATE_TASK, TaskController.create);

module.exports = router;

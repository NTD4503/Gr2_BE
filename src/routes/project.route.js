const express = require("express");
const router = express.Router();

const APIConfig = require("../util/APIConfig");
const ProjectController = require("../app/controllers/ProjectController");

// Authentications
router.post(APIConfig.CREATE_PROJECT, ProjectController.create);
router.post(APIConfig.GET_ALL_TASK_OF_PROJECT, ProjectController.getTaskOfProject);
router.post(APIConfig.GET_ALL_USER_OF_PROJECT, ProjectController.getAllUserOfProject);

module.exports = router;

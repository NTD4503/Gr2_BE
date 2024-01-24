const express = require("express");
const router = express.Router();

const APIConfig = require("../util/APIConfig");
const ProjectController = require("../app/controllers/ProjectController");

// Authentications
router.post(APIConfig.CREATE_PROJECT, ProjectController.create);

module.exports = router;

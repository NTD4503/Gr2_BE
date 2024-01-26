const express = require("express");
const router = express.Router();

const APIConfig = require("../util/APIConfig");
const WorkspaceController = require("../app/controllers/WorkspaceController");

// Authentications
router.post(APIConfig.CREATE_TASK, WorkspaceController.create);

module.exports = router;

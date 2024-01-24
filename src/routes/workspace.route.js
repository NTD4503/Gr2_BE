const express = require("express");
const router = express.Router();

const APIConfig = require("../util/APIConfig");
const WorkspaceController = require("../app/controllers/WorkspaceController");

// Authentications
router.post(APIConfig.CREATE_WORKSPACE, WorkspaceController.create);
router.post(APIConfig.GET_WORKSPACE_BY_USERID, WorkspaceController.getAll);
router.post(APIConfig.GET_DETAIL_WORKSPACE, WorkspaceController.getDetailWs);

module.exports = router;

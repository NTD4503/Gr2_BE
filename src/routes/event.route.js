const express = require("express");
const router = express.Router();

const APIConfig = require("../util/APIConfig");
const EventController = require("../app/controllers/EventController");

// Authentications
router.post(APIConfig.CREATE_EVENT, EventController.create);
router.post(APIConfig.GET_EVENT, EventController.getEvent);
router.post(APIConfig.EDIT_EVENT, EventController.editEvent);
router.post(APIConfig.DELETING_EVENT, EventController.deleteEvent);

module.exports = router;

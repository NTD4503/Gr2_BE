class APIConfig {
    // Auth
    static SIGNUP = "/signup";
    static GET_USER_INFO = "/get-user-info";
    static SEARCH_USER_EMAIL = "/search-user-email";
    static GET_ALL_USER_EMAIL = "/get-all-user-email";

    // Task
    static CREATE_TASK = "/create-task";
    static GET_ALL_TASK_BY_USERID = "/get-all-task-by-userid";
    static UPDATE_TASK = "/update-task";
    static DELETE_TASK = "/delete-task";

    // Event
    static CREATE_EVENT = "/create-event";
    static GET_EVENT = "/get-event";
    static EDIT_EVENT = "/edit-event";
    static DELETING_EVENT = "/delete-event";
    static GET_EVENT_BY_WS = "/get-event-by-ws";

    // Workspace
    static CREATE_WORKSPACE = "/create-workspace";
    static GET_WORKSPACE_BY_USERID = "/get-workspace-by-userid";
    static GET_DETAIL_WORKSPACE = "/get_detail-workspace";
    static JOIN_WORKSPACE_BY_CODE = "/join-workspace-by-code";
    static GET_ALL_USER_OF_WORKSPACE = "/get-all-user-of-workspace";
    static ADD_USER_TO_WORKSPACE = "/add-user-to-workspace";
    static GET_ALL_TASK_OF_WORKSPACE = "/get-all-task-of-workspace";

    // Project
    static CREATE_PROJECT = "/create-project";
    static GET_ALL_TASK_OF_PROJECT = "/get-all-task-of-project";
    static GET_ALL_USER_OF_PROJECT = "/get-all-user-of-project";
    static GET_ALL_PROJECT_BY_USER = "/get-all-project-by-user";
}

module.exports = APIConfig;

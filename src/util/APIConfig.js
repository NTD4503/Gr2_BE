class APIConfig {
    // Auth
    static SIGNUP = "/signup";
    static GET_USER_INFO = "/get-user-info";
    static SEARCH_USER_EMAIL = "/search-user-email";

    // Task
    static CREATE_TASK = "/create-task";

    // Event
    static CREATE_EVENT = "/create-event";
    static GET_EVENT = "/get-event";
    static EDIT_EVENT = "/edit-event";
    static DELETING_EVENT = "/delete-event";

    // Workspace
    static CREATE_WORKSPACE = "/create-workspace";
    static GET_WORKSPACE_BY_USERID = "/get-workspace-by-userid";
    static GET_DETAIL_WORKSPACE = "/get_detail-workspace";

    // Project
    static CREATE_PROJECT = "/create-project";
}

module.exports = APIConfig;

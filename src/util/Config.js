class Config {
    static USERTASK_ROLE_ADMIN = 1;
    static USERTASK_ROLE_MEMBER = 2;

    static USERWORKSPACE_ROLE_ADMIN = 1;
    static USERWORKSPACE_ROLE_MEMBER = 2;

    static USERPROJECT_ROLE_ADMIN = 1;
    static USERPROJECT_ROLE_MEMBER = 2;

    static TASK_PROGRESS = {
        TO_DO: "To do",
        PROCESSING: "Processing",
        REVIEW: "Review",
        DONE: "Done",
    };
}

module.exports = Config;

const authRouter = require("./auth.route");
const taskRouter = require("./task.route");
const eventRouter = require("./event.route");
const workspaceRouter = require("./workspace.route");
const projectRouter = require("./project.route");

function route(app) {
    app.use("/api", authRouter);
    app.use("/api", taskRouter);
    app.use("/api", eventRouter);
    app.use("/api", workspaceRouter);
    app.use("/api", projectRouter);
}

module.exports = route;

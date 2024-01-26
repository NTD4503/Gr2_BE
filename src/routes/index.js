const authRouter = require("./auth.route");
const taskRouter = require("./task.route");
const eventRouter = require("./event.route");
const workspaceRouter = require("./workspace.route");

function route(app) {
    app.use("/api", authRouter);
    app.use("/api", taskRouter);
    app.use("/api", eventRouter);
    app.use("/api", workspaceRouter);
}

module.exports = route;

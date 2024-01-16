const authRouter = require("./auth.route");
const taskRouter = require("./task.route");
const eventRouter = require("./event.route");

function route(app) {
    app.use("/api", authRouter);
    app.use("/api", taskRouter);
    app.use("/api", eventRouter);
}

module.exports = route;

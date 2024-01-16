const authRouter = require("./auth.route");
const taskRouter = require("./task.route");

function route(app) {
    app.use("/api", authRouter);
    app.use("/api", taskRouter);
}

module.exports = route;

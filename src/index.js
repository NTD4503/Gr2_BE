const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const cors = require("cors");

// Dotenv
require("dotenv").config();

// Format Time
const moment = require("moment");

const app = express();
const port = process.env.PORT || 8080;

const route = require("./routes");

const db = require("./config/db");
// Connnect to database
db.connect();

// Method overrides để gửi request form với phương thức PUT, DELETE
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Body-parse
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//HTTP logger
app.use(morgan("dev"));

// Static file path
app.use(express.static(path.join(__dirname, "public")));

// Cors
app.use(cors());

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});

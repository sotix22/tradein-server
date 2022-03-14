var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var syncRouter = require("./routes/sync");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var phoneRouter = require("./routes/phone");
var retailRouter = require("./routes/retail");
var deviceRouter = require("./routes/device");
var requestRouter = require("./routes/request");
var registratorRouter = require("./routes/registrator");
var rateRouter = require("./routes/rate");
var docsRouter = require("./routes/docs");
var bodyParser = require("body-parser");
var DB = require("./database");

var app = express();

// view engine setup
app.use(
  bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: "50mb",
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static("public"));

app.use("/sync", syncRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/registrator", registratorRouter);
app.use("/phone", phoneRouter);
app.use("/retail", retailRouter);
app.use("/device", deviceRouter);
app.use("/request", requestRouter);
app.use("/rate", rateRouter);
app.use("/docs", docsRouter);

module.exports = app;

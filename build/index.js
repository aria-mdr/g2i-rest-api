"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ts_log_1 = require("ts-log");
var app = express();
var port = 8181;
var log = ts_log_1.dummyLogger;
app.get("/", function (req, res) {
    var a = res.send("Hello world!");
});
// start the Express server
app.listen(port, function () {
    log.info("server started at http://localhost:" + port);
});
// import express = require('express');
// // Create a new express application instance
// const app: express.Application = express();
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

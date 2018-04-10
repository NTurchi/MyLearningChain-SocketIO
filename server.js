// Require modules
var express = require("express");
var ss = require("./services/socketServer");


// global variable
var app = express();
var port = 4000;
// Launch socket server
ss.socketServer(app.listen(port));

app.get("/", function (req, res) {
    res.send("Socket server is up");
});
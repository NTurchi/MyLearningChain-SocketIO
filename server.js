// Require modules
var express = require("express");
var ss = require("./services/socketServer");


// global variable
var app = express();
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var port = 4000;
// Launch socket server
ss.socketServer(app.listen(port));

app.get("/", function (req, res) {
    res.send("Socket server is up");
});
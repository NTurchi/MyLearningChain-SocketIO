// Require modules
var express = require("express");
var ss = require("./services/socketServer");


// global variable
var app = express();
app.use(function (request, response, next) {
    res.setHeader('Access-Control-Allow-Origin', req.header('origin') ||
        req.header('x-forwarded-host') || req.header('referer') || req.header('host'));
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var port = 4000;
// Launch socket server
ss.socketServer(app.listen(port));

app.get("/", function (req, res) {
    res.send("Socket server is up");
});
var express = require("express");
var socket = require("socket.io-client");
// global variable
var app = express();
var port = 3710;
var io = socket.connect("http://localhost:3700");
io.on("connect", function (data) {
    console.log("My id : " + io.id);
    console.log("Socket connection success !");

    io.on("newMessage", function (data) {
        console.log("new message");
        io.disconnect();
    });
    io.emit("register", {
        token: "TOKEN CLIENT"
    });
});
app.get('/client', function (req, res) {

    res.send('<h1>Currently testing....</h1><p><b>You are client </b></p>');
})

app.listen(port);
console.log("Client run");
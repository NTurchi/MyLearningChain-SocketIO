var express = require("express");
var socket = require("socket.io-client");
// global variable
var app = express();
var port = 3710;
var io = socket.connect("http://51.136.10.20:4000");
//var io = socket.connect("http://localhost:4000");

io.on("connect", function (data) {
    console.log("My id : " + io.id);
    console.log("Socket connection success !");



    io.on("newMessage", function (data) {
        console.log("new message");
        io.disconnect();
    });
    // sendMessage
    console.log("send message")

    // test newMessage message
    io.emit("newMessage", {
        assistance: "Le pack epsi, un mal pour un bien ?",
        project: "Workshop B3",
        message: "Pensez-vous qu'il est possible de manger du poisson", // optionnel pour l'instant
        senderName: "Nicolas Turchi",
        userIds: ['rstudent']
    });

    // test needAssistance message
    io.emit("needAssistance", {
        projectName: "Workshop B3",
        teamName: "The Slaves",
        intervenant: "rstudent"
    });

    io.emit("kk", {
        message: "JACQUIE"
    });
});
app.get('/client', function (req, res) {

    res.send('<h1>Currently testing....</h1><p><b>You are client </b></p>');
})

app.listen(port);
console.log("Client run");
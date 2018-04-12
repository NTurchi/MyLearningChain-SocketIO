// Require module
var socketio = require('socket.io')({
    origins: '*:*'
});
var lcReq = require("./learningChainRequest");
var socketStorage = require("./socketStorage").socketStorage();
var logger = require("../utils/logger").logger;
var config = require("../config/config").config;

var socketServer = function (app) {
    // intialiaze app
    var io = socketio.listen(app);

    // Socket io server connection entrypoint
    io.sockets.on('connection', function (client) {
        logger.debug("Client connected : " + client.id);

        // when client register to notification and real time features
        client.on('register', function (data) {
            try {
                lcReq.verifyToken(data.token).then(function (res) {
                    // register client for notification
                    socketStorage.set.client(res.id.id, client.id);
                    logger.debug(`Registered clients : ${socketStorage.get.connectedClients()}`);
                });
                client.emit("good", "message");
            } catch (e) {
                logError("register", e.message);
            }
        });
        // When user are disconnected from the socket server
        client.on('disconnect', function (reason) {
            logger.debug(`Client [${client.id}] disconnect because [${reason}]`);
            socketStorage.set.removeClient(client.id);
        });

        /**
         * Data should be : 
         * {
         *      "assistance": "Nom intervention",
         *      "project": "project name",
         *      "creationDate": "",
         *      
         *      "message": "Message content tchat"
         *      "senderName": "Sender username",
         *      "senderId": senderId,
         *      "userIds": []
         * }
         */
        client.on('newMessage', function (data) {
            try {
                logger.debug(`New message from client [${client.id}] in intervention ${data.assistance}`);
                data.userIds.forEach(idUser => {
                    socketStorage.get.client(idUser).forEach((socketId) => {
                        sendToClient(socketId, "newMessage", data);
                    });
                });
            } catch (e) {
                logError("newMessage", e.message);
            }
        });

        /**
         * When group ask for an intervention
         * data should be : {
         *     Intervenant: 10, // OR Username
         *     projectName: "projectName",
         *     teamName: "teamName"
         * }
         */
        client.on('needAssistance', function (data) {
            try {
                logger.debug(`Team [${data.teamName}] asks for assistance to [${data.intervenant}] for project [${data.projectName}]`);
                socketStorage.get.client(data.intervenant).forEach((socketId) => {
                    sendToClient(socketId, "needAssistance", data);
                });
            } catch (e) {
                logError("needAssistance", e.message);
            }
        });
    });


    /////// FUNCTION SECTION //////

    // socket configuration for send message to a specific client
    var namespace = null;
    var ns = io.of(namespace || "/");


    function sendToClient(clientId, message, data) {
        try {
            let socket = ns.connected[clientId] // assuming you have  id of the socket
            if (socket) {
                logger.debug(`Send socket message [${message}] to client [${clientId}] with body data [${JSON.stringify(data)}]`);
                socket.emit(message, data);
            } else {
                logger.debug(`Client ${clientId} not connected`);
                socketStorage.set.removeClient(client.id);
            }
        } catch (e) {
            logger.error(`Error when trying to send a message to specific client : ${e.message}`);
        }
    }

    function logError(context, msg) {
        logger.error(`[${context}] Error: ${msg}`);
    }
}

module.exports.socketServer = socketServer;
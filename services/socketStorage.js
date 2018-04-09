var logger = require("../utils/logger").logger;
/**
 * 
 * 
 * @returns Encapsulated properties 
 */
module.exports.socketStorage = function () {
    var socketClients = {};
    /**
     * Example : rooms = {
     *      "room1" = ["idUser1", "idUser2"],
     *      "room2" = ["idUser3", "idUser1", "idUser5"]
     * }
     */
    var rooms = {};
    var get = {};
    var set = {};

    /**
     * To get socket client
     * 
     * @param {string} id App user identifier 
     */
    get.client = function (id) {
        try {
            return socketClients[id] ? socketClients[id] : [];
        } catch (e) {
            logger.error(`Error when retrieve client : ${id} | Error : ${e.message}`);
            return [];
        }
    }

    /**
     * retrieve room information thanks to id tchat 
     * 
     * @param {string} idChat id chat
     */
    get.roomInformations = function (idChat) {
        try {
            return rooms[idChat] ? rooms[idChat] : [];
        } catch (e) {
            logger.error(`Error trying to retrieve room informations by id chat [${roomId}] | ${e.message}`);
        }
    }

    /**
     * Get room ids for a user 
     * 
     * @param {string} userId 
     */
    get.userRooms = function (userId) {
        try {
            var roomIds = [];
            Object.keys(rooms).forEach(function (key) {
                if (rooms[key].indexOf(userId)) {
                    roomIds.push(rooms[key].roomId);
                }
                return roomIds;
            });
        } catch (e) {
            logger.error(`Error find room thanks to user id [${userId}] : ${e.message}`);
        }
    }

    /**
     * Retrieve array of socket ids 
     * @param {array} ids array of app user id 
     */
    get.clients = function (ids) {
        try {
            var result = [];
            ids.forEach(function (id) {
                var tmpRes = get.client(id);
                tmpRes.forEach(function (element) {
                    result.push(elements);
                })
            });
            return result;
        } catch (e) {
            logger.error(`Error when retrieve multiple clients : ${JSON.stringfify(ids)} | Error : ${e.message}`);
            return result;
        }
    }

    /**
     * Register user for real time notification 
     * 
     * @param {string} id unique identifier from angularjs app
     * @param {string} socketId client socket id  
     */
    set.client = function (id, socketId) {
        try {
            if (socketClients[id]) {
                socketClients[id].push(socketId);
            } else {
                socketClients[id] = [socketId];
            }
            logger.debug(`[Register] User : ${id} with socket Id : ${socketId}`);
        } catch (e) {
            logger.error(`Error when saving client : ${id} | Error : ${e.message}`);
        }
    }

    /**
     * Remove registered client
     * @param {string} socketId 
     */
    set.removeClient = function (socketId) {
        try {
            Object.keys(socketClients).forEach(function (key) {
                var index = socketClients[key].indexOf;
                if (index) {
                    logger.debug(`Remove registered client ${socketId}`);
                    var arrayWithoutSocketId = socketClients[key].filter(function (e) {
                        return e !== socketId
                    });
                    if (arrayWithoutSocketId.length === 0) {
                        logger.debug(`No more socket client is connected with id ${key}. Removing...`);
                        delete socketClients[key];
                    }
                    return;
                } else {
                    logger.warning(`Client ${socketId} not registered`);
                }
            });
        } catch (e) {
            logger.error(`Error when remove client ${socketId} : ${e.message}`);
        }
    }

    /**
     * How many user is register to notification service
     */
    get.connectedClients = function () {
        var count = 0;
        Object.keys(socketClients).forEach(function (key) {
            count += socketClients[key].length;
        });
        return count;
    }

    return {
        "get": get,
        "set": set
    }
}
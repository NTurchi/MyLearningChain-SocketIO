/**
 * 
 * @param {string} id userId 
 * @param {messageEnum} messageEn enumeration message
 */
module.exports.makePayload = function (id, messageEn) {
    return {
        userId: id,
        message: messageEn
    }
}
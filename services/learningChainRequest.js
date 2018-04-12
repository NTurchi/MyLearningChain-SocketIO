var rp = require("request-promise");
var logger = require("../utils/logger").logger;
var config = require("../config/config").config;

var doRequest = function (method, endPoint, data = undefined, contentType = undefined, additionnalHeaders = undefined) {

    var options = {
        uri: `${config.uriBase}${endPoint}`,
        method: method,
        simple: false,
        resolveWithFullResponse: true,
        headers: {}
    }
    if (contentType) options.headers["content-type"] = contentType;
    if (data) options.body = JSON.stringify(data);
    if (additionnalHeaders) {
        Object.keys(additionnalHeaders).forEach(function (key) {
            options.headers[key] = additionnalHeaders[key];
        });
    };

    logger.debug(`Request ${options.method} to : ${options.uri}`);
    if (data) logger.debug(`Body data : ${JSON.stringify(options.body)}`);
    return rp(options);
}

/**
 * Token api verification
 * @param {string} token token from api 
 */
module.exports.verifyToken = function (token) {
    try {
        return doRequest(config.apiRoutes.auth.verifyToken.method, config.apiRoutes.auth.verifyToken.uri, {
                "access_token": token
            }, config.apiRoutes.auth.verifyToken.contentType, {
                "Authorize": "Bearer " + token
            })
            .then(function (response) {
                if (response.statusCode === 200) {
                    return Promise.resolve({
                        id: JSON.parse(response.body).user
                    });
                } else {
                    logger.error(`Verify token : bad token => ${token}`);
                    return Promise.reject();
                }
            })
            .catch(function (error) {
                logger.error(`Error on token verification : request to api failed : ${error}`);
                return Promise.reject();
            });
    } catch (e) {
        logger.error(`Verify token error : ${e.message}`);
    }
}

module.exports.doRequest = doRequest;
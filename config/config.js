module.exports.config = {
    uriBase: "http://mlcback.westeurope.cloudapp.azure.com/",
    apiRoutes: {
        auth: {
            verifyToken: {
                uri: "auth/api/auth/verify_token",
                method: "POST",
                contentType: "application/json"
            }
        }
    }
}
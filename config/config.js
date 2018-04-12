module.exports.config = {
    uriBase: "http://51.136.10.20/mylearningback/",
    apiRoutes: {
        auth: {
            verifyToken: {
                uri: "pub/auth/verify_token",
                method: "POST",
                contentType: "application/json"
            }
        }
    }
}
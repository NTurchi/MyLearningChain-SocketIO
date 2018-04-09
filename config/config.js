module.exports.config = {
    apiRoutes: {
        auth: {
            verifyToken: {
                uri: "auth/verify_token",
                method: "POST",
                contentType: "application/json"
            }
        }
    }
}
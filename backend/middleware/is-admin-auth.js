const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    console.log("Auth Header:", authHeader); // Debug log
    
    if(!authHeader){
        const error = new Error('Not Autheticated(Not Allowed)');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];
    console.log("Token:", token && token.substring(0, 20) + "..."); // Debug log (first 20 chars)
    
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.ADMIN_JWT_TOKEN_SECRET_MESSAGE);
        console.log("Decoded Token:", decodedToken); // Debug log
    } catch (error) {
        console.error("Token verification error:", error.message); // Debug log
        error.statusCode = 500;
        throw error;
    }

    if(!decodedToken){
        const error = new Error('Not Autheticated');
        error.statusCode = 401;
        throw error;
    }
    
    req.userId = decodedToken.userId;
    next();
}
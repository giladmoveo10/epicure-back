const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No Token, authorization denied" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token has Expired" });
            } else {
                return res.status(403).json({ message: "Token is not valid" });
            }
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;

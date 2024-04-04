const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    // If token doesnt exist
    if (!token) {
        return res.status(401).json({ message: "No token" });
    }

    try {
        // Token exists and is verified
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch(err) {
        // if token is invalid or expired
        return res.status(401).json({ message: "Invalid token." });
    }
}

module.exports = isAuth;
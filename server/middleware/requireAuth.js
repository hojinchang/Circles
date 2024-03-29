const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        console.log("REDIRECTING!")
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();

    } catch(err) {
        // if token is invalid or expired
        console.log("ERROR")
        return res.redirect("/login");
    }
}

module.exports =  requireAuth;
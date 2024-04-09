const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const path = require("path");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;


// Username / Password local strategy authentication
passport.use(
    "local",
    new LocalStrategy(async(username, password, done) => {
        try {
            const user = await User.findOne({ email: username });

            if (!user) {
                return done(null, false, { message: "Email doesn't exist in our system"});
            }

            // Compare hashed passwords
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);

        } catch(err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch(err) {
        done(err);
    }
});

exports.sign_up_post = [
    body("firstName")
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage("First Name must be between 1 and 20 characters")
        .escape(),
    body("lastName")
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage("Last Name must be between 1 and 20 characters")
        .escape(),
    body("email")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Email is required")
        .isLength({ max: 100 })
        .withMessage("Email cannot exceed 100 characters")
        .isEmail()
        .withMessage("Invalide email format")
        .normalizeEmail()
        .escape(),
    body("password")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Password is required")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .withMessage("Password must be at least 8 characters long and contains at least one lowercase letter, one uppercase letter, and one digit")
        .escape(),
    body("passwordConfirm")
        .trim()
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error("Passwords don't match")
            }
            return true;
        })
        .escape(),

    async(req, res, next) => {
        try {
            // Check for form errors
            const errors = validationResult(req);
            // if there are errors, redirect to sign up page
            if (!errors.isEmpty()) {
                // Send a 400 bad request status code
                return res.status(400).json({ errors: errors.array() });
            }

            // Check if the user already exists
            const registeredUser = await User.findOne({ email: req.body.email }).exec();
            if (registeredUser) {
                return res.status(400).json({
                    errors: [{msg: "Email already exists"}]
                });
            }

            let profilePictureUrl = null;
            if (req.file) {
                // Convert the file into base64 encoding to ensure data remains intact during transport
                const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, { folder: 'profile-pictures' });
                profilePictureUrl = result.secure_url;
            } else {
                // Use default image
                const defaultProfilePicturePath = path.join(__dirname, '../assets/images/default-profile-picture.png');
                const result = await cloudinary.uploader.upload(defaultProfilePicturePath, { folder: 'profile-pictures' });
                profilePictureUrl = result.secure_url;
            }

            bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
                if (err) {
                    return next(err);
                }

                const user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashedPassword,
                    profilePicture: profilePictureUrl
                });

                await user.save();
                // Send a 201 Created, request fulfilled and has resulted in a new resource being created
                return res.status(201).json({ success: true });
            });
        } catch (err) {
            return next(err);
        }
    }
];

// Username / Password login authentication
exports.login_post = [
    body("username")
        .trim()
        .isEmail()
        .withMessage("Invalide email format")
        .isLength({ min: 1 })
        .withMessage("Email field must not be empty")
        .normalizeEmail()
        .escape(),
    body("password")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Password field must not be empty")
        .escape(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Send a 400 bad request status code
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    },

    // Send a custom response depending of if the user is authenticated or not
    (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            // User not authenticated
            if (!user) {
                return res.status(401).json({ message: info.message })   // Send the error message from local strategy
            }
            
            // User is authenticated so log them in
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                const token = jwt.sign({ user: user }, process.env.JWT_SECRET);
                
                // Set the JWT token in an HTTP-only cookie
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,   // 24 hours 
                    // maxAge: 60 * 60 * 1000,
                    path: "/"   // Set the cookie to be accessible from all paths
                });

                return res.status(200).json({ success: true, user: user.id });
            });
        })(req, res, next);
    }
];

// Demo login authentication
exports.demo_login_post = asyncHandler(async(req, res, next) => {
    const user = await User.findOne({ email: process.env.DEMO_USERNAME });
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET);

    // Set the JWT token in an HTTP-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,   // 24 hours 
        // maxAge: 1000 * 60,
        path: "/"   // Set the cookie to be accessible from all paths
    });
    
    return res.status(200).json({ success: true, user: user.id });
});

// Logout passport session and clear the JWT
exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: "An error occurred during logout." });;

        res.clearCookie("jwt", { httponly: true });
        return res.status(200).json({ message: "Successfully logged out!" });
    });
};

// Get the authenticated user
exports.get_user = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id);

    (user)
        ? res.status(200).json(user)
        : res.status(404).json({ message: "User not found" });
});

// Get the specific user
exports.get_specific_user = asyncHandler(async(req, res, next) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    (user)
        ? res.status(200).json(user)
        : res.status(404).json({ message: "User not found" });
});
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

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
                const formData = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                }

                // Send a 400 bad request status code
                return res.status(400).json({
                    errors: errors.array(),
                    formData: formData
                });
            }

            const registeredUser = await User.findOne({ email: req.body.email }).exec();
            if (registeredUser) {
                return res.status(400).json({
                    errors: [{msg: "Email already exists"}]
                });
            }

            bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
                if (err) {
                    return next(err);
                }

                const user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashedPassword
                });

                await user.save();
                // Send a 200 OK status code
                return res.status(200).json({ success: true });
            });
        } catch (err) {
            return next(err);
        }
    }
]
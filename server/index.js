const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// Router
const indexRouter = require("./routers/indexRouter");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");

// Load environment variables
require("dotenv").config();

const app = express();

// connect to MongoDB databse with mongoose
const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

app.use(session({
  secret: "happy",
  resave: false, 
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/isAuth", authRouter);

app.listen(5000, () => {
    console.log("Sever started on port 5000");
});
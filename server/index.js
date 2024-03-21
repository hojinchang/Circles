const express = require("express");
const cors = require("cors");
const path = require("path");

// Router
const indexRouter = require("./router/indexRouter");
const userRouter = require("./router/userRouter");

// Load environment variables
require("dotenv").config();

const app = express();

// connect to MongoDB databse with mongoose
const mongoose = require("mongoose");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/user", userRouter);

app.get("/v1", (req, res, next) => {
    res.json( {users: ["userOne", "userTwo", "userThree"]} );
});


app.listen(5000, () => {
    console.log("Sever started on port 5000");
});
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/v1", (req, res, next) => {
    res.json( {users: ["userOne", "userTwo", "userThree"]} );
});


app.listen(5000, () => {
    console.log("Sever started on port 5000");
});
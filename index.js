const express = require("express");
// const mongoose = require('mongoose');
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
const port = 3001;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

const express = require("express");
const { connect } = require("./database");
const app = express();
const chefsRouter = require("./routes/chefs");
const dishesRouter = require("./routes/dishes");
const restaurantsRouter = require("./routes/restaurants");
require("dotenv").config();

app.use("/restaurants", restaurantsRouter);

const PORT = process.env.PORT || 3001;

connect();

app.use(express.json()); // same as bodyParser.json()

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/:idd", (req, res) => {
    res.send(`Got a get request with id ${req.params.idd}`);
});

app.use("/api/chefs", chefsRouter);
app.use("/api/dishes", dishesRouter);
app.use("/api/restaurants", restaurantsRouter);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

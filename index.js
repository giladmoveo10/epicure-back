const express = require("express");
const { connect } = require("./database");
const chefsRouter = require("./routes/chefs");
const dishesRouter = require("./routes/dishes");
const restaurantsRouter = require("./routes/restaurants");
const featuredChefRouter = require("./routes/featuredChefRoute");
const usersRouter = require("./routes/users");
const tagsRouter = require("./routes/tags");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();
connect();

app.use(express.json()); // same as bodyParser.json()
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/chefs", chefsRouter);
app.use("/api/dishes", dishesRouter);
app.use("/api/restaurants", restaurantsRouter);
app.use("/api/featuredChef", featuredChefRouter);
app.use("/api/users", usersRouter);
app.use("/api/tags", tagsRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

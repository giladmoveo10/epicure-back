const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

const uri =
    "mongodb+srv://giladk:randompass301@cluster0.leqos7v.mongodb.net/epicure?retryWrites=true&w=majority";
// const uri =
//     "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority";

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// let _db;

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB using mongoose");
        // _db = client.db();
    } catch (err) {
        console.error("DB connection error:", err);
    } finally {
        // ? close the client?
        // await client.close();
    }
}

// const getDb = () => {
//     if (_db) return _db;
//     throw "no DB Found!";
// };
// create a connection using mongoose

module.exports = { connect };

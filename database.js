const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://giladk:randompass301@cluster0.leqos7v.mongodb.net/?retryWrites=true&w=majority";
// const uri =
//     "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("DB connection error:", err);
    }
}

module.exports = { connect };

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");


const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qljfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("visualize");
    const allData = database.collection("testData");
    console.log("Connected")
   

    

    app.get("/alldata", async (req, res) => {
      const query = {};
      

      const cursor = allData.find(query);
      // since this method returns the matched document, not a cursor, print it directly
      const result = await cursor.toArray();
      res.send(result);
    });

  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello the server is runnig");
});

app.listen(port, () => {
  console.log("The server is running on port", port);
});
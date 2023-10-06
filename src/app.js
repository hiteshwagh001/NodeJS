const express = require("express");
const MensRanking = require("./models/mens");
const app = express();
require("../src/db/conn");
require("../src/models/mens");
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Connection successful");
});

app.post("/mens", async (req, res) => {
  try {
    const addingMenRecords = new MensRanking(req.body);
    console.log(req.body);
    const insertMen = await addingMenRecords.save();
    res.status(201).send(insertMen);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.post("/mens/batch", async (req, res) => {
  try {
    const records = req.body; // An array of records

    // Use the insertMany method to add all records to the collection
    const addedRecords = await MensRanking.insertMany(records);

    res.status(201).send(addedRecords);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/mens", async (req, res) => {
  try {
    const getMens = await MensRanking.find({}).sort({ ranking: 1 });
    res.send(getMens);
  } catch (e) {
    res.send(e);
  }
});
app.get("/mens/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getMen = await MensRanking.findById(_id);

    if (!getMen) {
      return res.status(404).send("Record not found");
    }

    res.send(getMen);
  } catch (e) {
    res.status(500).send(e);
  }
});
app.patch("/mens/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateMan = await MensRanking.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!updateMan) {
      return res.status(404).send("Record not found");
    }

    res.send(updateMan);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.delete("/mens/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteMan = await MensRanking.findByIdAndDelete(_id);

    if (!deleteMan) {
      return res.status(404).send("Record not found");
    }

    res.send(deleteMan);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const express = require("express");
const Connection = require("../helpers/database/connection");
const dbMap = require("../helpers/database/db-map");
const router = express.Router();

const connectionFunction = () => Connection.db.collection(dbMap.books);
router.get("/", async (req, res) => {
  await connectionFunction()
    .find()
    .toArray()
    .then((result) => res.json(result))
    .catch((err) => console.error(err.message));
});

router.post("/", async (req, res) => {
  const data = req.body;
  await connectionFunction()
    .insertOne({
      ...data,
    })
    .then(() => res.json(`${data.author} has been created successfully!`))
    .catch((error) => {
      Connection.logError(error);
      res.status(500).json("Some error has occured on server");
    });
});

module.exports = router;

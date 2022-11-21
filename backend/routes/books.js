const express = require("express");
const Connection = require("../helpers/database/connection");
const dbMap = require("../helpers/database/db-map");
const router = express.Router();
const { matchedData } = require("express-validator");
const {
  objectIdValidationRules,
  validationMiddleware,
} = require("../helpers/database/validators");
let x = 1;
const connectionFunction = () => Connection.db.collection(dbMap.books);
router.get("/", async (req, res) => {
  await connectionFunction()
    .find()
    .toArray()
    .then((result) => res.json(x ? result : []))
    .catch((err) => console.error(err.message));
});

router.post("/", async (req, res) => {
  const data = req.body;
  await connectionFunction()
    .insertOne({
      ...data,
    })
    .then(() =>
      res
        .status(200)
        .json(`${data.author} ${data.title} has been created successfully!`)
    )
    .catch((error) => {
      Connection.logError(error);
      res.status(500).json("Some error has occured on server");
    });
});
router.delete(
  "/:id",
  objectIdValidationRules(),
  validationMiddleware,
  async (req, res) => {
    const { id: _id } = matchedData(req);
    await connectionFunction()
      .findOneAndDelete({ _id })
      .then((result) => {
        let { author, title } = result.value;
        res.status(200).json(`${author} ${title} has been deleted!`);
      })
      .catch((error) => {
        Connection.logError(error);
        res.status(500).json("Some error has occured on server");
      });
  }
);

module.exports = router;

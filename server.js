const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const Connection = require("./helpers/database/connection");
const dbMap = require("./helpers/database/db-map");
const app = express();
const PORT = process.env.PORT || 5000;
const booksRouter = require("./routes/books");
(async () => {
  await Connection.dbInit;
  await Connection.db
    .createCollection(dbMap.books)
    .then(() => console.log(`Table ${dbMap.books} has been created`))
    .catch((err) => console.error(err.message));
})();

app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/books", booksRouter);

app.listen(PORT, () => console.log(`Server run on ${PORT}!`));

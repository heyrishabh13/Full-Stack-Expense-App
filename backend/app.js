const express = require("express");
const db = require("./utils/db-connection");

const app = express();

db.sync({ force: true })
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server is running...`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

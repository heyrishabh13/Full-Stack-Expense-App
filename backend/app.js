const express = require("express");
const db = require("./utils/db-connection");
const expenseRoutes = require("./routes/expenseRoute");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/expense", expenseRoutes);

db.sync({ force: true })
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server is running...`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

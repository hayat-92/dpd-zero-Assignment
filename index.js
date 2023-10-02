const express = require("express");
const sequelize = require("./config/db");
const app = express();
const port = 3000;
const authRoute = require("./route/authRoute");
const dataRoute = require("./route/dataRoute");
const bodyParser = require("body-parser");

// Sync the model with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database and tables are synchronized.");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

app.use(bodyParser.json());

app.use("/auth", authRoute);
app.use("/data", dataRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

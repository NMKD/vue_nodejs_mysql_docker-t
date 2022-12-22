const express = require("express");
const path = require("path");
const sequelize = require("./models/database");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/todo", require("./routes/todo"));

app.use((req, res, next) => {
  res.sendFile("./public/index.html");
});

async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT || 3000, () => {
      console.log("Server start in port:" + PORT);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let cache = {};

app.use("/", require("./routes/index"));

app.get("*", function (req, res) {
  res.render("error", { superhero: null, error: null });
});

app.listen(port, () =>
  console.log(`Server running in port ${port}`)
);

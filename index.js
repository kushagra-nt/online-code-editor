const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const executeCode = require("./execute");

const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views/public/"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    output: "",
    code: "",
    language: "c",
    input: "",
  });
});

app.post("/", async (req, res) => {
  const code = req.body.code;
  const language = req.body.language;
  const input = req.body.input;

  const output = await executeCode({
    code: code,
    language: language,
    input: input,
  });

  res.render("index", {
    output: output,
    code: code,
    language: language,
    input: input,
  });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

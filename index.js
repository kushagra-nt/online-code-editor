const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const axios = require("axios");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views/public/"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var output = "";

const executeCode = (code, language, input) => {
  var data = JSON.stringify({
    code: code,
    language: language,
    input: input,
  });

  var config = {
    method: "post",
    url: "https://codexweb.netlify.app/.netlify/functions/enforceCode",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((response) => {
      output = response.data.output;
    })
    .catch((error) => {
      console.log(error);
      output = "Some error occured :(";
    });
};

app.get("/", (req, res) => {
  res.render("index", {
    output: "",
    code: "",
    language: "c",
    input: "",
  });
});

app.post("/", (req, res) => {
  const code = req.body.code;
  const language = req.body.language;
  const input = req.body.input;

  executeCode(code, language, input);

  setTimeout(() => {
    res.render("index", {
      output: output,
      code: code,
      language: language,
      input: input,
    });
  }, 2000);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

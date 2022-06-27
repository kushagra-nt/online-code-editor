const axios = require("axios");

const Execute = async ({ code, language, input }) => {
  let output = "";
  try {
    output = await axios
      .post("https://api.jdoodle.com/v1/execute", {
        script: code,
        language: language,
        stdin: input,
        versionIndex: "0",
        clientId: "d5a502c805f8fc86f8378ce5a6237fb8",
        clientSecret:
          "32e3abc5c84a32d1aca30bba2cc963b78a3b8ac93f8831158323c8d673b50804",
      })
      .then((res) => res.data.output);
  } catch (e) {
    output = "couldn't execute code at moment :(";
    console.log(e);
  }
  return output;
};

module.exports = Execute;

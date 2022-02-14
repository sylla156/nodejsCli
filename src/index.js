const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const existingConfig = fs.existsSync("now.json");

function buildConfig() {
  inquirer
    .prompt([
      {
        type: "text",
        name: "name",
        message: "what is the name of the project? ",
        default: path.basename(process.cwd()),
      },
      {
        type: "list",
        name: "type",
        message: "whate the type of the project",
        choices: [
          "static",
          "react",
          "node_express",
          "vue",
          "static-build",
          "lambda",
        ]
        
      },
    ])
    .then((answers) => {
      console.log(answers);
    });
}

if (existingConfig) {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "overwrite",
        message: "your file now.js is read ",
        default: true,
      },
    ])
    .then((answers) => {
      if (answers.overwrite) {
        buildConfig();
      } else {
        console.log("good bye😁");
      }
    });
} else {
  buildConfig();
}

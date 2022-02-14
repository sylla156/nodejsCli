const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const nodeExpress = require("./configs/nodeExpress");
const existingConfig = fs.existsSync("now.json");

let config = {
  version: 2
};

async function buildConfig() {
  const answers = await inquirer.prompt([
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
      ],
    },
  ]);
  config.name = answers.name;

  switch (answers.type) {
    case "node_express":
      config = await nodeExpress(config);
      console.log(config);
      break;

    default:
      break;
  }
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

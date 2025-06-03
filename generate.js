#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const readline = require("readline-sync");
const re = (qst) => readline.question(qst);
/**
 * Merge all JSON files in the features folder with the base Swagger file
 * @param {Object} options - The options object containing base and folder paths.
 * @returns {Object} The merged JSON object.
 */
async function merge({ base, folder }) {
  const isBaseFileExists = fs.existsSync(base);

  if (!isBaseFileExists) {
    fs.mkdirSync(path.dirname(base), { recursive: true });
    const baseSwagger = {
      openapi: "3.0.0",
      info: {
        title: "My API",
        version: "1.0.0",
        description: "This is the base Swagger file for the API documentation.",
        date: new Date().toISOString(),
      },
      servers: [
        {
          url: "http://localhost:5000/api",
          description: "Local development server",
        },
      ],
      paths: {},
    };

    fs.writeFileSync(base, JSON.stringify(baseSwagger, null, 2));
  }

  //check if baseSwagger file have a date or not
  const baseSwagger = JSON.parse(fs.readFileSync(base, "utf8"));
  if (!baseSwagger.info.date) {
    baseSwagger.info.date = new Date().toISOString();
    fs.writeFileSync(base, JSON.stringify(baseSwagger, null, 2));
    console.log(
      "Date added to baseSwagger file successfully. pls add your data to it"
    );
  }

  const baseContent = JSON.parse(fs.readFileSync(base, "utf8"));

  // Ensure the features folder exists
  function ensureFileExists(folder) {
    while (true) {
      const filesCount = fs.readdirSync(folder).length;

      if (filesCount > 0) {
        break;
      }
      const answer = re(
        "Please add your features in the features folder then type 'yes' to continue: "
      );

      if (answer.trim().toLowerCase() !== "yes") {
        console.log(
          "Please add your features in the features folder then run the script again."
        );
        process.exit(1);
      }
    }
  }

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  ensureFileExists(folder);

  if (fs.readdirSync(folder).length === 0) {
    const answer = re(
      "Please add your features in the features folder then type 'yes' to continue: "
    );

    if (answer.trim().toLowerCase() !== "yes") {
      console.log(
        "Please add your features in the features folder then run the script again."
      );
      process.exit(1);
    }
  }

  // Read all .json files from the features folder
  const files = fs.readdirSync(folder).filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const featurePath = path.join(folder, file);
    const featureContent = JSON.parse(fs.readFileSync(featurePath, "utf8"));

    // Merge each feature's paths into the base Swagger paths
    baseContent.paths = {
      ...baseContent.paths,
      ...featureContent,
    };
  }

  return baseContent;
}

/**
 * Convert a JSON object to YAML format
 * @param {Object} json - The JSON object to convert.
 * @returns {string} YAML string.
 */
function toYAML(json) {
  if (!fs.existsSync("./dist")) {
    re("please install swagger library first");
    process.exit(1);
  }
  return yaml.dump(json);
}

// Export functions for library usage
module.exports = {
  merge,
  toYAML,
};

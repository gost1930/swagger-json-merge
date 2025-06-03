# swagger-json-merge

A simple Node.js tool to merge multiple Swagger JSON feature files into a single Swagger YAML file.

---

## Features

- Merge multiple JSON files inside a `features` folder into a base Swagger JSON.
- Convert the merged Swagger JSON into a YAML file.
- Interactive prompt if the `features` folder is empty, asking user to add files before proceeding.
- Supports modular Swagger API specification development.

---

## Installation

You can install the library via npm:

```bash
npm install swagger-json-merge
```

# Usage

create a file in the root dir , and name it merge.js

then copy this code and past it on the merge file

```bash
const { merge, toYAML } = require('swagger-json-merge');
const fs = require('fs');

async function generateSwagger() {
  const merged = await merge({
    base: './templates/baseSwagger.json',
    folder: './features',
  });

  const yamlOutput = toYAML(merged);

  fs.writeFileSync('./dist/swagger.yaml', yamlOutput);
  console.log('Swagger YAML generated successfully.');
}

generateSwagger();

```

## Create your structure:

```bash
project/
├── features/               # Your Swagger partial JSON files (e.g. users.json, products.json)
├── templates/
│   └── baseSwagger.json    # Your main base Swagger JSON (info, servers, etc.)
├── dist/                 # You should install swagger to get this folder
└── merge.js
```


## Add Swagger JSON files to features/

Each file in features/ should contain a valid Swagger paths object, for example:

```bash
{
  "/users": {
    "get": {
      "summary": "Get users",
      "responses": {
        "200": {
          "description": "List of users"
        }
      }
    }
  }
}
```

if you don't add the base folder and feauter folder , it will be created by self.

then run your merge file to see the res

```bash
node merge.js
```



# Package Info

Dependencies: js-yaml, readline-sync

# Notice
please check this repo https://gist.github.com/lenage/08964335de9064540c8c335fb849c5da to know how to write your json swagger

# Author

gost1930

# License

ISC © 2025
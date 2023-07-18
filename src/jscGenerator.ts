import path from "path";
import fs from "fs";

import * as TJS from "typescript-json-schema";

interface IGenerator {
  generator: TJS.JsonSchemaGenerator;
  file: string[];
}

const BASE_PATH = path.resolve(path.join(__dirname));
const settings: TJS.PartialArgs = {
  required: true,
};
const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
};

function getAllFiles(dirPath: string, arrayOfFiles: string[]) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const getFiles = () => {
  return getAllFiles(path.resolve(BASE_PATH, "../__apiTypesTemp__"), []);
};

const makeGenerator = (file: string[]): IGenerator => {
  const program = TJS.getProgramFromFiles(file, compilerOptions, BASE_PATH);
  const generator = TJS.buildGenerator(program, settings);
  return { generator: generator as TJS.JsonSchemaGenerator, file };
};

const makeSymbols = ({ generator, file }: IGenerator) => {
  const removePrefix = file.map((f) => f.replace("STD.ts", ".ts"));
  const filesStr = removePrefix.join(", ");
  const symbols = generator.getUserSymbols();

  const schemas = symbols.filter((symbol) => !!filesStr.match(symbol));

  const schemaFolderPath = path.join(__dirname, "../__schema__");
  if (!fs.existsSync(schemaFolderPath)) {
    fs.mkdirSync(schemaFolderPath);
  }

  console.log("schema file transform start");
  schemas.forEach((schema) => {
    const schemaFile = path.join(schemaFolderPath, `${schema}Schema.json`);
    const schemaJson = generator.getSchemaForSymbol(schema);

    fs.writeFileSync(schemaFile, JSON.stringify(schemaJson, null, 2));
  });

  console.log("schema file transform end");
};

makeSymbols(makeGenerator(getFiles()));

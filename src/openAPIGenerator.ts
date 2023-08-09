import * as path from "path";
import { generate, HttpClient } from "openapi-typescript-codegen";

const specURL = "https://petstore.swagger.io/v2/swagger.json";
// const specURL = "http://localhost:5300/doc-json";
const outputDir = path.resolve(path.join(__dirname, "../__apiTypes__"));

async function swaggerModelGenerate() {
  try {
    await generate({
      input: specURL,
      output: outputDir,
      httpClient: HttpClient.AXIOS,
      exportCore: false,
      exportServices: false,
      exportModels: true,
      useOptions: true,
      useUnionTypes: true,
      exportSchemas: true,
    });
  } catch (error) {
    console.error(error);
  }
}

swaggerModelGenerate().then(() => {
  console.log("success");
});

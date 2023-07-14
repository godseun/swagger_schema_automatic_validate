import Ajv from "ajv";
import fs from "fs";
import { Pet } from "../__apiTypesTemp__";

const petSchema = fs.readFileSync("./__schema__/UserSchema.json", "utf8");

const ajv = new Ajv();
const validate = ajv.compile<Pet>(JSON.parse(petSchema));

fetch("https://petstore.swagger.io/v2/pet/1")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const valid = validate(data);
    if (valid) {
      console.log("Valid!");
    } else {
      console.log("Invalid: " + ajv.errorsText(validate.errors));
    }
  });

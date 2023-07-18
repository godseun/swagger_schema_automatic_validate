import Ajv, { JSONSchemaType } from "ajv";

export const validate = (JSC: string, data: object) => {
  const ajv = new Ajv({ allErrors: true });

  const result = ajv.validate(JSC, data);
  if (result) {
    return {
      errorText: "",
      valid: true,
    };
  }

  return {
    errorText: JSON.stringify(ajv.errors),
    valid: false,
  };
};

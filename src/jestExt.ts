import { validate } from "./validate";

export const extendJSCMatcher = (): void => {
  expect.extend({
    toMatchJSC(JSC: string, data: any) {
      const schemaValid = validate(JSC, data);
      const pass = schemaValid.valid;
      const errorText = schemaValid.errorText;

      if (pass) {
        return {
          pass,
          message: () => `expected ${JSON.stringify(data)} to not match ${JSC}`,
        };
      }

      return {
        pass,
        message: () =>
          `expected ${JSON.stringify(data)} to  match ${JSC}, but ${errorText}`,
      };
    },
  });
};

import { extendJSCMatcher } from "../src/jestExt";
import petSchema from "../__schema__/PetSchema.json";
import apiResponseSchema from "../__schema__/ApiResponseSchema.json";

import type { Pet, ApiResponse } from "../__apiTypesTemp__";

extendJSCMatcher();

async function fetchPetId(petId: number): Promise<Pet | ApiResponse> {
  return await fetch(`https://petstore.swagger.io/v2/pet/${petId}`).then(
    (res) => res.json()
  );
}

describe("Pet api Pet Group", () => {
  describe("pet/{petId} api", () => {
    it("정상 처리(200)", async () => {
      const data = await fetchPetId(2);

      // @ts-ignore
      expect(petSchema).toMatchJSC(data);
    });
    it("실패 처리(400)", async () => {
      const data = await fetchPetId(-1);

      // @ts-ignore
      expect(apiResponseSchema).toMatchJSC(data);
    });
  });
});

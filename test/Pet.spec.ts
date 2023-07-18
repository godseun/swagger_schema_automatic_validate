import { extendJSCMatcher } from "../src/jestExt";
import petSchema from "../__schema__/PetSchema.json";

extendJSCMatcher();

// const PET_ID = 1;
function fetchPetId(petId: number) {
  return fetch(`https://petstore.swagger.io/v2/pet/${petId}`).then((res) =>
    res.json()
  );
}

describe("Pet api Pet Group", () => {
  describe("pet/{petId} api", () => {
    it("정상 처리(200)", async () => {
      // expect(PET_ID).toEqual(1);
      const data = await fetchPetId(2);

      // @ts-ignore
      expect(petSchema).toMatchJSC(data);
    });
  });
});

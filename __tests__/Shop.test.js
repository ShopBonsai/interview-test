import data from "../imports/startup/server/mockMerchantData.json";

const numItems = data.length;

test("Number of items = 198", () => {
  expect(numItems).toBe(198);
});
import data from "../imports/startup/server/mockMerchantData.json";
//displaying all available items
const numItems = data.length;

test("Number of items = 198", () => {
  expect(numItems).toBe(198);
});

//check that item is in stock
const productQuantity = data[0].products[0].quantity;

test("Number of items to be greater than 0", () => {
  expect(productQuantity).toBeGreaterThan(0);
});

//Objects
test("The first item to have a property of products", () => {
  expect(data[0]).toHaveProperty("products");
});

test("The second item to have the merchant name STROZEN", () => {
  expect(data[1]).toHaveProperty("merchant", "STROZEN");
});

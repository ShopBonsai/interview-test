/**
 * Extract the products form the merchant object
 * @param  {[Object]} merchant
 * @return {[Object]} 
 */
export function getProductsFromMerchant({ products, brands }) {
  return products.map(({ belongsToBrand, ...product }) => ({
    ...product,
    brand: brands[belongsToBrand]
  }));
}

/**
 * Return true if the product's attributes (key-value pairs) match those in the filter
 * @param  {Object} product
 * @param  {Object} filter In the format { color: "red", brand: "Gap" }
 * @return {Boolean}
 */
export function filterProduct(product, filter) {
  const filterNames = Object.keys(filter);
  for (const filterName of filterNames) {
    if (filter[filterName]) {
      const filterValue = filter[filterName];
      if (!product.hasOwnProperty(filterName)) {
        return false;
      }

      let productValue = product[filterName];

      if (filterName === "name") {
        productValue = getTypeName(product.name);
      }

      if (productValue !== filterValue) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Get the type of product from the name (ie ABC Camisole -> Camisole)
 * @param  {String} name
 * @return {String}
 */
export function getTypeName(name) {
  let typeName = name.split(" ");
  typeName.shift();
  return typeName.join(" ");
}

/**
 * Get all the possible options for a list of attributes based on the products
 * "size" and "color" attributes might return { size: ["S", "M", "L"], color: ["red", "green"] }
 * @param  {[String]} attributes
 * @param  {[Object]} products   
 * @return {Object} Attribute options in the format { attribute0: [options], attribute1: [options] }
 */
export function getAttributePossibilities(attributes, products) {
  if (!Array.isArray(attributes)) {
    return getSingleAttributePossibilities(attribute);
  }

  const possibilities = {};
  for (const attribute of attributes) {
    possibilities[attribute] = getSingleAttributePossibilities(
      attribute,
      products
    );
  }

  return possibilities;
}

/**
 * Get all the possible options for one attribute based on the products
 * size attribute might return ["S", "M", "L"]
 * @param  {String} attribute
 * @param  {[Object]} products
 * @return {[String]} Attribute options in the format []
 */
function getSingleAttributePossibilities(attribute, products) {
  const possibilities = {};
  for (const product of products) {
    if (product.hasOwnProperty(attribute)) {
      let value = product[attribute];
      if (attribute === "name") {
        value = getTypeName(value);
      }
      possibilities[value] = 1;
    }
  }

  return Object.keys(possibilities);
}

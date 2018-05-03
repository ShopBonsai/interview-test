const helpers = {
  getBrandName: (id, brands) =>
    brands.filter(brand => brand._id === id)[0].name,
  formatPrice: price => price.toString().replace(/(\.\d+)/gi, "")
};

// epxort module
export default helpers;

const helpers = {
  getSingleRef: (id, array) => {
    let name = "No Data";
    try {
      name = array.filter(item => item._id === id)[0].name;
    } catch (e) {
      null;
    }
    return name;
  },
  formatPrice: price => price.toString().replace(/(\.(\d+))/gi, "$10"),
  titleize: string => {
    const hashed = string.replace(/\s+/gi, "###").split("###");
    return hashed
      .map(
        letter =>
          letter.substr(0, 1).toUpperCase() + letter.substr(1).toLowerCase()
      )
      .join(" ");
  },
  adjustSizes: item => {
    switch (item) {
      case "S":
        return "small";
      case "M":
        return "medium";
      case "L":
        return "large";
      default:
        return item;
    }
  },
  findProductMerchantProfileId: (productUserId, users, merchantProfiles) => {
    let id = "";
    try {
      // console.log(productUserId, users, merchantProfiles);
      const productUserAccount = users.filter(
        user => user._id === productUserId
      )[0];
      // console.log("Product User Account:", productUserAccount);
      const productMerchantProfile = merchantProfiles.filter(
        merchantProfile => merchantProfile._id === productUserAccount.profile
      )[0];
      // console.log("Product Merchant Profile:", productMerchantProfile);
      id = productMerchantProfile._id;
    } catch (e) {
      null;
    }
    return id;
  }
};

// epxort module
export default helpers;

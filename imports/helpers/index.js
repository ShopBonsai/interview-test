// define module
const helpers = {
  getSingleRef: (id, array) => {
    let name = "No Data";
    try {
      name = array.filter(item => item._id === id)[0].name;
    } catch (e) {
      console.warn(e);
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
  getMerchantProfile: (productUserId, users, merchants) => {
    // console.log('%c TEST', 'color: yellow; font-size: 1rem', productUserId, users.length, merchants.length);
    if (users.length > 0) {
      const productUserAccount = users.filter(
        user => user._id === productUserId
      )[0];
      // console.log('%c TEST', 'color: yellow; font-size: 1rem', productUserAccount);
      const productMerchantProfile = merchants.filter(
        merchantProfile => merchantProfile._id === productUserAccount.profile
      )[0];
      // console.log('%c TEST', 'color: yellow; font-size: 1rem', productMerchantProfile);
      return productMerchantProfile;
    }
  },
  getFilterResultsValues: (filtered, merchantProfiles, users) => {
    const brands = [];
    const categories = [];
    const merchants = [];
    try {
      filtered.forEach(product => {
        if (!brands.includes(product.brand)) {
          brands.push(product.brand);
        }
        if (!categories.includes(product.category)) {
          categories.push(product.category);
        }
        const merchantProfile = helpers.getMerchantProfile(
          product.user,
          users,
          merchantProfiles
        );
        if (!merchants.includes(merchantProfile._id)) {
          merchants.push(merchantProfile._id);
        }
      });
    } catch (e) {
      console.warn(e);
    }
    // console.log(merchantProfiles.length, users.length);
    // console.log(brands.length, categories.length, merchants.length);
    return {
      brands,
      categories,
      merchants
    };
  },
  getCartQuantity: (productId, cartItems) => {
    const item = cartItems.filter(
      cartItem => cartItem.product === productId
    )[0];
    // console.log(item.quantity);
    return item.quantity;
  },
  getTotalCartItems: array => {
    let total = 0;
    const quantities = array.map(item => parseInt(item.quantity));
    // console.log('%c QUANTITIES', 'color: yellow; font-size: 1rem', quantities, Array.isArray(quantities));
    try {
      total = quantities.reduce((acc, cur) => {
        // console.log('%c ACC', 'color: yellow; font-size: 1rem', acc, typeof acc, typeof parseInt(acc));
        // console.log('%c CUR', 'color: yellow; font-size: 1rem', cur, typeof cur, typeof parseInt(cur));
        return acc + cur;
      }, 0);
    } catch (e) {
      console.error(e);
    }
    // console.log('%c TEST', 'color: yellow; font-size: 1rem', total, typeof total);
    return total;
  },
  getCartSubtotal: array => {
    let subtotal = "";
    console.log(array);
  }
};

// epxort module
export default helpers;

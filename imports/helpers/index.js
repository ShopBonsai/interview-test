// import modules
import { Meteor } from "meteor/meteor";

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
  formatPrice: price => {
    const string = (Math.round(price * 100) / 100).toString();
    const [a, b] = string.split(".");
    if (b === undefined) {
      return `${a}.00`;
    } else if (b.length === 1) {
      return `${a}.${b}0`;
    } else {
      return `${a}.${b.substr(0, 2)}`;
    }
  },
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
    let brands = [];
    let categories = [];
    let merchants = [];
    // console.log(filtered);
    // console.log(users.length, merchantProfiles.length);
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
      // console.log('%c TEST', 'color: yellow; font-size: 1rem', merchantProfile._id);
      if (!merchants.includes(merchantProfile._id)) {
        merchants.push(merchantProfile._id);
      }
    });
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
  getCartSubtotal: (cartItems, products) => {
    let subtotal = "";
    const cartItemIds = cartItems.map(item => item.product);
    const cartProducts = products.filter(product =>
      cartItemIds.includes(product._id)
    );
    subtotal = cartProducts.reduce((acc, cur) => {
      const orderQuantity = cartItems.filter(
        item => item.product === cur._id
      )[0].quantity;
      return acc + parseInt(orderQuantity) * parseFloat(cur.price);
    }, 0);
    // console.log(cartItems, products, cartProducts);
    // console.log(subtotal);
    return subtotal;
  },
  formatDate: (desired, date) => {
    // console.log(desired, date, typeof date);
    const year = date.getFullYear().toString();
    const monthIndex = date.getMonth() + 1;
    const fixMonth = number =>
      number.toString().length === 1
        ? `0${number.toString()}`
        : number.toString();
    const month = fixMonth(monthIndex);
    let result = "";
    switch (desired) {
      case "yyyy-mm":
        result = `${year}-${month}`;
        break;
      default:
        date;
    }
    // console.log(result);
    return result;
  },
  getCartProductQuantities: (cartItems, products) => {
    // prep order data
    const cartItemIds = cartItems.map(item => item.product);
    const cartProducts = products.filter(product =>
      cartItemIds.includes(product._id)
    );
    // console.log('%c CART PRODUCTS', 'color: yellow; font-size: 1rem', cartProducts, cartProducts.length === cartItems.length);
    const cartQuantities = cartProducts.map(product => {
      if (cartItemIds.includes(product._id)) {
        const current = product;
        try {
          current.cartQuantity = cartItems.filter(
            item => item.product === current._id
          )[0].quantity;
          return current;
        } catch (e) {
          console.warn("Cant find cart quantity for cart item");
        }
      }
    });
    // console.log('%c CART QUANTITIES', 'color: yellow; font-size: 1rem', cartQuantities);
    return cartQuantities;
  },
  validateEmail: email => {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log(email.match(pattern));
    const test = email.match(pattern);
    if (test[0] === email) {
      return true;
    }
    alert("Email address invalid. Please try again.");
    return false;
  },
  validateCard: orderData => {
    const { cardType, cardholder, cardNumber, expiry, code } = orderData;
    if (
      cardType === "visa" &&
      cardNumber === "1234567812345678" &&
      expiry === "2018-08" &&
      code === "321"
    ) {
      return true;
    }
    alert("Credit card invalid. Please try again.");
    return false;
  },
  validatePasswords: orderData => {
    const { password, passwordConfirm } = orderData;
    if (password === passwordConfirm) {
      return true;
    }
    alert("Password and password confirmation do not match. Please try again.");
    return false;
  },
  buildOrder: (orderData, cartItems, orderStatus, profileTypes, products) => {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      passwordConfirm,
      unit,
      civic,
      city,
      prov,
      postal,
      cardType,
      cardholder,
      cardNumber,
      expiry,
      code
    } = orderData;

    // result item
    let result = {};

    // build customer profile
    // console.log('%c PROFILE TYPES', 'color: yellow; font-size: 1rem', profileTypes);
    const customerProfile = {
      firstName,
      lastName,
      email,
      profileType: profileTypes.filter(item => item.name === "customer")[0]._id,
      orders: []
    };
    result.customerProfile = customerProfile;
    // console.log('%c CUSTOMER PROFILE', 'color: yellow; font-size: 1rem', customerProfile);

    // console.log('%c ORDER STATUS', 'color: yellow; font-size: 1rem', orderStatus);
    const status = orderStatus.filter(item => item.name === "paid")[0]._id;
    result.orderStatus = status;
    // console.log('%c STATUS', 'color: yellow; font-size: 1rem', status);

    // get cart product quantities
    const cartProductsWithQuantities = helpers.getCartProductQuantities(
      cartItems,
      products
    );
    result.products = cartProductsWithQuantities;
    // console.log('%c CART PRODUCTS', 'color: yellow; font-size: 1rem', cartProductsWithQuantities);

    // get order shipping address
    let destination;
    const address = `${civic}, ${city}, ${prov} ${postal}`;
    if (unit === "") {
      destination = address;
    } else {
      destination = `${unit} - ${address}`;
    }
    result.destination = destination;
    // console.log('%c CART DESTINATION', 'color: yellow; font-size: 1rem', destination);

    // console.log('%c BUILT ORDER', 'color: yellow; font-size: 1rem', result);
    return result;
  }
};

// epxort module
export default helpers;

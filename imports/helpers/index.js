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
  getCustomerProfile: (orderCustomer, customers) => {
    // console.log('%c PROFILE', 'color: yellow; font-size: 1rem', orderCustomer, customers);
    const profiles = customers.filter(
      customer => customer._id === orderCustomer
    );
    // console.log('%c PROFILE', 'color: yellow; font-size: 1rem', profile);
    return profiles[0];
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
    const item = cartItems.filter(cartItem => cartItem.id === productId)[0];
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
    const cartItemIds = cartItems.map(item => item.id);
    const cartProducts = products.filter(product =>
      cartItemIds.includes(product._id)
    );
    subtotal = cartProducts.reduce((acc, cur) => {
      const orderQuantity = cartItems.filter(item => item.id === cur._id)[0]
        .quantity;
      return acc + parseInt(orderQuantity) * parseFloat(cur.price);
    }, 0);
    // console.log(cartItems, products, cartProducts);
    // console.log(subtotal);
    return subtotal;
  },
  getOrderValue: products => {
    // console.log('%c PRODUCTS', 'color: yellow; font-size: 1rem', products);
    return "$ 0.00";
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
    const cartItemIds = cartItems.map(item => item.id);
    const cartProducts = products.filter(product =>
      cartItemIds.includes(product._id)
    );
    // console.log('%c CART PRODUCTS', 'color: yellow; font-size: 1rem', cartProducts, cartProducts.length === cartItems.length);
    const cartQuantities = cartProducts.map(product => {
      if (cartItemIds.includes(product._id)) {
        const current = product;
        try {
          current.cartQuantity = cartItems.filter(
            item => item.id === current._id
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
    console.log(test);
    if (test === null || test[0] !== email) {
      return false;
    }
    return true;
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
    return false;
  },
  validatePasswords: orderData => {
    const { password, passwordConfirm } = orderData;
    if (password === passwordConfirm) {
      return true;
    }
    return false;
  },
  getProductTotals: (order, products) =>
    order.products.map(orderProduct => {
      const { price } = products.filter(
        product => product._id === orderProduct.id
      )[0];
      return price * orderProduct.quantity;
    }),
  getOrderValue: (orderId, orders, products) => {
    const thisOrder = orders.filter(order => order._id === orderId);
    // console.log("THIS ORDER", thisOrder);
    const productTotals = helpers.getProductTotals(thisOrder[0], products);
    // console.log("PRODUCT TOTALS", productTotals);
    return productTotals.reduce(
      (acc, cur) => parseFloat(acc) + parseFloat(cur),
      0
    );
  },
  getClv: (customer, orders, products) => {
    // console.log(customer, orders);
    const customerOrders = orders.filter(
      order => order.customer === customer._id
    );
    // console.log(customerOrders);
    const orderTotals = customerOrders.map(order => {
      const productTotals = order.products.map(orderProduct => {
        const { price } = products.filter(
          product => orderProduct.id === product._id
        )[0];
        return price * orderProduct.quantity;
      });
      return productTotals.reduce(
        (acc, cur) => parseFloat(acc) + parseFloat(cur),
        0
      );
    });
    // console.log("Order Totals", orderTotals);
    return orderTotals.reduce(
      (acc, cur) => parseFloat(acc) + parseFloat(cur),
      0
    );
  },
  getMerchantProducts: (merchantId, products, users) => {
    // console.log(merchantId, products, users);
    const userAccount = users.filter(user => merchantId === user.profile)[0];
    const merchantProducts = products.filter(
      product => product.user === userAccount._id
    );
    // console.log(userAccount, merchantProducts);
    return merchantProducts;
  },
  getUserProfileType: (userProfileId, customers, merchants, profileTypes) => {
    // console.log(userProfileId, customers, merchants, profileTypes);
    const matches = [...customers, ...merchants].filter(
      profile => profile._id === userProfileId
    );
    // console.log(matches, matches[0]);
    if (matches.length === 1) {
      const profileType = profileTypes.filter(
        item => item._id === matches[0].profileType
      );
      if (profileType.length === 1) {
        return profileType[0];
      }
      return "No Data";
    }
    return "No Data";
  },
  addBrandNames(products, brands) {
    // add brand name ref to products that only have brand ids
    return products.map(product => {
      let withBrandName = product;
      if (brands.length > 0) {
        withBrandName.brandName = brands.filter(
          brand => brand._id === product.brand
        )[0].name;
      }
      return withBrandName;
    });
  }
};

// epxort module
export default helpers;

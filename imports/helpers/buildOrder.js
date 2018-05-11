// define fucntion
const buildOrder = (
  orderData,
  cartItems,
  orderStatus,
  profileTypes,
  products
) => {
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
  let result = {
    products: cartItems
  };

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
};

// export module
export default buildOrder;

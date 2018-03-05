import { find, merge, isEqual, indexOf, map, sumBy, round } from "lodash";
import { NotificationManager } from "react-notifications";

/**
 * this class helps with all cart related Process
 * add a product to the cart
 * save the cart
 * clear the cart
 * retrieve the cart
 */
export class CartHelper {
  /**
   * adds a Product to the localStorage Cart (currentCart)
   * if the product exists this increments his occurrence
   * it doesn't add it if it is out of stock
   * send notification with the state of the process
   * @param product
   * @param cart
   * @returns {*}
   */
  static addProductToLocalCart(product, cart) {
    const exsiting = find(cart.items, item =>
      isEqual(item.product.id, product.id)
    );
    if (!exsiting) {
      cart.items.push({
        occurrence: 1,
        product: {
          id: product.id
        }
      });
      cart.totalPrice += product.price;
      NotificationManager.success(
        "Congratulation",
        "Product added with success to your cart"
      );
    } else {
      let occurence = cart.items[indexOf(cart.items, exsiting)].occurrence;
      if (occurence + 1 > product.quantity) {
        NotificationManager.warning("SORRY", "this product is out of stock");
      } else {
        cart.items[indexOf(cart.items, exsiting)].occurrence += 1;
        cart.totalPrice += product.price;
        NotificationManager.success(
          "Congratulation",
          `You are now having '${occurence + 1}' of '${product.name}'`
        );
      }
    }
    cart.totalPrice = round(cart.totalPrice, 3);
    return cart;
  }

  /**
   * save the current cart to localstorage
   * @param cart
   */
  static saveCart(cart) {
    const newCart = {};
    newCart["totalPrice"] = cart.totalPrice;
    newCart["items"] = map(cart.items, item => {
      return {
        occurrence: item.occurrence,
        product: {
          id: item.product.id
        }
      };
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  /**
   * get the current cart from localstorage
   * if none found this will create an empty cart
   * @returns {any}
   */
  static getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        items: [],
        totalPrice: 0
      };
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  }

  /**
   * removes the curent cart from localStorage
   */
  static clearCart() {
    localStorage.removeItem("cart");
  }

  /**
   * takes a cart as parameter and setup it's total price
   * @param cart
   * @returns {*}
   */
  static setupTotalPrice(cart) {
    cart.totalPrice = round(
      sumBy(cart.items, item => item.product.price * item.occurrence),
      3
    );
    return cart;
  }
}

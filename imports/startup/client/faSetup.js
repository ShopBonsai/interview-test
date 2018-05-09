// import modules
import fontawesome from "@fortawesome/fontawesome";
import {
  faShoppingCart,
  faUser,
  faGem,
  faCartPlus,
  faChevronCircleLeft,
  faBoxes
} from "@fortawesome/fontawesome-free-solid";

// define funtcion
const faSetup = () => {
  // create font awesome library
  return fontawesome.library.add(
    faShoppingCart,
    faUser,
    faGem,
    faCartPlus,
    faChevronCircleLeft,
    faBoxes
  );
};

// export modules
export default faSetup;

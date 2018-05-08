// import modules
import fontawesome from "@fortawesome/fontawesome";
import {
  faShoppingCart,
  faUser,
  faGem,
  faCartPlus,
  faCogs as iconComponents
} from "@fortawesome/fontawesome-free-solid";

// define funtcion
const faSetup = () => {
  iconComponents.iconName = "components";
  // create font awesome library
  return fontawesome.library.add(
    faShoppingCart,
    faUser,
    faGem,
    faCartPlus,
    iconComponents
  );
};

// export modules
export default faSetup;

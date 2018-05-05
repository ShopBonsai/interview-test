const helpers = {
  getBrandName: (id, brands) => {
    let name = "No Data";
    try {
      name = brands.filter(brand => brand._id === id)[0].name;
    } catch (e) {
      console.warn(e);
    }
    return name;
  },
  formatPrice: price => price.toString().replace(/(\.\d+)/gi, ""),
  titelize: string => {
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
  }
};

// epxort module
export default helpers;

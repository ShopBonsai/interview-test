// define class
class Aligner {
  constructor(selection) {
    this.selection = selection;
    this.single = this.single.bind(this);
  }
  get selection() {
    return this._selection;
  }
  set selection(value) {
    switch (value) {
      case "single":
        this._selection = value;
        return value;
      case "customers":
        this._selection = value;
        return value;
      case "merchants":
        this._selection = value;
        return value;
      case "orders":
        this._selection = value;
        return value;
      case "orderStatus":
        this._selection = value;
        return value;
      case "products":
        this._selection = value;
        return value;
      case "users":
        this._selection = value;
        return value;
      default:
        throw new TypeError("Sorter reducer arg is not a valid resource");
    }
  }
  single(entries) {
    const result = Array.from(entries);
    entries.forEach(entry => {
      switch (entry[0]) {
        case "_id":
          return result.splice(0, 1, entry);
        case "name":
          return result.splice(1, 1, entry);
        case "updatedAt":
          return result.splice(2, 1, entry);
        case "createdAt":
          return result.splice(3, 1, entry);
        default:
          break;
      }
    });
    // console.log(result);
    return result;
  }
  align(entries, option) {
    if (!Array.isArray(entries)) {
      console.error("sort input arg is not an array");
      return [];
    }
    let sortedEntries = [];
    switch (this._selection) {
      case "single":
        sortedEntries = this.single(entries);
        break;
      default:
        console.error("No sorter for this resource");
        break;
    }
    // console.log("--------SORTED ENTRIES--------", sortedEntries);
    let sortedSelection;
    switch (option) {
      case "keys":
        sortedSelection = sortedEntries.map(item => item[0]);
        break;
      case "values":
        sortedSelection = sortedEntries.map(item => item[1]);
        break;
      default:
        sortedSelection = sortedEntries.map(item => item);
        break;
    }
    return sortedSelection;
  }
}

// expport modules
export default Aligner;

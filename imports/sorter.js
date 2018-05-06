// define module
class Sorter {
  constructor(data) {
    this.data = data;
  }
  get data() {
    return this._data;
  }
  set data(value) {
    if (Array.isArray(value)) {
      this._data = value;
      return value;
    }
    throw new TypeError("Sorter input is not an array");
  }
  byBrand(brands) {
    // console.log('%c SORTER BRANDS LENGTH', 'color: yellow; font-size: 1rem', brands.length);
    // console.log('%c SORTER DATA LENGTH', 'color: yellow; font-size: 1rem', this._data.length);
    const brandNameAdded = this._data.map(item => {
      item.brandName = brands.filter(brand => item.brand === brand._id)[0].name;
      // console.log('%c BRAND NAME', 'color: yellow; font-size: 1rem', item);
      return item;
    });
    // console.log('%c BRAND NAME', 'color: yellow; font-size: 1rem', brandNameAdded);
    let sorted = [];
    while (sorted.length !== brandNameAdded.length) {
      let unsorted = brandNameAdded.filter(item => {
        const ids = sorted.map(item => item._id);
        if (!ids.includes(item._id)) return item;
      });
      // console.log('%c LENGTHS', 'color: yellow; font-size: 1rem', sorted.length, unsorted.length);
      let min = unsorted[0];
      for (let i = 0; i < unsorted.length; i++) {
        // console.log('%c LENGTHS', 'color: yellow; font-size: 1rem', min.brandName, unsorted[i].brandName);
        if (unsorted[i].brandName < min.brandName) {
          // console.log('%c LENGTHS', 'color: yellow; font-size: 1rem', unsorted[i].brandName < min.brandName);
          min = unsorted[i];
          // console.log('%c SORTED', 'color: yellow; font-size: 1rem', min.brandName);
        }
      }
      sorted.push(min);
    }
    // const names = sorted.map(item => item.brandName);
    // console.log('%c SORTED', 'color: yellow; font-size: 1rem', names.length, names);
    if (sorted.length !== this._data.length) {
      console.warn(
        "Product sort by brand unsuccessful. Returned unsorted products."
      );
      return this._data;
    }
    return sorted;
  }
}

// export module
export default Sorter;

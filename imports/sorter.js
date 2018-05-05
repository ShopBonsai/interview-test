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
    console.log('%c SORTER BRANDS LENGTH', 'color: yellow; font-size: 1rem', brands.length);
    console.log('%c SORTER DATA LENGTH', 'color: yellow; font-size: 1rem', this._data.length);
    return this._data;
  }
}

// export module
export default Sorter;

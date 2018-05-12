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
  alphabetical() {
    console.log('%c ALPHABETICAL SORT', 'color: yellow; font-size: 1rem', this._data);
    // set sorted results holder
    let sorted = [];
    // while length of sorted results is not equalt to length of input run loop
    while (sorted.length !== this._data.length) {
      // create array of unsorted items
      let unsorted = this._data.filter(dataItem => {
        // get the ids of the sorted results
        const sortedIds = sorted.map(sortedItem => sortedItem._id);
        // if the sortedIds does not include the dataItem id, return dataitem to the unsorted list
        if (!sortedIds.includes(dataItem._id)) return dataItem;
      });
      // go through unsorted items for sorting
      // for all unsorted data, set a minimum holder to first unsorted item name
      let min = unsorted[0];
      // loop through unsorted items, searching for new minumum
      for (let i = 0; i < unsorted.length; i++) {
        // compare i to the current min and replace if i is lower than min
        if (unsorted[i].name < min.name) {
          // if i is lower than current min, replace min with i
          min = unsorted[i];
        }
        // keep looping through all unsorted items looking comparing name value
      }
      // if no new min is found, the current min is the loweest of all unsorted items, so pusht it into the sorted array
      sorted.push(min);
    }
    // while loop exited once all items have been sorted. double check before return sorted results
    if (sorted.length !== this._data.length) {
      console.warn(
        "Product sort by brand unsuccessful. Returned unsorted products."
      );
      // if sort was unsuccessful return orginal unsorted data;
      return this._data;
    }
    // if sort lengths match
    console.log('%c SORT RESULTS', 'color: yellow; font-size: 1rem', sorted);
    return sorted;
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
      let unsorted = brandNameAdded.filter(brand => {
        const sortedIds = sorted.map(sortedItem => sortedItem._id);
        if (!sortedIds.includes(brand._id)) return brand;
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

// Framework
import React, { PureComponent } from "react";

// Components
import { Input } from "reactstrap";
import debounce from "lodash/debounce";

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.text = "";

    this._debouncedSearch = debounce(() => {
      this.props.onSearch(this.text);
    }, 1000);

    this._onChange = (e) => {
      this.text = e.target.value;
      this._debouncedSearch();
    };
  }

  _filter() {
    this.props.onFilter();
  }

  render() {
    return (
      <div>
        <Input
          type="search"
          name="search"
          id="search"
          className="searchBar"
          placeholder="search"
          onChange={this._onChange.bind(this)}
        />
        <button onClick={this._filter.bind(this)}>Filter</button>
      </div>
    );
  }
}

export default Search;

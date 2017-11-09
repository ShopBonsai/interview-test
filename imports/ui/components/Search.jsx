import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: props.search || ''
    }
  }
  render() {
    return <div className="shop-search">
      <input className="search-input" 
        placeholder="Search for ..." 
        onChange={(e) => {
          this.setState({search: e.target.value})
        }}
        value={this.state.search}
      />
      <button className="search-button" 
        onClick={() => {
          this.props.onSearch(this.state.search)
        }}
      >ok</button>
    </div>
  }
}

export default Search
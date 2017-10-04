// Framework
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Item from './Item';

export class SellersItems extends React.Component {
  render() {
    const items = this.props.items;
    const sellersName = this.props.sellersName;
    const allItems = items.map((item) =>
                        <div key={item.name}>
                          <Item sellersName={sellersName} item={item} />
                        </div>
                      );
    return (
      <div className='items' >{allItems}</div>
    )
  }
}
SellersItems.propTypes = {
  items: PropTypes.array.isRequired,
  sellersName: PropTypes.string.isRequired
};

export default SellersItems;

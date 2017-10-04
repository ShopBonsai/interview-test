// Framework, libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import { SellersItems } from './SellersItems';


class Seller extends React.Component {
  calculateItems() {
    let purchasedOverall = 0;
    this.props.sellerWithItems.items.forEach(function (infoAboutItem) {
      purchasedOverall = purchasedOverall + infoAboutItem.quantityPurchased
    });
    return purchasedOverall;
  }

  render() {
    const purchasedFromSeller = this.calculateItems(this.props.sellerWithItems.items);
    return (
      <div className='seller-page'>
          <div className='seller-header'>
            <div className='seller-name'>{this.props.sellerWithItems.name}</div>
            <div className='items-number'>{this.props.overallItemsToReturn} of {purchasedFromSeller}</div>
          </div>
          <SellersItems sellersName={this.props.sellerWithItems.name} items={this.props.sellerWithItems.items}/>
      </div>
    );
  }
}
Seller.propTypes = {
  sellerWithItems: PropTypes.object.isRequired,
  overallItemsToReturn: PropTypes.number.isRequired // from the store
};

function calculateItemsToReturn(itemsToReturn, sellersName) {
  const sellersItems = itemsToReturn.filter(item => item.sellersName === sellersName)
  let overallItemsToReturn = 0;
  sellersItems.forEach(function(item) {
    overallItemsToReturn = overallItemsToReturn + parseInt(item.quantityToReturn)
  });
  return overallItemsToReturn
}

const mapStateToProps = (state, props) => {
  const sellersName = props.sellerWithItems.name
  return {
   overallItemsToReturn: calculateItemsToReturn(state.returnItemsPage.itemsToReturn, sellersName)
  }
}

export default connect(mapStateToProps)(Seller)

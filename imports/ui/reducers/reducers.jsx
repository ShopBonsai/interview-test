import { combineReducers } from 'redux'
import {
  ADD_ITEM_TO_RETURN_LIST
} from '../actions/actions.jsx'
import {store} from '../../startup/client/index.js'

const initialState = {
  itemsToReturn: []
}

function returnItemsPage(state = initialState, action) {
  const sellersName = action.itemInfo && action.itemInfo.sellersName;
  const itemName = action.itemInfo && action.itemInfo.itemName;
  const quantityToReturn = action.itemInfo && action.itemInfo.quantityToReturn;
  switch (action.type) {
    case ADD_ITEM_TO_RETURN_LIST:
      let existingItemInfo = state.itemsToReturn.filter(item => item.sellersName === sellersName && item.itemName === itemName)
      if (existingItemInfo.length != 0) {
        // update existing itemInfo
        return {
          ...state,
          itemsToReturn: [
            ...state.itemsToReturn.map(itemInfo =>
              (itemInfo.sellersName === sellersName && itemInfo.itemName === itemName)
                ? {...itemInfo, quantityToReturn: quantityToReturn}
                : itemInfo
            )]
        }
      } else {
        // create new itemInfo
        return {
          ...state,
          itemsToReturn: [
            ...state.itemsToReturn,
            {
              sellersName: sellersName,
              itemName: itemName,
              quantityToReturn: quantityToReturn
            }
          ]
        }
      }
    default:
      return state
  }
}
const returnItemsApp = combineReducers({
  returnItemsPage
})

export default returnItemsApp

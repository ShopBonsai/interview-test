/*
 * action types
 */

export const ADD_ITEM_TO_RETURN_LIST = 'ADD_ITEM_TO_RETURN_LIST'


/*
 * action creators
 */

export function addItemToReturnList(itemInfo) {
  return {
    type: ADD_ITEM_TO_RETURN_LIST,
    itemInfo
  }
}

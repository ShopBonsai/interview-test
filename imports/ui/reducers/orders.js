function orders(state = [], action) {  
  switch (action.type) {
    case 'GET_ORDERS':
      return action.payload;
    case 'CREATE_ORDER':
      const { index, name, gui } = action.payload;      
      return [
        ...state,
        {index,name,gui,number}
      ]
    default:
      return state
  }
}

export default orders

// /imports/ui/reducers/widgets.js
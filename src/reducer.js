const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }
  // if (action.type === 'ADD') {
  //   state.cart.forEach((item) => {
  //     if (item.id === action.payload) {
  //       const existingItem = item;
  //       console.log(existingItem);
  //     }
  //   });
  //   // if (!state.cart.includes(existingItem)) {
  //   //   return {
  //   //     ...state,
  //   //     cart: state.cart.push(existingItem),
  //   //     alert: false,
  //   //   };
  //   // } else {
  //   //   return { ...state, alert: true };
  //   // }
  // }
  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));

    return { ...state, total, amount };
  }
  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }
  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false };
  }
  if (action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === 'inc') {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (action.payload.type === 'dec') {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  throw new Error('no matching action type');
};

export default reducer;

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'CLEAR_CART':
//       return {
//         ...state,
//         cart: [],
//       };
//       break;
//     case 'REMOVE':
//       return {
//         ...state,
//         cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
//       };
//       break;
//     case 'INCREASE':
//       let tempCart = state.cart.map((item) => {
//         if (item.id === action.payload) {
//           return { ...item, amount: item.amount + 1 };
//         }
//         return item;
//       });
//       return { ...state, amount: tempCart };
//       break;
//     case 'DECREASE':
//       let tempCart2 = state.cart.map((item) => {
//         if (item.id === action.payload) {
//           return { ...item, amount: item.amount - 1 };
//         }
//         return item;
//       });
//       return { ...state, amount: tempCart2 };
//       break;
//     default:
//       return state;
//   }
// };
//export default reducer;

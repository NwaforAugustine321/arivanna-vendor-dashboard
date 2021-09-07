import { actionTypes } from "./action";

export const initState = {
  orders: [],
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_RECENT_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case actionTypes.CLEAR_RECENT_ORDERS:
      return initState;
    default:
      return state;
  }
}

export default reducer;

import { actionTypes } from "./action";

export const initialState = {
  products: [],
  url: "",
  customerKey: "",
  customerSecret: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.WOOCOMMERCE_PRODUCTS_LIST:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.WOOCOMMERCE_URL:
      return {
        ...state,
        url: action.payload,
      };
    case actionTypes.WOOCOMMERCE_CUSTOMER_SECRET:
      return {
        ...state,
        customerSecret: action.payload,
      };
    case actionTypes.WOOCOMMERCE_CUSTOMER_KEY:
      return {
        ...state,
        customerKey: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;

import { actionTypes } from './action';

export const initCart = {
    cartItems: [],
    amount: 0,
    shipping: 0,
    cartTotal: 0,
    shipping_cost_product_ids: []
};

function reducer(state = initCart, action) {
    switch (action.type) {
        case actionTypes.GET_CART_SUCCESS:
            return {
                ...state,
            };
        case actionTypes.UPDATE_CART_SUCCESS:
            return {
                ...state,
                ...{ cartItems: action.payload.cartItems },
                ...{ amount: action.payload.amount },
                ...{ shipping: action.payload.shipping },
                ...{ shipping_cost_product_ids: action.payload.shipping_cost_product_ids ?? [] },
                ...{ cartTotal: action.payload.cartTotal },
            };
        case actionTypes.CLEAR_CART_SUCCESS:
            return {
                ...state,
                ...{ cartItems: action.payload.cartItems },
                ...{ amount: action.payload.amount },
                ...{ shipping: action.payload.shipping },
                ...{ shipping_cost_product_ids: action.payload.shipping_cost_product_ids },
                ...{ cartTotal: action.payload.cartTotal },
            };
        case actionTypes.GET_CART_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
        case actionTypes.ADD_ITEMS_SHIPPING_CART:
            return {
                ...state,
                shippingCart: action.payload
            };

        case actionTypes.UPDATE_CART_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };
        case actionTypes.UPDATE_SHIPPING_COST_SUCCESS:
            return {
                ...state,
                ...{ shipping: action.payload.shipping },
                ...{ shipping_cost_product_ids: action.payload.shipping_cost_product_ids },
            };
        default:
            return state;
    }
}

export default reducer;

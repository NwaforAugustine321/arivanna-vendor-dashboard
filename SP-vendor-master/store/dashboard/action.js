export const actionTypes = {
    FETCH_RECENT_ORDERS: 'FETCH_RECENT_ORDERS',
    CLEAR_RECENT_ORDERS:"CLEAR_RECENT_ORDERS"
};

export function fetchRecentOrders(payload) {
    return { type: actionTypes.FETCH_RECENT_ORDERS, payload };
}

export function clearRecentOrders(payload) {
    return { type: actionTypes.CLEAR_RECENT_ORDERS, payload };
}

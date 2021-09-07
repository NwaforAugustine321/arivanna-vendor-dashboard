export const actionTypes = {
    CHANGE_CURRENCY: 'CHANGE_CURRENCY',
    CHANGE_CURRENCY_SUCCESS: 'CHANGE_CURRENCY_SUCCESS',
    GET_VENDOR_DETAILS: 'GET_VENDOR_DETAILS',
    TOGGEL_CHATBOT: 'TOGGEL_CHATBOT',
};

export function changeCurrency(currency) {
    return { type: actionTypes.CHANGE_CURRENCY, currency };
}

export function changeCurrencySuccess(currency) {
    return { type: actionTypes.CHANGE_CURRENCY_SUCCESS, currency };
}

export function getVendorDetails(payload) {
    return { type: actionTypes.GET_VENDOR_DETAILS, payload };
}

export function toggelChatbot() {
    return { type: actionTypes.TOGGEL_CHATBOT };
}
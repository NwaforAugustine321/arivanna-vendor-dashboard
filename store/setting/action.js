export const actionTypes = {
    CHANGE_CURRENCY: 'CHANGE_CURRENCY',
    CHANGE_CURRENCY_SUCCESS: 'CHANGE_CURRENCY_SUCCESS',
    CHANGE_COUNTRY_SUCCESS: 'CHANGE_COUNTRY_SUCCESS',
    TOGGEL_CHATBOT: 'TOGGEL_CHATBOT',
    TOGGLE_CHAT: 'TOGGLE_CHAT',
    CLOSE_CHAT: 'CLOSE_CHAT',
};

export function changeCurrency(currency) {
    return { type: actionTypes.CHANGE_CURRENCY, currency };
}

export function changeCurrencySuccess(currency) {
    return { type: actionTypes.CHANGE_CURRENCY_SUCCESS, currency };
}

export function changeCountrySuccess(country) {
    return { type: actionTypes.CHANGE_COUNTRY_SUCCESS, country };
}

export function toggelChatbot() {
    return { type: actionTypes.TOGGEL_CHATBOT };
}

export function chat() {
    return { type: actionTypes.TOGGLE_CHAT };
}

export function closeChat() {
    return { type: actionTypes.CLOSE_CHAT };
}

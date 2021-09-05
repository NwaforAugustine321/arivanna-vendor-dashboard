import { actionTypes } from './action';

export const initialState = {
    currency: {
        symbol: '$',
        text: 'AUD',
    },
    country: { code: 'AU', text: 'Australia' },
    language: 'EN',
    chatbotHide: true, // Default state means closed
    chatHide: true, //Default state means closed
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENCY_SUCCESS:
            return {
                ...state,
                ...{ currency: action.currency },
            };
        case actionTypes.CHANGE_COUNTRY_SUCCESS:
            return {
                ...state,
                ...{ country: action.country },
            };
        case actionTypes.TOGGEL_CHATBOT:
            return {
                ...state,
                ...{ chatbotHide: !state.chatbotHide },
            };
        case actionTypes.TOGGLE_CHAT:
            return {
                ...state,
                ...{ chatHide: !state.chatHide },
            };
        case actionTypes.CLOSE_CHAT:
            return {
                ...state,
                ...{ chatHide: true },
            };
        default:
            return state;
    }
}

export default reducer;

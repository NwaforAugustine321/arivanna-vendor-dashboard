import { actionTypes } from './action';

export const initState = {
	currency: {
		symbol: '$',
		text: 'AUD',
	},
	details: null,
	chatbotHide: false, // Default state means closed
};

function reducer(state = initState, action) {
	switch (action.type) {
		case actionTypes.CHANGE_CURRENCY_SUCCESS:
			return {
				...state,
				...{ currency: action.currency },
			};
		case actionTypes.GET_VENDOR_DETAILS:
			return {
				...state,
				details: action.payload,
			};
		case actionTypes.TOGGEL_CHATBOT:
			return {
				...state,
				...{ chatbotHide: !state.chatbotHide },
			};
		default:
			return state;
	}
}

export default reducer;

import { actionTypes } from './action';

export const initState = {
    isLoggedIn: false,
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case actionTypes.LOGOUT_SUCCESS:
            return initState;
        case actionTypes.CHECK_LOGIN_STATUS:
            return {
                ...state,
                ...[state],
            };
        default:
            return state;
    }
}

export default reducer;

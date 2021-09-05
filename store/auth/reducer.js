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
            localStorage.setItem('__paypal_storage__', JSON.stringify({}));
            return {
                ...state,
                ...action.payload,
                // ...{ isLoggedIn: false },

                ...{
                    isLoggedIn: false,
                    email: '',
                    token: '',
                    id_user: '',
                    user_access_level: '',
                },
            };
        case actionTypes.UPDATE_USER_LOCATION:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default reducer;

export const actionTypes = {
    REGISTER: 'REGISTER',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
    UPDATE_USER_LOCATION: 'UPDATE_USER_LOCATION',
};

export function register(payload) {
    return { type: actionTypes.REGISTER, payload };
}

export function registerSuccess(payload) {
    return { type: actionTypes.REGISTER_SUCCESS, payload };
}

export function login(payload) {
    return { type: actionTypes.LOGIN_REQUEST, payload };
}

export function loginSuccess(payload) {
    return { type: actionTypes.LOGIN_SUCCESS, payload };
}

export function logOut(payload) {
    return { type: actionTypes.LOGOUT, payload };
}

export function logOutSuccess() {
    return { type: actionTypes.LOGOUT_SUCCESS };
}

// export function checkAuthorization(payload) {
//     return { type: actionTypes.CHECK_AUTHORIZATION, payload };
// }

export function updateUserLocation(payload) {
    return { type: actionTypes.UPDATE_USER_LOCATION, payload };
}
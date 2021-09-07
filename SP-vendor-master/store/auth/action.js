export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
    CHECK_LOGIN_STATUS:'CHECK_LOGIN_STATUS'

};

export function login(payload) {
    return { type: actionTypes.LOGIN_REQUEST ,payload};
}

export function loginSuccess(payload) {
    return { type: actionTypes.LOGIN_SUCCESS , payload};
}

export function logOut() {
    return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
    return { type: actionTypes.LOGOUT_SUCCESS };
}

export function CheckLoginStatus() {
    return { type: actionTypes.CHECK_LOGIN_STATUS };
}

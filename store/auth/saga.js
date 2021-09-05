import { all, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';

import {
    actionTypes,
    registerSuccess,
    loginSuccess,
    logOutSuccess,
} from './action';
import { closeChat } from '../setting/action';

const modalSuccess = (type, data) => {
    const user_first_name = data.payload.user_first_name;
    notification[type]({
        message: `Welcome back ${user_first_name}`,
        description: 'You are logged in successfully!',
    });
};

const modalRegister = (type) => {
    notification[type]({
        message: `Welcome !!!`,
        description: 'Your registration was successful!',
    });
};

const modalWarning = (type, data) => {
    notification[type]({
        message: `Good bye ${data} `,
        description: 'Your account has been Logged out!',
    });
};

function* registerSaga(data) {
    try {
        yield put(registerSuccess(data.payload));

        modalRegister('success');
    } catch (err) {
    }
}

function* loginSaga(data) {
    try {
        yield put(loginSuccess(data.payload));
        modalSuccess('success', data);
    } catch (err) {
    }
}

function* logOutSaga(data) {
    try {
        yield put(logOutSuccess());
        yield put(closeChat());
        modalWarning('warning',data.payload);
    } catch (err) {
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.REGISTER, registerSaga)]);
    yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
    yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
}

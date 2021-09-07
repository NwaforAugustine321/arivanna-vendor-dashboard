import { all, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import VendorAuthRepository from '~/repositories/VendorAuthRepository'

import { actionTypes, loginSuccess, logOutSuccess } from './action';

const modalSuccess = (type) => {
    notification[type]({
        message: 'Welcome back',
        description: 'Login successful!',
    });
};

const modalWarning = (type) => {
    notification[type]({
        message: 'Good bye!',
        description: 'Your account has been logged out!',
    });
};

function* loginSaga(data) {
    try {
        yield put(loginSuccess(data.payload));
        modalSuccess('success', data);
    } catch (err) {
    }
}

function* logOutSaga() {
    try {
        yield VendorAuthRepository.logout();
        yield put(logOutSuccess());
        modalWarning('warning');
    } catch (err) {
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
    yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
}

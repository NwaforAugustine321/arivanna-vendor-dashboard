import { all, put, takeEvery } from 'redux-saga/effects';

import { actionTypes, changeCurrencySuccess } from './action';


function* getVendorDetailsSaga() {
    
}

function* changeCurrencySaga({ currency }) {
    try {
        yield put(changeCurrencySuccess(currency));
    } catch (err) {
        console.error(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_VENDOR_DETAILS, getVendorDetailsSaga)]);
    yield all([takeEvery(actionTypes.CHANGE_CURRENCY, changeCurrencySaga)]);
}

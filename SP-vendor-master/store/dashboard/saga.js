import { all, put, takeEvery } from "redux-saga/effects";
import { notification } from "antd";

import { actionTypes, loginSuccess, logOutSuccess } from "./action";

const modalSuccess = (type) => {
  notification[type]({
    message: "Welcome back",
    description: "Login successful!",
  });
};

const modalWarning = (type) => {
  notification[type]({
    message: "Good bye!",
    description: "Your account has been logged out!",
  });
};

function* fetchRecentOrderSaga() {}
function* clearRecentOrderSaga() {}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.FETCH_RECENT_ORDERS, fetchRecentOrderSaga)]);
  yield all([takeEvery(actionTypes.CLEAR_RECENT_ORDERS, clearRecentOrderSaga)]);
}

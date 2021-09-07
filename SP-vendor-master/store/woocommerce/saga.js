import { all, put, takeEvery, call } from "redux-saga/effects";
import { select } from "redux-saga/effects";
import { getAllProducts } from "~/woocommerce_helper/apiRequest";

import { actionTypes, setProducts } from "./action";

function* setProductsSaga() {
  /****try {
    const { customerKey, customerSecret, url } = yield select(
      (state) => state.woocommerce
    );
    const result = yield getAllProducts(url, customerKey, customerSecret);
    yield put(setProducts(result.data));
  } catch (error) {
    console.log(error);
  }***/
}

export default function* rootSaga() {
  yield all([
    takeEvery(actionTypes.WOOCOMMERCE_PRODUCTS_LIST, setProductsSaga),
  ]);
}

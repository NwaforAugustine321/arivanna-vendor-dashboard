import { all } from "redux-saga/effects";
import AppSaga from "./app/saga";
import AuthSaga from "./auth/saga";
import WooCommerceSaga from "./woocommerce/saga";
import SettingsSaga from "./settings/saga";
import DashboardSaga from "./dashboard/saga";

export default function* rootSaga() {
  yield all([AppSaga(), AuthSaga(), WooCommerceSaga(), SettingsSaga(), DashboardSaga()]);
}

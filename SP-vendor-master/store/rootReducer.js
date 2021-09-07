import { combineReducers } from 'redux';

import auth from './auth/reducer';
import app from './app/reducer';
import woocommerce from "./woocommerce/reducer";
import settings from "./settings/reducer";
import dashboard from "./dashboard/reducer";

export default combineReducers({
    auth,
    app,
    woocommerce,
    settings,
    dashboard
});

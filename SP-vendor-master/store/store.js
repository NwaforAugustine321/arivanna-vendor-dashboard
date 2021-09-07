import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { createWrapper } from 'next-redux-wrapper';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};


function configureStoreAndPersist(){

  const persistConfig = {
    key: 'Arivanna',
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return {store, persistor}

}

const {store, persistor} = configureStoreAndPersist();

export {store, persistor};

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["auth.accessList"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore(preloadedState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(persistedReducer, preloadedState, composeEnhancers(applyMiddleware(...middlewares)));

  sagaMiddleware.run(rootSaga);

  // if (module.hot) {
  //   module.hot.accept("../rootReducer/index", () => {
  //     const nextRootReducer = require("../rootReducer/index");
  //     store.replaceReducer(nextRootReducer);
  //   });
  // }

  return store;
}

const store = configureStore();
let persistor = persistStore(store);

export { store, persistor };

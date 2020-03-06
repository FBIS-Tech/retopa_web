import React from "react"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import reducers, { rootReducer } from "./rootReducer"
import saga from "../saga/rootSaga"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import storageSession from "redux-persist/lib/storage/session"
import localForage from "localforage"
import { PersistGate } from "redux-persist/integration/react"
const windowGlobal = typeof window !== "undefined" && window

const persistConfig = {
  key: "root",
  storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default ({ element }) => {
  const middleware = createSagaMiddleware()
  // const enhancer = windowGlobal.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const middlewares = [middleware]
  const store = createStore(persistedReducer, applyMiddleware(...middlewares))
  let persistor = persistStore(store)
  // const store = createStore(reducers, applyMiddleware(middleware))

  middleware.run(saga)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {element}
      </PersistGate>
    </Provider>
  )
}

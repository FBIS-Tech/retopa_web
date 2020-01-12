import React from "react"
import { Provider } from "react-redux"
import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import reducers from "./rootReducer"

const sagaMiddleware = createSagaMiddleware()
const createStore = () =>
  reduxCreateStore(reducers, applyMiddleware(sagaMiddleware))

export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
)

import React from "react"
import { Provider } from "react-redux"
import PropTypes from "prop-types"
import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import reducers from "./rootReducer"
import saga from "../saga/rootSaga"

const windowGlobal = typeof window !== "undefined" && window

// const sagaMiddleware = createSagaMiddleware()
// const enhancer = windowGlobal.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const middlewares = [sagaMiddleware]

// const store = createStore(reducers, enhancer(applyMiddleware(...middlewares)))
// sagaMiddleware.run(saga)
// export default ({ element }) => <Provider store={store}>{element}</Provider>

export default ({ element }) => {
  const middleware = createSagaMiddleware()
  const enhancer = windowGlobal.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const middlewares = [middleware]
  const store = createStore(reducers, enhancer(applyMiddleware(...middlewares)))
  // const store = createStore(reducers, applyMiddleware(middleware))

  middleware.run(saga)

  return <Provider store={store}>{element}</Provider>
}

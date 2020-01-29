import { actionType } from "../Actions/ActionsType"
import { combineReducers } from "redux"
import { notification } from "antd"
// const Cryptr = require("cryptr")
import Cryptr from "cryptr"
const cryptr = new Cryptr("retopaToken")

const {
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGIN_USER,
} = actionType

const initialState = {
  email: "",
  isLogged: false,
  userData: {},
  registration: false,
  registrationMessage: "",
  regError: [],
  authError: "",
  isError: false,
  logError: [],
  tripDetsOne: {},
  tripDetsTwo: {},
}

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTRATION_SUCCESS:
      return { ...state, registrationMessage: payload, registration: true }
    case REGISTRATION_ERROR:
      return { ...state, regError: payload, isError: true }
    case LOGIN_USER:
      let tokenOne = payload.username
      let tokenTwo = payload.password
      const TOKEN_ONE = cryptr.encrypt(tokenOne)
      const TOKEN_TWO = cryptr.encrypt(tokenTwo)
      const token = { TOKEN_ONE, TOKEN_TWO }
      sessionStorage.setItem("topup", JSON.stringify(token))
      return { ...state, loginDets: payload }
    case LOGIN_ERROR:
      return { ...state, logError: payload, isError: true }
    case AUTH_ERROR:
      return { ...state, authError: payload, isError: true }
    case LOGIN_SUCCESS:
      localStorage.setItem("userData", JSON.stringify(payload))
      window.location = "/Dealer_Dashboard/Dashboard/"
      return { ...state, userData: payload, isLogged: true }

    default:
      return state
  }
}
// const reducers = combineReducers({
//   rootReducer,
// })

export default rootReducer

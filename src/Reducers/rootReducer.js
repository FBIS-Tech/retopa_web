import { actionType } from "../Actions/ActionsType"
import { combineReducers } from "redux"
import { notification } from "antd"
import { Base64 } from "js-base64"
// import Cryptr from "cryptr"
// const cryptr = new Cryptr("retopaToken")

const {
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGIN_USER,
  LOGIN_ADMIN,
  CLEAR,
  RETAILER,
  LOGIN_SUCCESS_DEALER,
  LOGIN_SUCCESS_ADMIN,
  TRANSACTIONS,
  LOGIN_DEALER,
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
  retailer: {},
  type: "",
  transactions: {},
}

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR:
      return { ...state, isError: false, authError: "", logError: [] }
    case REGISTRATION_SUCCESS:
      return { ...state, registrationMessage: payload, registration: true }
    case REGISTRATION_ERROR:
      return { ...state, regError: payload, isError: true }
    case LOGIN_USER:
      let tokenOne = payload.username
      let tokenTwo = payload.password
      const TOKEN_ONE = Base64.encode(tokenOne)
      const TOKEN_TWO = Base64.encode(tokenTwo)
      const token = { TOKEN_ONE, TOKEN_TWO }

      sessionStorage.setItem("topup", JSON.stringify(token))
      return {
        ...state,
        // loginDets: payload,
        isError: false,
        authError: "",
        logError: [],
      }
    case LOGIN_DEALER:
      let tokenOne_dealer = payload.username
      let tokenTwo_dealer = payload.password
      const TOKEN_ONE_DEALER = Base64.encode(tokenOne_dealer)
      const TOKEN_TWO_DEALER = Base64.encode(tokenTwo_dealer)
      const token3 = { TOKEN_ONE_DEALER, TOKEN_TWO_DEALER }

      sessionStorage.setItem("topup3", JSON.stringify(token3))
      return {
        ...state,
        // loginDets: payload,
        isError: false,
        authError: "",
        logError: [],
      }
    case LOGIN_ADMIN:
      let tokenOneAdmin = payload.username
      let tokenTwoAdmin = payload.password
      const TOKEN_ONE_ADMIN = Base64.encode(tokenOneAdmin)
      const TOKEN_TWO_ADMIN = Base64.encode(tokenTwoAdmin)
      const tokenAdmin = { TOKEN_ONE_ADMIN, TOKEN_TWO_ADMIN }

      sessionStorage.setItem("topup2", JSON.stringify(tokenAdmin))
      return {
        ...state,
        // loginDets: payload,
        isError: false,
        authError: "",
        logError: [],
      }
    case LOGIN_ERROR:
      return { ...state, logError: payload }
    case AUTH_ERROR:
      return { ...state, authError: payload, isError: true }
    case LOGIN_SUCCESS:
      localStorage.setItem("userData", JSON.stringify(payload))
      window.location = "/Dealer_Dashboard/Dashboard/"
      return {
        ...state,
        userData: payload,
        isLogged: true,
        logError: [],
        authError: "",
        isError: false,
        type: "patner",
      }
    case LOGIN_SUCCESS_DEALER:
      const data = { payload, type: "subDealer" }
      localStorage.setItem("userData", JSON.stringify(data))
      window.location = "/Sub_Dealer/Dashboard/"
      return {
        ...state,
        userData: payload,
        isLogged: true,
        logError: [],
        authError: "",
        isError: false,
      }
    case LOGIN_SUCCESS_ADMIN:
      let load = payload
      const dataAdmin = { ...load, type: "Admin", username: "ADMIN" }
      localStorage.setItem("userData", JSON.stringify(dataAdmin))
      window.location = "/Admin_Dashboard/Dashboard/"
      return {
        ...state,
        userData: payload,
        isLogged: true,
        logError: [],
        authError: "",
        isError: false,
      }
    case RETAILER:
      return { ...state, retailer: payload }
    case TRANSACTIONS:
      return { ...state, transactions: payload }

    default:
      return state
  }
}
// const reducers = combineReducers({
//   rootReducer,
// })

export default rootReducer

import { actionType } from "../Actions/ActionsType"
import { combineReducers } from "redux"

const {
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  TOKEN_FORM,
  LOGIN_USER,
} = actionType

const initialState = {
  email: "",
  isLogged: false,
  userData: {},
  registration: false,
  registrationMessage: "",
  regError: "",
  tokenForm: false,
}

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTRATION_SUCCESS:
      return { ...state, registrationMessage: payload, registration: true }
    case REGISTRATION_ERROR:
      return { ...state, regError: payload, registration: false }
    case LOGIN_ERROR:
      return { ...state, hobby: payload }
    case LOGIN_SUCCESS:
      return { ...state, userData: payload, isLogged: true }
    case TOKEN_FORM:
      return { ...state, tokenForm: true }
    // case LOGIN_USER:
    //   console.log(payload)
    default:
      return state
  }
}

const reducers = combineReducers({
  rootReducer,
})

export default reducers

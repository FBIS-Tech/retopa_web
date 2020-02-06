import { actionType } from "./ActionsType"

const {
  REGISTER_USER,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  LOGIN_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  TOKEN_FORM,
  AUTH_ERROR,
  CLEAR,
  RETAILER,
  LOGIN_DEALER,
  LOGIN_SUCCESS_DEALER,
} = actionType

export const registerUser = payload => ({
  payload,
  type: REGISTER_USER,
})

export const registrationSuccess = payload => ({
  type: REGISTRATION_SUCCESS,
  payload,
})
export const registrationError = payload => ({
  type: REGISTRATION_ERROR,
  payload,
})
export const UserLogin = payload => ({
  type: LOGIN_USER,
  payload,
})
export const DealerLogin = payload => ({
  type: LOGIN_DEALER,
  payload,
})

export const loginError = payload => ({
  type: LOGIN_ERROR,
  payload,
})
export const AuthError = payload => ({
  type: AUTH_ERROR,
  payload,
})
export const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload,
})
export const loginDealerSuccess = payload => ({
  type: LOGIN_SUCCESS_DEALER,
  payload,
})
export const openTokenForm = payload => ({
  type: TOKEN_FORM,
})
export const clearError = payload => ({
  type: CLEAR,
})
export const retailerDetails = payload => ({
  type: RETAILER,
  payload,
})

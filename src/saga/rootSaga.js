import {
  put,
  take,
  fork,
  takeEvery,
  call,
  takeLatest,
  eventChannel,
} from "redux-saga/effects"
import Instance from "../Api/Instance"
import TradePatnerLogin from "../Api/TradePatnerLogin"
import SubdealerApi from "../Api/SubdealerApi"
import AdminLoginInstance from "../Api/AdminLoginInstance"
// import { actionType } from "../actions/ActionType"
import {
  registrationSuccess,
  registrationError,
  loginError,
  loginSuccess,
  AuthError,
  loginDealerSuccess,
  adminDealerSuccess,
} from "../Actions/Actions.js"
import { actionType } from "../Actions/ActionsType"
import { Base64 } from "js-base64"
import axios from "axios"
const { REGISTER_USER, LOGIN_USER, LOGIN_DEALER, LOGIN_ADMIN } = actionType

function* registerUsers({ payload }) {
  try {
    const request = yield Instance.post("user/register", payload)

    if (request.status === 200) {
      let data = request.data
      let s = data.statuscode
      if (s === 400) {
        let err = data.error
        yield put(registrationError(err))
      } else {
        let m = data.message
        yield put(registrationSuccess(m))
      }
    }
  } catch (err) {
    alert(err)
    yield put({ type: "ERROR" })
    alert("something went wrong, Please check that you are connected")
  }
}

function* userLogin({ payload }) {
  try {
    const request = yield TradePatnerLogin.post("", payload)
    // ////console.log(request)
    // return false
    let s = request.data.status
    let d = request.data
    let ae = request.data.message
    let m = request.data.required_fields
    if (s === "200") {
      yield put(loginSuccess(d))
    } else if (s === "301") {
      yield put(loginError(m))
      yield put(
        setTimeout(() => {
          loginError(" ")
        }, 3000)
      )
    } else {
      yield put(AuthError(ae))
      yield put(
        setTimeout(() => {
          AuthError(" ")
        }, 3000)
      )
    }
  } catch (err) {
    ////console.log(err)
    yield put({ type: "ERROR" })
    // alert("something went wrong, Please check that you are connected")
  }
}
function* dealerLogin({ payload }) {
  try {
    const request = yield SubdealerApi.post("", payload)
    console.log(request)
    let s = request.data.status
    let d = request.data
    let ae = request.data.message
    let m = request.data.required_fields
    if (s === "200") {
      yield put(loginDealerSuccess(d))
    } else if (s === "301") {
      yield put(loginError(m))
      yield put(
        setTimeout(() => {
          loginError(" ")
        }, 3000)
      )
    } else {
      yield put(AuthError(ae))
      yield put(
        setTimeout(() => {
          AuthError(" ")
        }, 3000)
      )
    }
  } catch (err) {
    ////console.log(err)
    yield put({ type: "ERROR" })
    // alert("something went wrong, Please check that you are connected")
  }
}
function* adminLogin({ payload }) {
  try {
    const request = yield AdminLoginInstance.post("", payload)
    let s = request.data.status
    let d = request.data
    let ae = request.data.message
    // //console.log(m)
    // //console.log(ae, "ae")
    if (s === "200") {
      yield put(adminDealerSuccess(d))
    } else if (s === "401") {
      yield put(AuthError(ae))
      yield put(
        setTimeout(() => {
          AuthError(" ")
        }, 3000)
      )
    } else {
      yield put(AuthError(ae))
      yield put(
        setTimeout(() => {
          AuthError(" ")
        }, 3000)
      )
    }
  } catch (err) {
    ////console.log(err)
    yield put({ type: "ERROR" })
    // alert("something went wrong, Please check that you are connected")
  }
}

export default function* saga() {
  yield takeEvery(REGISTER_USER, registerUsers)
  yield takeEvery(LOGIN_USER, userLogin)
  yield takeEvery(LOGIN_DEALER, dealerLogin)
  yield takeEvery(LOGIN_ADMIN, adminLogin)
  // yield fork(startListener)
}

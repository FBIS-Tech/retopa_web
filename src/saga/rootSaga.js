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
// import { actionType } from "../actions/ActionType"
import {
  registrationSuccess,
  registrationError,
  loginError,
  loginSuccess,
  AuthError,
} from "../Actions/Actions.js"
import { actionType } from "../Actions/ActionsType"
import { Base64 } from "js-base64"
const { REGISTER_USER, LOGIN_USER } = actionType

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
    console.log(err)
    yield put({ type: "ERROR" })
    alert("something went wrong, Please check that you are connected")
  }
}

function* userLogin({ payload }) {
  try {
    const request = yield Instance.post("", payload)
    // console.log(request)
    // return false
    let s = request.data.status
    let d = request.data
    let ae = request.data.message
    let m = request.data.required_fields
    if (s === "200") {
      yield put(loginSuccess(d))
    } else if (s === "301") {
      yield put(loginError(m))
    } else {
      yield put(AuthError(ae))
      yield put(
        setTimeout(() => {
          AuthError(" ")
        }, 3000)
      )
    }
  } catch (err) {
    console.log(err)
    yield put({ type: "ERROR" })
    // alert("something went wrong, Please check that you are connected")
  }
}

function* startListener() {
  let onLogged = sessionStorage.getItem("persist:root")
    ? JSON.parse(sessionStorage.getItem("persist:root"))
    : []
  const { userData } = onLogged
  let allData = JSON.parse(userData)
  const { user_id } = allData

  // gets tokens
  let data = sessionStorage.getItem("topup")
    ? JSON.parse(sessionStorage.getItem("topup"))
    : []
  const username = Base64.decode(data.TOKEN_ONE)
  const password = Base64.decode(data.TOKEN_TWO)
  const req = { serviceCode: "RTL", username, password, user_id }
  try {
    const request = yield Instance.post("", req)

    const data = yield take(request)
    console.log(data)
    const Data = Object.keys(data).map((i, j) => data[i])
    yield put({ type: "submit-Async", payload: Data.reverse() })
  } catch (err) {
    console.log(err)
    yield put({ type: "ERROR" })
    // alert("something went wrong, Please check that you are connected")
  }

  // #3
  // while (true) {
  //   const data = yield take(request)
  //   console.log(data)
  //   const Data = Object.keys(data).map((i, j) => data[i])
  //   yield put({ type: "submit-Async", payload: Data.reverse() })
  // }
}

export default function* saga() {
  yield takeEvery(REGISTER_USER, registerUsers)
  yield takeEvery(LOGIN_USER, userLogin)
  yield fork(startListener)
}

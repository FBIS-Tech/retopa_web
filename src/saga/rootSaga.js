import {
  put,
  take,
  fork,
  takeEvery,
  call,
  takeLatest,
} from "redux-saga/effects"
import Instance from "../Api/Instance"

// import { actionType } from "../actions/ActionType"
import {
  registrationSuccess,
  registrationError,
  loginError,
  loginSuccess,
} from "../Actions/Actions.js"
import { actionType } from "../Actions/ActionsType"
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
  console.log(payload)
  try {
    const request = yield Instance.post("user/login", payload)

    if (request.status === 200) {
      let data = request.data
      let s = data.statuscode
      if (s === 400) {
        let err = data.error
        yield put(loginError(err))
      } else {
        let m = data.message
        yield put(loginSuccess(m))
      }
    }
  } catch (err) {
    console.log(err)
    yield put({ type: "ERROR" })
    alert("something went wrong, Please check that you are connected")
  }
}
export default function* saga() {
  yield takeEvery(REGISTER_USER, registerUsers)
  yield takeEvery(LOGIN_USER, userLogin)
  //   yield fork(startListener);
}

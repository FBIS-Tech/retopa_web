import Cryptr from "cryptr"
export { default as wrapRootElement } from "./src/Reducers/ReduxWrapper.js"

export const onClientEntry = () => {
  window.onload = () => {
    const cryptr = new Cryptr("retopaToken")

    const TOKEN_ONE = cryptr.encrypt("tokenOne")
    const TOKEN_TWO = cryptr.encrypt("tokenTwo")
    const token = { TOKEN_ONE, TOKEN_TWO }
    sessionStorage.setItem("topup", JSON.stringify(token))
  }
}

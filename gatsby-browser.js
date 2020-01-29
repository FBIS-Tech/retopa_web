import { Base64 } from "js-base64"
export { default as wrapRootElement } from "./src/Reducers/ReduxWrapper.js"

export const onClientEntry = () => {
  window.onload = () => {
    const TOKEN_ONE = Base64.encode("tokenOne")
    const TOKEN_TWO = Base64.encode("tokenTwo")
    const token = { TOKEN_ONE, TOKEN_TWO }
    sessionStorage.setItem("topup", JSON.stringify(token))
  }
}

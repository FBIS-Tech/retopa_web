import { Base64 } from "js-base64"
export { default as wrapRootElement } from "./src/Reducers/ReduxWrapper.js"

export const onClientEntry = () => {
  window.onload = () => {
    let UserData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : []
    if (UserData.type === "Admin") {
      const TOKEN_ONE = Base64.encode("tokenOne")
      const TOKEN_TWO = Base64.encode("tokenTwo")
      const token = { TOKEN_ONE, TOKEN_TWO }
      sessionStorage.setItem("topup", JSON.stringify(token))
    } else {
      const TOKEN_ONE_ADMIN = Base64.encode("tokenOne")
      const TOKEN_TWO_ADMIN = Base64.encode("tokenTwo")
      const token2 = { TOKEN_ONE_ADMIN, TOKEN_TWO_ADMIN }
      sessionStorage.setItem("topup2", JSON.stringify(token2))
    }
  }
}

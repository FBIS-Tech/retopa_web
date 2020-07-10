import { Base64 } from "js-base64"
export { default as wrapRootElement } from "./src/Reducers/ReduxWrapper.js"

export const onClientEntry = () => {
  window.onload = () => {
    let UserData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : []

    if (UserData.type === "Admin" || UserData.type === "subDealer") {
      const TOKEN_ONE = Base64.encode("tokenOne")
      const TOKEN_TWO = Base64.encode("tokenTwo")
      const token = { TOKEN_ONE, TOKEN_TWO }
      sessionStorage.setItem("topup", JSON.stringify(token))
    } else if (UserData.type === "subDealer") {
      const TOKEN_ONE_DEALER = Base64.encode("tokenOne")
      const TOKEN_TWO_DEALER = Base64.encode("tokenTwo")
      const token3 = { TOKEN_ONE_DEALER, TOKEN_TWO_DEALER }
      sessionStorage.setItem("topup3", JSON.stringify(token3))
    } else {
      const TOKEN_ONE_ADMIN = Base64.encode("tokenOne")
      const TOKEN_TWO_ADMIN = Base64.encode("tokenTwo")
      const token2 = { TOKEN_ONE_ADMIN, TOKEN_TWO_ADMIN }
      sessionStorage.setItem("topup2", JSON.stringify(token2))
    }
  }
}

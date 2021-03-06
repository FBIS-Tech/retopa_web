import React from "react"
import "../scss/LoginCard.scss"
import { Link } from "gatsby"
import { Input, Button } from "antd"
import Face from "../../assets/colorfb.svg"
import Google from "../../assets/google.svg"

const LoginCardTwo = ({
  activea,
  activeb,
  activec,
  activate1,
  activate2,
  activate3,
  getInput,
  handleSubmit,
  loading,
}) => {
  return (
    <div className="Login_card">
      <div className={!activea ? "method" : "method2"}>
        <h4 className={activea ? "active" : ""} onClick={activate1}>
          LOGIN
        </h4>
      </div>
      <div className={activea ? "content" : "hide"}>
        <form>
          <div className="input">
            <label>Username</label>
            <Input
              placeholder="Enter email or Phone number"
              onChange={getInput}
              name="username"
            />
          </div>
          <div>
            <label>Password</label>
            <Input.Password
              placeholder="Password"
              onChange={getInput}
              name="password"
            />
          </div>
          <Link to="/PasswordReset">
            <h4 className="forgotPassword">Forgot Password?</h4>
          </Link>
          <div className="form_bottom">
            <h4>
              New user? <Link to="/SignUp">Create an account</Link>
            </h4>
            <Button onClick={handleSubmit} loading={loading}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginCardTwo

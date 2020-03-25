import React from "react"
import "../scss/LoginCard.scss"
import { Link } from "gatsby"
import { Input, Button } from "antd"
import Face from "../../assets/colorfb.svg"
import Google from "../../assets/google.svg"

const LoginCard = ({
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
      <div className="method">
        <h4 className={activeb ? "active" : ""} onClick={activate2}>
          Log In as a Partner{" "}
        </h4>
        <h4 className={activec ? "active" : ""} onClick={activate3}>
          Log In as a Sub Dealer
        </h4>
        <h4 className={activea ? "active" : ""} onClick={activate1}>
          Log In as a Admin
        </h4>
      </div>
      <div className="content">
        <form>
          <div className="input">
            <label>Email/Phone number</label>
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
          {/* <h4 className="socials">Log In through socials</h4> */}
          {/* <div className="social-logo">
            <div>
              <Google />
            </div>
            <div>
              <Face />
            </div>
          </div> */}
        </form>
      </div>
    </div>
  )
}

export default LoginCard

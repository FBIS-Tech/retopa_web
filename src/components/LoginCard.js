import React from "react"
import "../scss/LoginCard.scss"
import { Link } from "gatsby"
import { Input, Button } from "antd"
import Face from "../../assets/colorfb.svg"
import Google from "../../assets/google.svg"

const LoginCard = ({
  active,
  activate1,
  activate2,
  getEmail_Number,
  getPassword,
}) => {
  return (
    <div className="Login_card">
      <div className="method">
        <h4 className={active ? "active" : ""} onClick={activate1}>
          Log In as a Dealer{" "}
        </h4>
        <h4 className={active ? "" : "active"} onClick={activate2}>
          Log In as a consumer
        </h4>
      </div>
      <div className="content">
        <form>
          <div className="input">
            <label>Email/Phone number</label>
            <Input
              placeholder="Enter email or Phone number"
              onChange={getEmail_Number}
            />
          </div>
          <div>
            <label>Password</label>
            <Input.Password placeholder="Password" onChange={getPassword} />
          </div>
          <Link to="PasswordReset">
            <h4 className="forgotPassword">Forgot Password?</h4>
          </Link>
          <div class className="form_bottom">
            <h4>
              New user? <Link to="SignUp">Create an account</Link>
            </h4>
            <Button>Login</Button>
          </div>
          <h4 className="socials">Log In through socials</h4>
          <div className="social-logo">
            <div>
              <Google />
            </div>
            <div>
              <Face />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginCard

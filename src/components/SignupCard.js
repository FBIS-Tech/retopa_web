import React from "react"
import "../scss/LoginCard.scss"
import { Link } from "gatsby"
import { Input, Button } from "antd"
import Face from "../../assets/colorfb.svg"
import Google from "../../assets/google.svg"

const SignUpCard = ({ active, activate1, activate2 }) => {
  return (
    <div className="Login_card">
      <div className="method">
        <h4 className={active ? "active" : ""} onClick={activate1}>
          Sign Up as a Dealer{" "}
        </h4>
        <h4 className={active ? "" : "active"} onClick={activate2}>
          Sign Up as a consumer
        </h4>
      </div>
      <div className="content">
        <form>
          <div className="name">
            <div className="input">
              <label>First name</label>
              <Input placeholder="First name" />
            </div>
            <div className="input">
              <label>Last name</label>
              <Input placeholder="Last name" />
            </div>
          </div>
          <div className="input">
            <label>Email</label>
            <Input placeholder="Email" />
          </div>
          <div className="input">
            <label>Phone number</label>
            <Input placeholder="Enter mobile number" />
          </div>
          <div>
            <label>Password</label>
            <Input.Password placeholder="Password" />
          </div>
          {/* <h4 className="forgotPassword">Forget Password?</h4> */}
          <div class className="form_bottom">
            <h4>
              Existing user? <Link to="Login">Log In</Link>
            </h4>
            <Button>Sign up</Button>
          </div>
          <h4 className="socials">Sign Up through socials</h4>
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

export default SignUpCard

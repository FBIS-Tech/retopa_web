import React, { useState } from "react"
import RegLayout from "../components/RegistrationLayout/RegLayout"
import "../scss/Login.scss"
import { Checkbox } from "antd"
import SignUpCard from "../components/SignupCard"

const SignUp = () => {
  const [active, setActive] = useState(true)
  return (
    <RegLayout>
      <div className="Login_container">
        <h4 className="welcome">Create an account</h4>
        <h4 className="login_text">Sign Up to continue with Retopa</h4>
        <div>
          <SignUpCard
            active={active}
            activate1={() => {
              setActive(true)
            }}
            activate2={() => {
              setActive(false)
            }}
          />
        </div>
        <div className="end">
          <Checkbox>
            <h4 className="check">
              By clicking 'Sign up', you agree to Retopa{" "}
              <span>Terms of Use</span> and
              <span> Privacy Policy</span>
            </h4>
          </Checkbox>
        </div>
      </div>
    </RegLayout>
  )
}

export default SignUp

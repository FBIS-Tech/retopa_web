import React, { useState } from "react"
import RegLayout from "../components/RegistrationLayout/RegLayout"
import "../scss/Login.scss"
import LoginCard from "../components/LoginCard"

const Login = () => {
  const [active, setActive] = useState(true)
  return (
    <RegLayout>
      <div className="Login_container">
        <h4 className="welcome">Welcome back!</h4>
        <h4 className="login_text">Log In to continue</h4>
        <div>
          <LoginCard
            active={active}
            activate1={() => {
              setActive(true)
            }}
            activate2={() => {
              setActive(false)
            }}
          />
        </div>
        <h4 className="end">
          Having trouble signing in?<span>Contact support</span>
        </h4>
      </div>
    </RegLayout>
  )
}

export default Login

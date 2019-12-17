import React, { useState } from "react"
import RegLayout from "../components/RegistrationLayout/RegLayout"
import "../scss/Login.scss"
import { Form, Icon, Input, Button, Checkbox } from "antd"
import SignUpCard from "../components/SignupCard"
import ResetCard from "../components/ResetCard"

const PassWordReset = () => {
  const [active, setActive] = useState(true)
  return (
    <RegLayout>
      <div className="Login_container">
        <h4 className="welcome">Reset Password</h4>
        <h4 className="login_text_reset">
          Enter your Email address, A link to reset your password will be sent
          to you
        </h4>
        <div>
          <ResetCard
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
          Need help?<span> Contact support</span>
        </h4>
      </div>
    </RegLayout>
  )
}

export default PassWordReset

import React, { useState } from "react"
import RegLayout from "../components/RegistrationLayout/RegLayout"
import "../scss/Login.scss"
import { Form, Icon, Input, Button, Checkbox } from "antd"
import SignUpCard from "../components/SignupCard"
import ResetCard from "../components/ResetCard"
import NewPasswordCard from "../components/NewPasswordCard"

const NewPassword = () => {
  const [active, setActive] = useState(true)
  return (
    <RegLayout>
      <div className="Login_container">
        <h4 className="welcome">Reset Password</h4>
        <h4 className="login_text">Set your new password</h4>
        <div>
          <NewPasswordCard
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

export default NewPassword

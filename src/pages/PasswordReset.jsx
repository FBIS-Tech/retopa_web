import React from "react"
import RegLayout from "../components/RegistrationLayout/RegLayout"
import "../scss/Login.scss"
import ResetCard from "../components/ResetCard"

const PassWordReset = () => {
  return (
    <RegLayout>
      <div className="Login_container">
        <h4 className="welcome">Reset Password</h4>
        <h4 className="login_text">
          Enter your Email address, A link to reset your password will be sent
          to you
        </h4>
        <div>
          <ResetCard />
        </div>
        <h4 className="end">
          Need help?<span> Contact support</span>
        </h4>
      </div>
    </RegLayout>
  )
}

export default PassWordReset

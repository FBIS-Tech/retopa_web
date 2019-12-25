import React from "react"
import RegLayout from "../components/RegistrationLayout/RegLayout"
import "../scss/Login.scss"
import NewPasswordCard from "../components/NewPasswordCard"

const NewPassword = () => {
  return (
    <RegLayout>
      <div className="Login_container">
        <h4 className="welcome">Reset Password</h4>
        <h4 className="login_text">Set your new password</h4>
        <div>
          <NewPasswordCard />
        </div>
        <h4 className="end">
          Need help?<span> Contact support</span>
        </h4>
      </div>
    </RegLayout>
  )
}

export default NewPassword

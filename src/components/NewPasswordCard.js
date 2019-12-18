import React from "react"
import "../scss/LoginCard.scss"
import { Input, Button } from "antd"

const NewPasswordCard = () => {
  return (
    <div className="Login_card">
      <div className="content">
        <form>
          <div className="input input_reset">
            <label>New password</label>
            <Input placeholder="Password" />
          </div>
          <div className="input input_reset">
            <label>Confirm new password</label>
            <Input placeholder="Password" />
          </div>
          <div class className="form_bottom form_bottom_reset">
            <Button>Reset Password</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewPasswordCard

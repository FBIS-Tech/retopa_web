import React from "react"
import "../scss/LoginCard.scss"
import { Link } from "gatsby"
import { Input, Button } from "antd"
import Face from "../../assets/colorfb.svg"
import Google from "../../assets/google.svg"

const ResetCard = ({ active, activate1, activate2 }) => {
  return (
    <div className="Login_card">
      <div className="content">
        <form>
          <div className="input input_reset">
            <label>Email</label>
            <Input placeholder="Enter email here" />
          </div>
          <div class className="form_bottom form_bottom_reset">
            <Button>Send Reset Password</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetCard
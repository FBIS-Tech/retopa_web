import React from "react"
import "../scss/LoginCard.scss"
import "../scss/SuccessCard.scss"
import { Link } from "gatsby"
import { Button } from "antd"

const SuccessCard = ({ active, activate1, activate2 }) => {
  return (
    <div className="Login_card success_card">
      <div className="success_content">
        <h4>Successful</h4>
        <p>Password successfully updated</p>
        <Link to="Login">
          <Button>log In</Button>
        </Link>
      </div>
    </div>
  )
}

export default SuccessCard

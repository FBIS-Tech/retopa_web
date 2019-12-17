import React, { useState } from "react"
import RegLayout from "../components/RegistrationLayout/RegLayout"
import "../scss/Login.scss"
import SuccessCard from "../components/SuccessCard"

const Login = () => {
  const [active, setActive] = useState(true)
  return (
    <RegLayout>
      <div className="Login_container">
        <div>
          <SuccessCard />
        </div>
      </div>
    </RegLayout>
  )
}

export default Login
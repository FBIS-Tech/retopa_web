import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import RegLayout from "../components/RegistrationLayout/RegLayout"
import "../scss/Login.scss"
import LoginCard from "../components/LoginCard"
import { UserLogin } from "../Actions/Actions"
import Cryptr from "cryptr"

const Login = () => {
  const [active, setActive] = useState(true)
  const [inputChange, setInput] = useState({ serviceCode: "LGN" })

  const { logError, authError, isError } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleInputChange = e => {
    setInput({
      ...inputChange,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  return (
    <RegLayout>
      <div className="Login_container">
        <h4 className="welcome">Welcome back!</h4>

        <h4 className="login_text">Log In to continue</h4>
        {logError.map(data => {
          return (
            <div key={data} className="error">
              {data}
            </div>
          )
        })}
        <div className={!isError ? "hide" : "error"}>{authError}</div>
        <div>
          <LoginCard
            active={active}
            activate1={() => {
              setActive(true)
            }}
            activate2={() => {
              setActive(false)
            }}
            getInput={handleInputChange}
            handleSubmit={() => dispatch(UserLogin(inputChange))}
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

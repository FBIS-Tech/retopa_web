import React, { useState, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import RegLayout from "../components/RegistrationLayout/RegLayout"
import "../scss/Login.scss"
import LoginCard from "../components/LoginCard"
import { UserLogin, DealerLogin } from "../Actions/Actions"

const Login = () => {
  const [active, setActive] = useState(true)
  const [loading, setLoading] = useState(false)
  const [inputChange, setInput] = useState({ serviceCode: "LGN" })

  const { logError, authError, isError } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleInputChange = e => {
    setInput({
      ...inputChange,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  const handleDispatch = () => {
    if (active) {
      dispatch(UserLogin(inputChange))
      setLoading(true)
    } else {
      dispatch(DealerLogin(inputChange))
      setLoading(true)
    }
  }

  useMemo(() => setLoading(false), [logError])
  useMemo(() => setLoading(false), [authError])

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
            loading={loading}
            active={active}
            activate1={() => {
              setActive(true)
            }}
            activate2={() => {
              setActive(false)
            }}
            getInput={handleInputChange}
            handleSubmit={handleDispatch}
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

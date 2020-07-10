import React, { useState, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import RegLayout from "../components/RegistrationLayout/RegLayout"
import "../scss/Login.scss"
import LoginCard from "../components/LoginCard"
import { UserLogin, DealerLogin, AdminLogin } from "../Actions/Actions"

const Login = () => {
  const [active, setActive] = useState(false)
  const [active2, setActive2] = useState(true)
  const [active3, setActive3] = useState(false)
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
    setLoading(true)
    if (active2) {
      dispatch(UserLogin(inputChange))
    } else if (active3) {
      dispatch(DealerLogin(inputChange))
    } else if (active) {
      dispatch(AdminLogin(inputChange))
    }
  }

  // useMemo(() => setLoading(false), [logError])
  // useMemo(() => setLoading(false), [authError])

  const handleAdmin = () => {
    setActive(true)
    setActive2(false)
    setActive3(false)
  }
  const handleDealer = () => {
    setActive(false)
    setActive2(true)
    setActive3(false)
  }
  const handleSubDealer = () => {
    setActive(false)
    setActive2(false)
    setActive3(true)
  }

  useEffect(() => {
    if (logError.length > 0 || authError !== "") {
      setLoading(false)
    }
  }, [logError, authError])

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
            activea={active}
            activeb={active2}
            activec={active3}
            activate1={handleAdmin}
            activate2={handleDealer}
            activate3={handleSubDealer}
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

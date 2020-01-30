import React, { useState, useEffect } from "react"
import { Drawer, Button, Icon } from "antd"
import Logo from "../../assets/logo.svg"
import "./Layout/Layout.scss"
// import { Link } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Link from "gatsby-plugin-transition-link"
const windowGlobal = typeof window !== "undefined" && window
export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState("")
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    let onLogged = sessionStorage.getItem("persist:root")
      ? JSON.parse(sessionStorage.getItem("persist:root"))
      : []
    let status = onLogged.isLogged

    if (status === "true") {
      // navigate("/Login")
      setLogged(true)
      return false
    }
  }, [])
  const handleScroll = () => {
    setPosition(windowGlobal.pageYOffset)
  }

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  return (
    <>
      <div className={position > 57 ? "nav_container_fixed" : "nav_container"}>
        <div className="drawer_top">
          <AniLink swipe top="exit" duration={0.45} to="/">
            <Logo />
          </AniLink>

          <div className="menu">
            <Icon
              type={!visible ? "menu" : "close"}
              style={{ fontSize: "20px", color: "#227F00", fontWeight: "bold" }}
              onClick={showDrawer}
            />
          </div>
          <div className="main_nav">
            <AniLink swipe top="exit" duration={0.45} to="/">
              <h3>Home</h3>
            </AniLink>
            <AniLink swipe top="exit" duration={0.45}>
              <h3>About us</h3>
            </AniLink>
            <AniLink swipe top="exit" duration={0.45}>
              <h3>Plans</h3>
            </AniLink>
            <AniLink swipe top="exit" duration={0.45} to="FAQ">
              <h3>FAQ</h3>
            </AniLink>
            <AniLink swipe top="exit" duration={0.45} to="ContactUs">
              <h3>Contact us</h3>
            </AniLink>

            <Button className={!logged ? "login_btn" : "hide"}>
              <AniLink swipe top="exit" duration={0.45} to="Login">
                Log In
              </AniLink>
            </Button>
            <Button className={!logged ? "signup_btn" : "hide"}>
              <AniLink swipe top="exit" duration={0.45} to="SignUp">
                Sign Up
              </AniLink>
            </Button>
            <Button className={logged ? "login_btn" : "hide"}>
              <AniLink
                swipe
                top="exit"
                duration={0.45}
                to="Dealer_Dashboard/Dashboard"
              >
                Dashboard
              </AniLink>
            </Button>
            <Button
              className={logged ? "signup_btn" : "hide"}
              onClick={() => {
                localStorage.clear()
                sessionStorage.clear()
              }}
            >
              <AniLink swipe top="exit" duration={0.45} to="Login">
                Logout
              </AniLink>
            </Button>
          </div>
        </div>

        <Drawer
          title={<Logo />}
          placement="left"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <div className="drawer_links">
            <Link to="/">
              <h6>Home</h6>
            </Link>
            <Link>
              <h6>About us</h6>
            </Link>
            <Link>
              <h6>Plans</h6>
            </Link>
            <Link to="FAQ">
              <h6>FAQ</h6>
            </Link>
            <Link to="ContactUs">
              <h6>Contact us</h6>
            </Link>

            <Link to="Login">
              <h6>Log In</h6>
            </Link>

            <Link to="SignUp">
              <h6>Sign Up</h6>
            </Link>
          </div>
        </Drawer>
      </div>
    </>
  )
}

import React, { useState } from "react"
import { Drawer, Button, Icon } from "antd"
import Logo from "../../assets/logo.svg"
import "./Layout/Layout.scss"
// import { Link } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import TransitionLink from "gatsby-plugin-transition-link"
import Link from "gatsby-plugin-transition-link"

export default function Navbar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  return (
    <>
      <div className="nav_container">
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

            <Button className="login_btn">
              <AniLink swipe top="exit" duration={0.45} to="Login">
                Log In
              </AniLink>
            </Button>
            <Button className="signup_btn">
              <AniLink swipe top="exit" duration={0.45} to="SignUp">
                Sign Up
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
          <Link>
            <Icon type="home" /> Home
          </Link>
          <h3>About us</h3>
          <h3>Plans</h3>
          <h3>FAQ</h3>
          <h3>Log In</h3>
          <h3>Sign Up</h3>
        </Drawer>
      </div>
    </>
  )
}

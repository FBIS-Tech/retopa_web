import React, { useState } from "react"
import { Drawer, Button, Icon } from "antd"
import Logo from "../../assets/logo.svg"
import "./Layout/Layout.scss"
import { Link } from "gatsby"

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
          <Logo />
          <div className="menu">
            <Icon
              type={!visible ? "menu" : "close"}
              style={{ fontSize: "20px", color: "#227F00", fontWeight: "bold" }}
              onClick={showDrawer}
            />
          </div>
          <div className="main_nav">
            <Link>
              <h3>Home</h3>
            </Link>
            <Link>
              <h3>About us</h3>
            </Link>
            <Link>
              <h3>Plans</h3>
            </Link>
            <Link>
              <h3>FAQ</h3>
            </Link>
            <Link>
              <h3>Contact us</h3>
            </Link>

            <Button className="login_btn">
              <Link to="Login">Log In</Link>
            </Button>
            <Button className="signup_btn">
              <Link to="SignUp">Sign Up</Link>
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

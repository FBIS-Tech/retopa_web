import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Layout, Menu, Icon, Button, Input, Dropdown } from "antd"
import { Link, navigate } from "gatsby"
import Logo from "../../../assets/logo.svg"
import "./DashLayout.scss"
import Avatar from "../../../assets/avatartwo.svg"
import Setting from "../../../assets/settings.svg"
import Helmet from "react-helmet"
import Favicon from "../../images/favicon.ico"
import { Base64 } from "js-base64"
import {
  HomeIcon,
  AirtimeIcon,
  BillIcon,
  VoucherIcon,
  HistoryIcon,
  PaymentIcon,
  LogoutIcon,
  RetailIcon,
  WalletIcon,
  AdminIcon,
  ExportIcon,
} from "../CustomIcons"
import Instance from "../../Api/Instance"
import { DownOutlined } from "@ant-design/icons"

const { Header, Content, Sider } = Layout

const Dash_home_icon = props => <Icon component={HomeIcon} {...props} />
const Dash_airtime_icon = props => <Icon component={RetailIcon} {...props} />
const Dash_bill_icon = props => <Icon component={WalletIcon} {...props} />
const Dash_voucher_icon = props => <Icon component={VoucherIcon} {...props} />
const Dash_history_icon = props => <Icon component={HistoryIcon} {...props} />
const Dash_payment_icon = props => <Icon component={PaymentIcon} {...props} />
const Dash_logout_icon = props => <Icon component={LogoutIcon} {...props} />
const Dash_admin_icon = props => <Icon component={AdminIcon} {...props} />
const Dash_export_icon = props => <Icon component={ExportIcon} {...props} />

const AdminLayout = ({
  children,
  handleHome,
  handleRetailer,
  handleHistory,
  handlePayment,
  handleAdmin,
  title,
  handleBilling,
  handleExport,
  handleVoucher,
  position,
}) => {
  const [user, setUser] = useState({})
  const [userA, setUserA] = useState({})
  const [type, setType] = useState("")
  useEffect(() => {
    let data = sessionStorage.getItem("topup")
      ? JSON.parse(sessionStorage.getItem("topup"))
      : []
    let UserData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : []

    const { user_id } = UserData
    setType(UserData.admintype)
    if (UserData === undefined) {
      return false
    } else {
      setUserA(UserData)
    }
    const username = Base64.decode(data.TOKEN_ONE)
    const password = Base64.decode(data.TOKEN_TWO)
    const req = { serviceCode: "SHP", username, password, user_id }
    const profile = new Promise(res => {
      res(Instance.post("", req))
    })
    profile.then(({ data }) => {
      let user = data.user
      if (user === undefined) {
        return false
      } else {
        setUser(user)
      }
    })
  }, [])

  //menu list

  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={() => {
          navigate("/Admin_Dashboard/Settings")
        }}
      >
        <a>Change Password</a>
      </Menu.Item>
    </Menu>
  )

  // handle logout
  const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    navigate("/Login")
  }

  // setting date
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, "0")
  let mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  let yyyy = today.getFullYear()

  today = dd + "/" + mm + "/" + yyyy

  return (
    <Layout>
      <Helmet>
        <link rel="icon" href={Favicon} />
      </Helmet>
      <Sider breakpoint="lg" collapsedWidth="0" className="dealer_layout_side">
        <div className="logo">
          <div className="logo_content">
            <Link to="/">
              <Logo />
            </Link>
          </div>
        </div>
        <div className="user_name">
          <span>Hello</span>{" "}
          <span>{user.username === undefined ? "ADMIN" : user.username}</span>
        </div>
        <Menu mode="inline" defaultSelectedKeys={position}>
          {type === "adminA" ? (
            <Menu.Item
              key="1"
              onClick={() => {
                navigate("/Admin_Dashboard/Dashboard")
              }}
              className={type === "adminB" ? "hide" : ""}
            >
              <Dash_home_icon />
              <span className="nav-text">Home</span>
            </Menu.Item>
          ) : (
            <Menu.Item
              key="1"
              onClick={() => {
                navigate("/Admin_Dashboard/Dashboard")
              }}
              className={type === "adminB" ? "" : "hide "}
            >
              <Dash_history_icon />
              <span className="nav-text">Transactions</span>
            </Menu.Item>
          )}
          {type === "adminA" && (
            <Menu.Item
              key="3"
              onClick={() => {
                navigate("/Admin_Dashboard/RetailerList")
              }}
              className={type === "adminB" ? "hide" : ""}
            >
              <Dash_history_icon />
              <span className="nav-text">Retailers</span>
            </Menu.Item>
          )}

          <Menu.Item
            key="2"
            onClick={() => {
              navigate("/Admin_Dashboard/Retailers")
            }}
            className={type === "adminB" ? "" : "hide "}
          >
            <Dash_history_icon />
            <span className="nav-text">Retailers</span>
          </Menu.Item>

          <Menu.Item key="7" onClick={handleLogout}>
            <Dash_logout_icon />
            <span className="nav-text">Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <div className="headersss dealer_header">
          <Header>
            <div className="header_left dealerHeader">
              <h4>
                {type === "adminB"
                  ? "Support Dashboard"
                  : "Administrative Dashboard"}
              </h4>
            </div>
            <div className="header_right">
              {/* <Input
                placeholder="Search Here"
                prefix={<Icon type="search" />}
              /> */}
              <Avatar style={{ marginLeft: "50px" }} />
              <Dropdown overlay={menu}>
                <div
                  className="ant-dropdown-link"
                  onClick={e => e.preventDefault()}
                >
                  <Setting style={{ marginLeft: "30px" }} />
                </div>
              </Dropdown>
            </div>
          </Header>
          <Header className="sub_header">
            <div className="sub_header_left">
              <h4 className="dealer_title">{title}</h4>
            </div>
            <div className="sub_header_right dealerDashDate">{today}</div>
          </Header>
        </div>
        <Content>
          <div className="dash_children dealer_children">{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AdminLayout

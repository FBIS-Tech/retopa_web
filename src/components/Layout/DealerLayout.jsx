import React from "react"
import PropTypes from "prop-types"
import { Layout, Menu, Icon, Button, Input } from "antd"
import { Link } from "gatsby"
import Logo from "../../../assets/logo.svg"
import "./DashLayout.scss"
import Dash from "../../../assets/dash.svg"
import Avatar from "../../../assets/avatartwo.svg"
import Setting from "../../../assets/settings.svg"
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

const DealerLayout = ({
  children,
  handleHome,
  handleRetailer,
  handleHistory,
  handlePayment,
  handleAdmin,
  title,
  handleBilling,
  handleExport,
}) => {
  // setting date
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, "0")
  let mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  let yyyy = today.getFullYear()

  today = dd + "/" + mm + "/" + yyyy
  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0" className="dealer_layout_side">
        <div className="logo">
          <div className="logo_content">
            <Link to="/">
              <Logo />
            </Link>
          </div>
        </div>
        <div className="user_name">
          <span>Hello</span> <span>Kehinde</span>
        </div>
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" onClick={handleHome}>
            <Dash_home_icon />
            <span className="nav-text">Home</span>
          </Menu.Item>
          <Menu.Item key="8" onClick={handleAdmin}>
            <Dash_admin_icon />
            <span className="nav-text">Admin</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={handleRetailer}>
            <Dash_airtime_icon />
            <span className="nav-text">Retailer</span>
          </Menu.Item>
          <Menu.Item key="3" onClick={handleBilling}>
            <Dash_bill_icon />
            <span className="nav-text">Wallet</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Dash_voucher_icon />
            <span className="nav-text">Voucher</span>
          </Menu.Item>
          <Menu.Item key="5" onClick={handleHistory}>
            <Dash_history_icon />
            <span className="nav-text">History</span>
          </Menu.Item>
          <Menu.Item key="6" onClick={handlePayment}>
            <Dash_payment_icon />
            <span className="nav-text">Payment</span>
          </Menu.Item>
          <Menu.Item key="9" onClick={handleExport}>
            <Dash_export_icon />
            <span className="nav-text">Export Data</span>
          </Menu.Item>
          <Menu.Item key="7">
            <Dash_logout_icon />
            <span className="nav-text">Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <div className="headersss dealer_header">
          <Header>
            <div className="header_left dealerHeader">
              <h4>Administrative Dashboard</h4>
            </div>
            <div className="header_right">
              <Input
                placeholder="Search Here"
                prefix={<Icon type="search" />}
              />
              <Avatar style={{ marginLeft: "50px" }} />
              <Setting style={{ marginLeft: "30px" }} />
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

DealerLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DealerLayout

import React from "react"
import PropTypes from "prop-types"
import { Layout, Menu, Icon, Button } from "antd"
import { Link } from "gatsby"
import Logo from "../../../assets/logo.svg"
import "./DashLayout.scss"
import Dash from "../../../assets/dash.svg"
import Avatar from "../../../assets/avatar.svg"
import Favicon from "../../images/favicon.ico"
import Helmet from "react-helmet"
import {
  HomeIcon,
  AirtimeIcon,
  BillIcon,
  VoucherIcon,
  HistoryIcon,
  PaymentIcon,
  LogoutIcon,
} from "../CustomIcons"
const { Header, Content, Sider } = Layout

const Dash_home_icon = props => <Icon component={HomeIcon} {...props} />
const Dash_airtime_icon = props => <Icon component={AirtimeIcon} {...props} />
const Dash_bill_icon = props => <Icon component={BillIcon} {...props} />
const Dash_voucher_icon = props => <Icon component={VoucherIcon} {...props} />
const Dash_history_icon = props => <Icon component={HistoryIcon} {...props} />
const Dash_payment_icon = props => <Icon component={PaymentIcon} {...props} />
const Dash_logout_icon = props => <Icon component={LogoutIcon} {...props} />

const DashLayout = ({
  children,
  handleHome,
  handleAirtime,
  handleHistory,
  handlePayment,
  title,
  handleBilling,
}) => {
  return (
    <Layout>
      <Helmet>
        <link rel="icon" href={Favicon} />
      </Helmet>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          ////console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          ////console.log(collapsed, type)
        }}
      >
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
          <Menu.Item key="2" onClick={handleAirtime}>
            <Dash_airtime_icon />
            <span className="nav-text">Airtime & Data</span>
          </Menu.Item>
          <Menu.Item key="3" onClick={handleBilling}>
            <Dash_bill_icon />
            <span className="nav-text">Bills Payment</span>
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
          <Menu.Item key="7">
            <Dash_logout_icon />
            <span className="nav-text">Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <div className="headersss">
          <Header>
            <div className="header_left">
              <Dash />
              <h4>Dashboard</h4>
            </div>
            <div className="header_right">
              <h3>Richard Eniola</h3>
              <Avatar />
              <Icon type="caret-down" />
            </div>
          </Header>
          <Header className="sub_header">
            <div className="sub_header_left">
              <h4>{title}</h4>
            </div>
            <div className="sub_header_right">
              <Button>Fund Account</Button>
            </div>
          </Header>
        </div>
        <Content>
          <div className="dash_children">{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

DashLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DashLayout

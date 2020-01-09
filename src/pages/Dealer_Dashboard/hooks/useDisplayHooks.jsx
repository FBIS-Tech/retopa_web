import React, { useState } from "react"
// import HomeIcon from "../../../../assets/dash_home.svg"
import { Icon } from "antd"
import {
  HomeIcon,
  AirtimeIcon,
  BillIcon,
  VoucherIcon,
  HistoryIcon,
  PaymentIcon,
  LogoutIcon,
} from "../../../components/CustomIcons"
// const { Header, Content, Sider } = Layout

const Dash_home_icon = props => <Icon component={HomeIcon} {...props} />
const Dash_airtime_icon = props => <Icon component={AirtimeIcon} {...props} />
const Dash_bill_icon = props => <Icon component={BillIcon} {...props} />
const Dash_voucher_icon = props => <Icon component={VoucherIcon} {...props} />
const Dash_history_icon = props => <Icon component={HistoryIcon} {...props} />
const Dash_payment_icon = props => <Icon component={PaymentIcon} {...props} />
const Dash_logout_icon = props => <Icon component={LogoutIcon} {...props} />

export default () => {
  const [title, setTitle] = useState(
    <h4>
      <Dash_home_icon style={{ marginRight: "10px" }} />
      Home
    </h4>
  )
  const [home, setHome] = useState(true)
  const [retailer, setRetailer] = useState(false)
  const [history, setHistory] = useState(false)
  const [payment, setPayment] = useState(false)
  const [billing, setBilling] = useState(false)

  const selectHome = () => {
    setTitle(
      <h4>
        <Dash_home_icon style={{ marginRight: "10px" }} />
        Home
      </h4>
    )
    setHome(true)
    setRetailer(false)
    setHistory(false)
    setPayment(false)
    setBilling(false)
  }
  const selectRetailer = () => {
    setTitle(
      <h4>
        <Dash_airtime_icon style={{ marginRight: "10px" }} />
        Retailer List
      </h4>
    )
    setHome(false)
    setRetailer(true)
    setHistory(false)
    setPayment(false)
    setBilling(false)
  }
  const selectHistory = () => {
    setTitle("Retailer Wallet")
    setHome(false)
    setRetailer(false)
    setHistory(true)
    setPayment(false)
    setBilling(false)
  }
  const selectPayment = () => {
    setTitle("Add Card")
    setHome(false)
    setRetailer(false)
    setHistory(false)
    setPayment(true)
    setBilling(false)
  }
  const selectBilling = () => {
    setTitle(
      <h4>
        <Dash_bill_icon style={{ marginRight: "10px" }} />
        Retailer Wallet
      </h4>
    )
    setHome(false)
    setRetailer(false)
    setHistory(false)
    setPayment(false)
    setBilling(true)
  }

  return [
    title,
    home,
    retailer,
    history,
    payment,
    billing,
    selectHome,
    selectRetailer,
    selectHistory,
    selectPayment,
    selectBilling,
  ]
}

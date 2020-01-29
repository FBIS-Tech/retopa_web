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
  WalletIcon,
  RetailIcon,
  AdminIcon,
  ExportIcon,
} from "../../../components/CustomIcons"
// const { Header, Content, Sider } = Layout

const Dash_home_icon = props => <Icon component={HomeIcon} {...props} />
const Dash_airtime_icon = props => <Icon component={RetailIcon} {...props} />
const Dash_bill_icon = props => <Icon component={WalletIcon} {...props} />
const Dash_admin_icon = props => <Icon component={AdminIcon} {...props} />
const Dash_voucher_icon = props => <Icon component={VoucherIcon} {...props} />
const Dash_history_icon = props => <Icon component={HistoryIcon} {...props} />
const Dash_export_icon = props => <Icon component={ExportIcon} {...props} />
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
  const [admin, setAdmin] = useState(false)
  const [exxport, setExport] = useState(false)
  const [voucher, setVoucher] = useState(false)

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
    setAdmin(false)
    setExport(false)
    setVoucher(false)
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
    setAdmin(false)
    setExport(false)
    setVoucher(false)
  }
  const selectHistory = () => {
    setTitle(
      <h4>
        <Dash_history_icon style={{ marginRight: "10px" }} />
        History
      </h4>
    )
    setHome(false)
    setRetailer(false)
    setHistory(true)
    setPayment(false)
    setBilling(false)
    setAdmin(false)
    setExport(false)
    setVoucher(false)
  }
  const selectPayment = () => {
    setTitle(
      <h4>
        <Dash_payment_icon style={{ marginRight: "10px", fontSize: "16px" }} />
        Payment
      </h4>
    )
    setHome(false)
    setRetailer(false)
    setHistory(false)
    setPayment(true)
    setBilling(false)
    setAdmin(false)
    setExport(false)
    setVoucher(false)
  }
  const selectBilling = () => {
    setTitle(
      <h4>
        <Dash_bill_icon style={{ marginRight: "10px" }} />
        Wallet
      </h4>
    )
    setHome(false)
    setRetailer(false)
    setHistory(false)
    setPayment(false)
    setBilling(true)
    setAdmin(false)
    setExport(false)
    setVoucher(false)
  }
  const selectAdmin = () => {
    setTitle(
      <h4>
        <Dash_admin_icon style={{ marginRight: "10px" }} />
        Admin
      </h4>
    )
    setHome(false)
    setRetailer(false)
    setHistory(false)
    setPayment(false)
    setBilling(false)
    setAdmin(true)
    setExport(false)
    setVoucher(false)
  }
  const selectExport = () => {
    setTitle(
      <h4>
        <Dash_export_icon style={{ marginRight: "10px" }} />
        Export Data
      </h4>
    )
    setHome(false)
    setRetailer(false)
    setHistory(false)
    setPayment(false)
    setBilling(false)
    setAdmin(false)
    setExport(true)
    setVoucher(false)
  }
  const selectVoucher = () => {
    setTitle(
      <h4>
        <Dash_voucher_icon style={{ marginRight: "10px" }} />
        Voucher
      </h4>
    )
    setHome(false)
    setRetailer(false)
    setHistory(false)
    setPayment(false)
    setBilling(false)
    setAdmin(false)
    setExport(false)
    setVoucher(true)
  }

  return [
    title,
    home,
    retailer,
    history,
    payment,
    billing,
    admin,
    exxport,
    voucher,
    selectHome,
    selectRetailer,
    selectHistory,
    selectPayment,
    selectBilling,
    selectAdmin,
    selectExport,
    selectVoucher,
  ]
}

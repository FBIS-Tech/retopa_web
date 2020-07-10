import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {
  topCardDetails,
  Dealer_Activities,
} from "../../components/Constants/DealerDashHome"
import DealerTopCards from "../../components/DealerTopCards"
import "../../scss/Dealer_home.scss"
import { Button, DatePicker, Select } from "antd"
import DealerActivities from "../../components/DealerActivities"
import Instance from "../../Api/Instance"
import { Base64 } from "js-base64"
import DealerLayout from "../../components/Layout/DealerLayout"
import { Link, navigate } from "gatsby"
import axios from "axios"
import AdminInstance from "../../Api/AdminInstance"
import { dispatchTransactions } from "../../Actions/Actions"
const { RangePicker } = DatePicker
const { Option } = Select

const Dealer_Home = () => {
  const [retailer, setRetailer] = useState([])
  const [user, setUser] = useState({})
  const [counter, setCounter] = useState("0")
  const [ussd, setUssd] = useState("0")
  const [ussdData, setUssdData] = useState([])
  const [voucherData, setVoucherData] = useState([])
  const [dataData, setDataData] = useState([])
  const [data, setData] = useState("0")
  const [voucher, setVoucher] = useState("0")
  const [type, setType] = useState("")
  const [tps, setTps] = useState([])
  const [date, setDate] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    //gets user details
    let onLogged = sessionStorage.getItem("persist:root")
      ? JSON.parse(sessionStorage.getItem("persist:root"))
      : []
    const { userData } = onLogged
    let allData = JSON.parse(userData)
    const { user_id } = allData

    // get usaer type

    let UserData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : []

    // gets tokens
    let data = sessionStorage.getItem("topup")
      ? JSON.parse(sessionStorage.getItem("topup"))
      : []
    let username = Base64.decode(data.TOKEN_ONE)
    let password = Base64.decode(data.TOKEN_TWO)

    // admin token
    let dataA = sessionStorage.getItem("topup2")
      ? JSON.parse(sessionStorage.getItem("topup2"))
      : []
    let usernameA = Base64.decode(dataA.TOKEN_ONE_ADMIN)
    let passwordA = Base64.decode(dataA.TOKEN_TWO_ADMIN)
    const req = { serviceCode: "RTL", username, password, user_id }

    // request for retailer list
    const request = new Promise(res => {
      res(Instance.post("", req))
    })
    request.then(({ data }) => {
      if (data.status === "200") {
        setRetailer(data.retailer)
      }
    })

    const reqs = { serviceCode: "SHP", username, password, user_id: "1" }
    const profile = new Promise(res => {
      res(Instance.post("", reqs))
    })
    profile.then(({ data }) => {
      let user = data.user
      //console.log(user)
      if (user === undefined) {
        return false
      } else {
        setUser(user)
        setCounter(user.counter)
      }
    })

    // total USSD
    const ussdReqst = {
      serviceCode: "RTRA",
      username,
      type: "USSD",
      password,
    }
    const USSD = new Promise(res => {
      res(Instance.post("", ussdReqst))
    })
    //console.log(ussdReqst)
    USSD.then(({ data }) => {
      let UssdAmt = data.totalamount
      setUssd(`₦ ${UssdAmt.toLocaleString()}`)
      setUssdData(data.transactions)
    })
    // total data
    const DataReqst = {
      serviceCode: "RTRA",
      username,
      type: "DATA",
      password,
    }
    const Data = new Promise(res => {
      res(Instance.post("", DataReqst))
    })
    Data.then(({ data }) => {
      let DataAmt = data.totalamount
      setData(`₦ ${DataAmt.toLocaleString()}`)
      setDataData(data.details)
    })
    // total voucher
    const VoucherReqst = {
      serviceCode: "RTRA",
      username,
      type: "VOUCHER",
      password,
    }
    const VOUCHER = new Promise(res => {
      res(Instance.post("", VoucherReqst))
    })
    VOUCHER.then(({ data }) => {
      let VoucherAmt = data.totalamount
      setCounter(data.details.length)
      setVoucher(`₦ ${VoucherAmt.toLocaleString()}`)
      setVoucherData(data.details)
    })
  }, [])

  function onChange(value, dateString) {
    setDate(dateString)
  }

  const Dealer_Activity = [
    { title: "Total Salse This Month ", price: "₦ 0" },
    { title: "Total Transactions Today", price: "₦ 0" },
    { title: "Total data transaction", price: data },
    // { title: "Total voucher transaction", price: voucher },
    // { title: "Total USSD transaction", price: ussd },
    // { title: "Total bills payment transaction", price: " ₦ 0" },
    // { title: "This month transaction", price: "₦ 0" },
  ]

  let transactionViews = { ussdData, dataData, voucherData }
  const viewClick = () => {
    dispatch(dispatchTransactions(transactionViews))
    navigate("/Dealer_Dashboard/ViewDetails")
  }

  return (
    <>
      <div className="dealer_home_container">
        <div className="dealer_home_group">
          <div className={type === "Admin" ? "hide" : "dash_dealer_top"}>
            {topCardDetails.map(data => {
              return (
                <DealerTopCards
                  number={retailer.length}
                  description={data.desc}
                  voucher={counter}
                />
              )
            })}
          </div>
          <div className="activity_container">
            <div className="top_activity_container">
              <h4>Activities</h4>
              {/* <Button>Add Retailer</Button> */}
            </div>
            <div className="all_activities_container">
              <div className="allActivityGroup">
                {Dealer_Activity.map(data => {
                  return (
                    <DealerActivities
                      title={data.title}
                      price={data.price}
                      viewClicked={viewClick}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dealer_Home

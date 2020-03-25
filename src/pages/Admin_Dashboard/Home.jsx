import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
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
import { Link, navigateTo } from "gatsby"
import axios from "axios"
import AdminInstance from "../../Api/AdminInstance"
import { dispatchTransactions } from "../../Actions/Actions"
const { RangePicker } = DatePicker
const { Option } = Select

const Home = () => {
  const [retailer, setRetailer] = useState([])
  const [vtu, setVtu] = useState("0")
  const [vtuData, setVtuData] = useState([])
  const [counter, setCounter] = useState("0")
  const [ussd, setUssd] = useState("0")
  const [ussdData, setUssdData] = useState([])
  const [data, setData] = useState("0")
  const [dataData, setDataData] = useState([])
  const [voucher, setVoucher] = useState("0")
  const [voucherData, setVoucherData] = useState([])
  const [type, setType] = useState("")
  const [tps, setTps] = useState([])
  const [date, setDate] = useState([])
  const [dets, setDets] = useState([])
  const [tp_id, setTp_id] = useState("")
  const [loading, setLoading] = useState(false)
  const [adminType, setAdminType] = useState("")

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

    setAdminType(UserData.admintype)

    // admin token
    let dataA = sessionStorage.getItem("topup2")
      ? JSON.parse(sessionStorage.getItem("topup2"))
      : []
    let usernameA = Base64.decode(dataA.TOKEN_ONE_ADMIN)
    let passwordA = Base64.decode(dataA.TOKEN_TWO_ADMIN)
    setDets([...dets, usernameA, passwordA])

    if (UserData.type === "Admin") {
      setLoading(true)
      // trade Partners
      const tpReqst = {
        serviceCode: "TRAL",
        username: usernameA,
        password: passwordA,
      }
      const tp = new Promise(res => {
        res(AdminInstance.post("", tpReqst))
      })
      tp.then(({ data }) => {
        setLoading(false)
        let Arry = data.tp_details
        setTps(Arry)
      })

      setType("Admin")
      // total USSD
      const ussdReqst = {
        serviceCode: "RTRA",
        username: usernameA,
        type: "USSD",
        password: passwordA,
      }

      const USSD = new Promise(res => {
        res(AdminInstance.post("", ussdReqst))
      })
      USSD.then(({ data }) => {
        let UssdAmount = data.totalamount
        setUssdData(data.transactions)
        setUssd(`₦ ${UssdAmount.toLocaleString()}`)
      })
      // total data
      const DataReqst = {
        serviceCode: "RTRA",
        username: usernameA,
        type: "DATA",
        password: passwordA,
      }
      const Data = new Promise(res => {
        res(AdminInstance.post("", DataReqst))
      })
      Data.then(({ data }) => {
        let DataAmount = data.totalamount
        setDataData(data.details)
        setData(`₦ ${DataAmount.toLocaleString()}`)
      })
      // total voucher
      const VoucherReqst = {
        serviceCode: "RTRA",
        username: usernameA,
        type: "VOUCHER",
        password: passwordA,
      }
      const VOUCHER = new Promise(res => {
        res(AdminInstance.post("", VoucherReqst))
      })
      VOUCHER.then(({ data }) => {
        let VoucherData = data.totalamount
        setVoucher(`₦ ${VoucherData.toLocaleString()}`)
        setCounter(data.details.length)
        setVoucherData(data.details)
      })
      let DataAmt = data.totalamount
    }
  }, [])

  function onChange(value, dateString) {
    let selectedDate = dateString
    const query = {
      serviceCode: "DATA",
      username: dets[0],
      password: dets[1],
      tp_id,
    }
    // total USSD
    const ussdReqst = {
      serviceCode: "SEARCH_tp",
      username: dets[0],
      password: dets[1],
      tp_id,
      from_date: selectedDate[0],
      to_date: selectedDate[1],
    }

    const USSD = new Promise(res => {
      res(AdminInstance.post("", ussdReqst))
    })
    USSD.then(({ data }) => {
      console.log(data)
      setUssdData(data.ussd_details)
      setUssd(`₦ ${data.totalussd.toLocaleString()}`)
      setDataData(data.data_details)
      setData(`₦ ${data.total_data.toLocaleString()}`)
      setVoucher(`₦ ${data.totalVoucher.toLocaleString()}`)
      setVoucherData(data.voucher_details)
      setVtu(`₦ ${data.total_vtu.toLocaleString()}`)
      setVtuData(data.vtu_details)
    })
  }

  const Dealer_Activity = [
    { title: "Total VTU Transactions", price: "₦ 0" },
    { title: "Total voucher transaction", price: voucher },
    { title: "Total USSD transaction", price: ussd },
    { title: "Total data transaction", price: data },
    { title: "Total bills payment transaction", price: " ₦ 0" },
    { title: "This month transaction", price: "₦ 0" },
  ]

  let transactionViews = { ussdData, dataData, voucherData }

  const viewClick = () => {
    dispatch(dispatchTransactions(transactionViews))
    navigateTo("/Admin_Dashboard/Transaction_Details")
  }

  return (
    <>
      <div className="dealer_home_container">
        <div className="dealer_home_group">
          {/* <div className={type === "Admin" ? "hide" : "dash_dealer_top"}>
            {topCardDetails.map(data => {
              return (
                <DealerTopCards
                  number={retailer.length}
                  description={data.desc}
                  voucher={counter}
                />
              )
            })}
          </div> */}
          <div className={type === "Admin" ? "topLayer" : "hide"}>
            <div
              className={
                type === "Admin" ? "dash_dealer_top dealerTopLayer" : "hide"
              }
            >
              <div className="select">
                <label style={{ color: "#227f00", padding: "10px 0px" }}>
                  Select Trade Partner:
                </label>
                <Select
                  defaultValue="All Trade Partner"
                  onChange={value => {
                    setTp_id(value)
                  }}
                  loading={loading}
                >
                  {tps.map(data => {
                    return (
                      <Option key={data.vendor_name} value={data.id}>
                        {data.name}
                      </Option>
                    )
                  })}
                </Select>
              </div>
              <div className="select">
                <label style={{ color: "#227f00", display: "block" }}>
                  Query Transaction by Date:
                </label>
                <RangePicker showTime onChange={onChange} />
              </div>
            </div>
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

export default Home

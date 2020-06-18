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
import { Link, navigate } from "gatsby"
import axios from "axios"
import AdminInstance from "../../Api/AdminInstance"
import { dispatchTransactions } from "../../Actions/Actions"
import moment from "moment"
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
  const [month, setMonth] = useState([])
  const [todayy, setToday] = useState([])

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

    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth()
    var firstDay = new Date(y, m, 1)
    var lastDay = new Date(y, m + 1, 0)
    const montReq = {
      serviceCode: "SEARCH_tp",
      username: usernameA,
      password: passwordA,
      tp_id,
      from_date: moment(firstDay).format(),
      to_date: moment(lastDay).format(),
    }

    const thisMonth = new Promise(res => {
      res(AdminInstance.post("", montReq))
    })
    thisMonth.then(({ data }) => {
      setMonth([
        {
          title: "Airtime Sales",
          price: `₦ ${data.totalussd.toLocaleString()}`,
        },
        {
          title: "Data Sales",
          price: `₦ ${data.total_data.toLocaleString()}`,
        },
      ])
    })
    // /////////////transactions today//////////////////////
    // date query

    let today = new Date()
    let dd = String(today.getDate()).padStart(2, "0")
    let mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
    let yyyy = today.getFullYear()

    today = new Date(y, m, dd)
    const todayReq = {
      serviceCode: "SEARCH_tp",
      username: usernameA,
      password: passwordA,
      tp_id,
      from_date: moment(today).format(),
      to_date: moment(today).format(),
    }

    const now = new Promise(res => {
      res(AdminInstance.post("", todayReq))
    })
    now.then(({ data }) => {
      setToday([
        {
          title: "Airtime Sales",
          price: `₦ ${data.totalussd.toLocaleString()}`,
        },
        {
          title: "Data Sales",
          price: `₦ ${data.total_data.toLocaleString()}`,
        },
      ])
    })
  }, [])

  function onChange(value, dateString) {
    setLoading(true)
    let selectedDate = dateString

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
      setLoading(false)
      setUssdData(data.ussd_details)
      setUssd(`₦ ${data.total_vtu.toLocaleString()}`)
      setDataData(data.data_details)
      setData(`₦ ${data.total_data.toLocaleString()}`)
      setVoucher(`₦ ${data.totalVoucher.toLocaleString()}`)
      setVoucherData(data.voucher_details)
      setVtu(`₦ ${data.total_vtu.toLocaleString()}`)
      setVtuData(data.vtu_details)
    })
  }

  const Dealer_Activity = [
    // { title: "Total Direct Top-Up Transactions", price: "₦ 0" },
    // { title: "Total voucher transaction", price: voucher },
    { title: "Airtime Sales", price: ussd },
    { title: "Data Sales", price: data },
    // { title: "Total bills payment transaction", price: " ₦ 0" },
  ]

  let transactionViews = { ussdData, dataData, voucherData }

  const viewClick = () => {
    dispatch(dispatchTransactions(transactionViews))
    navigate("/Admin_Dashboard/Transaction_Details")
  }

  const handletp = value => {
    setMonth([])
    setTp_id(value)
    setLoading(true)

    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth()
    var firstDay = new Date(y, m, 1)
    var lastDay = new Date(y, m + 1, 0)
    // total USSD
    const ussdReqst = {
      serviceCode: "SEARCH_tp",
      username: dets[0],
      password: dets[1],
      tp_id: value,
      from_date: moment(firstDay).format(),
      to_date: moment(lastDay).format(),
    }
    const USSD = new Promise(res => {
      res(AdminInstance.post("", ussdReqst))
    })
    USSD.then(({ data }) => {
      setMonth([
        {
          title: "Airtime Sales",
          price: `₦ ${data.total_vtu.toLocaleString()}`,
        },
        {
          title: "Data Sales",
          price: `₦ ${data.total_data.toLocaleString()}`,
        },
      ])
    })

    // /////////////transactions today//////////////////////
    // date query

    let today = new Date()
    let dd = String(today.getDate()).padStart(2, "0")
    let mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
    let yyyy = today.getFullYear()

    today = new Date(y, m, dd)
    const todayReq = {
      serviceCode: "SEARCH_tp",
      username: dets[0],
      password: dets[1],
      tp_id: value,
      from_date: moment(today).format(),
      to_date: moment(today).format(),
    }
    const overallReq = {
      serviceCode: "SEARCH_tp",
      username: dets[0],
      password: dets[1],
      tp_id: value,
      from_date: moment(
        new Date(new Date().getFullYear(), 0, 1, 0, 0, 0)
      ).format(),
      to_date: moment(
        new Date(new Date().getFullYear(), 11, 31, 0, 0, 0)
      ).format(),
    }

    const now = new Promise(res => {
      res(AdminInstance.post("", todayReq))
    })
    now.then(({ data }) => {
      setToday([
        {
          title: "Airtime Sales",
          price: `₦ ${data.total_vtu.toLocaleString()}`,
        },
        {
          title: "Data Sales",
          price: `₦ ${data.total_data.toLocaleString()}`,
        },
      ])
    })
    const overall = new Promise(res => {
      res(AdminInstance.post("", overallReq))
    })
    overall.then(({ data }) => {
      setLoading(false)
      setUssd(`₦ ${data.total_vtu.toLocaleString()}`)
      setData(`₦ ${data.total_data.toLocaleString()}`)
    })
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
                    handletp(value)
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
              <h4
                style={{ margin: "0px", color: "#227f00" }}
                className={loading ? "" : "hide"}
              >
                Loading...
              </h4>
              <div className="selected">
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
              {loading && (
                <h3
                  style={{
                    color: "green",
                    textAlign: "center",
                    padding: "20px",
                    margin: 0,
                  }}
                >
                  Please Wait ...
                </h3>
              )}
              {!loading && (
                <h3
                  style={{
                    color: "green",
                    textAlign: "center",
                    padding: "20px",
                    margin: 0,
                  }}
                >
                  Overall
                </h3>
              )}
              {!loading && (
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
              )}
              {!loading && (
                <h3 style={{ color: "green", textAlign: "center", margin: 0 }}>
                  This Month
                </h3>
              )}
              {!loading && (
                <div className="allActivityGroup">
                  {month.map(data => {
                    return (
                      <DealerActivities
                        title={data.title}
                        price={data.price}
                        viewClicked={viewClick}
                      />
                    )
                  })}
                </div>
              )}
              {!loading && (
                <h3 style={{ color: "green", textAlign: "center", margin: 0 }}>
                  Today
                </h3>
              )}
              {!loading && (
                <div className="allActivityGroup">
                  {todayy.map(data => {
                    return (
                      <DealerActivities
                        title={data.title}
                        price={data.price}
                        viewClicked={viewClick}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  topCardDetails,
  Dealer_Activities,
} from "../../components/Constants/DealerDashHome"
import DealerTopCards from "../../components/DealerTopCards"
import "../../scss/Dealer_home.scss"
import { Button, DatePicker, Select, Table, Tabs, Spin } from "antd"
import DealerActivities from "../../components/DealerActivities"
import Instance from "../../Api/Instance"
import { Base64 } from "js-base64"
import DealerLayout from "../../components/Layout/DealerLayout"
import { Link, navigate } from "gatsby"
import { CSVLink, CSVDownload } from "react-csv"
import axios from "axios"
import AdminInstance from "../../Api/AdminInstance"
import { dispatchTransactions, retailerDetails } from "../../Actions/Actions"
import moment from "moment"
import AdminLayout from "../../components/Layout/AdminLayout"
import Green from "../../../assets/green.svg"
import Red from "../../../assets/red.svg"
const { RangePicker } = DatePicker
const { Option } = Select
const { TabPane } = Tabs
const Home = () => {
  const [retailer, setRetailer] = useState([])
  const [vtu, setVtu] = useState("0")
  const [vtuData, setVtuData] = useState([])
  const [message, setMessage] = useState(" ")
  const [ussd, setUssd] = useState("0")
  const [log, setLog] = useState([])
  const [data, setData] = useState("0")
  const [dataData, setDataData] = useState([])
  const [voucher, setVoucher] = useState("0")
  const [voucherData, setVoucherData] = useState([])
  const [type, setType] = useState("")
  const [tps, setTps] = useState([])
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [dets, setDets] = useState([])
  const [tp_id, setTp_id] = useState("")
  const [dealer, setDealer] = useState("")
  const [loading, setLoading] = useState(false)
  const [adminType, setAdminType] = useState("")
  const [month, setMonth] = useState([])
  const [filteredInfo, setFilteredInfo] = useState(null)
  const [sortedInfo, setSortedInfo] = useState({
    order: "descend",
    columnKey: "ussd_status",
  })
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
        // setLoading(false)
        let Arry = data.tp_details
        setTps(Arry)
      })

      setType("Admin")

      var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth()
      let today = new Date()
      let dd = String(today.getDate()).padStart(2, "0")
      //   let mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
      //   let yyyy = today.getFullYear()

      today = new Date(y, m, dd)

      setStart(moment(today).format())
      setEnd(moment(today).format())

      const retailers = {
        serviceCode: "AADD",
        username: usernameA,
        password: passwordA,
        start: moment(today).format(),
        end: moment(today).format(),
      }
      const retail = new Promise(res => {
        res(AdminInstance.post("", retailers))
      })
      retail.then(({ data }) => {
        console.log(data)
        setRetailer(data.transaction)
        setLoading(false)
      })

      //**raw log */
      // const raw = {
      //   serviceCode: "XXL",
      //   username: usernameA,
      //   password: passwordA,
      // }
      // console.log(raw)
      // const logs = new Promise(res => {
      //   res(AdminInstance.post("", raw))
      // })
      // logs.then(({ data }) => {
      //   console.log(data)
      //   setLog(data.transaction)
      //   setLoading(false)
      // })
    }
  }, [])

  const handletp = value => {
    setRetailer([])
    // setTp_id(value)
    setDealer(value)
    setLoading(true)
    if (value === "all") {
      window.location.reload()
    } else {
      var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth()
      var firstDay = new Date(y, m, 1)
      var lastDay = new Date(y, m + 1, 0)
      // total USSD
      const RetailerReqst = {
        serviceCode: "AADD",
        username: dets[0],
        password: dets[1],
        dealer: value,
        start: start,
        end: end,
      }

      const list = new Promise(res => {
        res(AdminInstance.post("", RetailerReqst))
      })
      list.then(({ data }) => {
        if (data.status === "200") {
          console.log(data)
          setRetailer(data.transaction)
          setLoading(false)
        } else {
          setLoading(false)
          setMessage(data.message === "failled" ? "No Data Found" : " ")
          setTimeout(() => {
            setMessage(" ")
          }, 5000)
        }
      })
    }
  }

  //**retailer table column */
  const ColumnsTwo = [
    {
      title: "TRANSACTION_DATE",
      dataIndex: "date(ussd_transactions.created_at)",
      key: "date(ussd_transactions.created_at)",
    },
    {
      title: "RETAILER_MSISDN",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "DEALER_CODE",
      dataIndex: "mtn_tp_code",
      key: "mtn_tp_code",

      // render: text => <a>{text}</a>,
    },
    {
      title: "TRANSACTION_AMOUNT",
      dataIndex: "total_sales",
      key: "total_sales",
      // render: text => <a>{text}</a>,
    },
    {
      title: "TRANSACTION_TYPE",
      dataIndex: "total_sales",
      key: "description",
    },

    {
      title: "Action",
      dataIndex: "ussd_status",
      key: "ussd_status",

      render: (text, record) => (
        <a
          id={record.r_id}
          title={record.phone}
          className="enabledLog"
          onClick={e => {
            let details = {
              r_id: e.currentTarget.id,
              name: e.currentTarget.title,
              start: start,
              end: end,
              tp_id,
            }
            dispatch(retailerDetails(details))
            navigate(`/Admin_Dashboard/RetailerHistory`)
          }}
        >
          View Log
        </a>
      ),
    },
  ]
  const Columns = [
    {
      title: "TRANSACTION_DATE",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "RETAILER_MSISDN",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "DEALER_CODE",
      dataIndex: "mtn_tp_code",
      key: "mtn_tp_code",
    },
    {
      title: "DEALER",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "TRANSACTION_AMOUNT",
      dataIndex: "amount",
      key: "amount",
      // render: text => <a>{text}</a>,
    },
    {
      title: "TRANSACTION_TYPE",
      dataIndex: "description",
      key: "description",
    },

    // {
    //   title: "Action",
    //   dataIndex: "ussd_status",
    //   key: "ussd_status",

    //   render: (text, record) => (
    //     <a
    //       id={record.r_id}
    //       title={record.phone}
    //       className="enabledLog"
    //       onClick={e => {
    //         let details = {
    //           r_id: e.currentTarget.id,
    //           name: e.currentTarget.title,
    //           start: start,
    //           end: end,
    //           tp_id,
    //         }
    //         dispatch(retailerDetails(details))
    //         navigate(`/Admin_Dashboard/RetailerHistory`)
    //       }}
    //     >
    //       View Log
    //     </a>
    //   ),
    // },
  ]

  ///////////export to csv///////////////////////////////////////////////////
  const headers = [
    { label: "TRANSACTION_DATE", key: "date(ussd_transactions.created_at)" },
    { label: "RETAILER_MSISDN", key: "phone" },
    { label: "DEALER_CODE", key: "mtn_tp_code" },
    { label: "TRANSACTION_AMOUNT", key: "total_sales" },
    { label: "TRANSACTION_TYPE", key: "description" },
  ]

  //**query by date */
  const onChange = async (value, dateString) => {
    setLoading(true)
    let selectedDate = dateString
    setStart(selectedDate[0])
    setEnd(selectedDate[1])
    // total USSD

    if (dealer === "") {
      const ussdReqst = {
        serviceCode: "AADD",
        username: dets[0],
        password: dets[1],
        start: selectedDate[0],
        end: selectedDate[1],
      }

      const USSD = new Promise(res => {
        res(AdminInstance.post("", ussdReqst))
      })
      USSD.then(({ data }) => {
        console.log(data)
        setLoading(false)
        setRetailer(data.transaction)
      })
    } else {
      const ussdReqst = {
        serviceCode: "AADD",
        username: dets[0],
        password: dets[1],
        dealer: dealer,
        start: selectedDate[0],
        end: selectedDate[1],
      }

      const USSD = new Promise(res => {
        res(AdminInstance.post("", ussdReqst))
      })
      USSD.then(({ data }) => {
        console.log(data)
        setLoading(false)
        setRetailer(data.transaction)
      })
    }
  }

  return (
    <AdminLayout>
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
                <label
                  style={{
                    color: "#227f00",
                    padding: "10px 0px",
                  }}
                >
                  Select Trade Partner:
                </label>
                <Select
                  defaultValue="All Trade Partner"
                  onChange={value => {
                    handletp(value)
                  }}
                  loading={loading}
                >
                  <Option
                    value="all"
                    onClick={() => {
                      setDealer()
                    }}
                  >
                    All
                  </Option>
                  {tps.map(data => {
                    return (
                      <Option
                        key={data.vendor_name}
                        value={data.mtn_tp_code}
                        onClick={() => {
                          setTp_id(data.id)
                        }}
                      >
                        {data.name}-{data.mtn_tp_code}
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
              {retailer.length > 0 && (
                <Button>
                  <CSVLink
                    data={retailer}
                    filename={"Retailers.csv"}
                    headers={headers}
                    style={{ color: "white" }}
                  >
                    Export to CSV
                  </CSVLink>
                </Button>
              )}
            </div>

            <div className="all_activities_container">
              {message !== "" && (
                <h3
                  style={{
                    color: "red",
                    textAlign: "center",
                    padding: "20px",
                    margin: 0,
                  }}
                >
                  {message}
                </h3>
              )}

              <div style={{ padding: "20px" }}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Daily Summary" key="1">
                    <div>
                      <div className="table_Group">
                        <div className="rowShow"></div>
                        <Spin spinning={loading} size="large" delay={0}>
                          <Table
                            columns={ColumnsTwo}
                            dataSource={retailer}
                            bordered
                            size="small"
                          />
                        </Spin>
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Home

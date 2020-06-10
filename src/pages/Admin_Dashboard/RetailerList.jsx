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
    }
  }, [])

  const handletp = value => {
    setRetailer([])
    setTp_id(value)
    setLoading(true)

    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth()
    var firstDay = new Date(y, m, 1)
    var lastDay = new Date(y, m + 1, 0)
    // total USSD
    const RetailerReqst = {
      serviceCode: "RTL",
      username: dets[0],
      password: dets[1],
      user_id: value,
    }
    const list = new Promise(res => {
      res(AdminInstance.post("", RetailerReqst))
    })
    list.then(({ data }) => {
      if (data.status === "200") {
        setRetailer(data.retailer)
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

  //**retailer table column */
  const ColumnsTwo = [
    {
      title: "POS Username",
      dataIndex: "username",
      key: "username",

      // render: text => <a>{text}</a>,
    },
    {
      title: "Retailer Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Retailer Number",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Retail Code",
      dataIndex: "code",
      key: "code",
      render: (text, record) => (
        <div>
          {record.tp_no}
          {record.code}
        </div>
      ),

      // align: "right",
    },

    {
      title: "USSD Status",
      dataIndex: "ussd_status",
      key: "ussd_status",

      render: text =>
        text === 1 ? (
          <p className="enabled">
            <Green className="dotPosition" />
            Active
          </p>
        ) : (
          <p className="disabled">
            <Red className="dotPosition" />
            Inactive
          </p>
        ),
    },
    {
      title: "Date Created/Time",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Action",
      dataIndex: "ussd_status",
      key: "ussd_status",

      render: (text, record) => (
        <a
          id={record.id}
          title={record.name}
          className="enabledLog"
          onClick={e => {
            let details = {
              user_id: e.currentTarget.id,
              name: e.currentTarget.title,
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

  ///////////export to csv///////////////////////////////////////////////////
  const headers = [
    { label: "Pos Username", key: "username" },
    { label: "Retailer Name", key: "name" },
    { label: "Retailer Number", key: "type" },
    { label: "Retailer Number", key: "phone" },
    { label: "Retailer Code", key: "code" },
    { label: "Date Created/Time", key: "created_at" },
  ]

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
                  {tps.map(data => {
                    return (
                      <Option key={data.vendor_name} value={data.id}>
                        {data.name}
                      </Option>
                    )
                  })}
                </Select>
              </div>
              {/* <h4
                style={{ margin: "0px", color: "#227f00" }}
                className={loading ? "" : "hide"}
              >
                Loading...
              </h4> */}
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
                  <TabPane tab="Retailer List" key="1">
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

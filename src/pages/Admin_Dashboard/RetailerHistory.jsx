import React, { useState, useEffect } from "react"
import {
  Table,
  Icon,
  Input,
  Select,
  Pagination,
  Tabs,
  Button,
  Spin,
} from "antd"
import "../../scss/Table.scss"
import "../../scss/Retailer.scss"
import { CSVLink, CSVDownload } from "react-csv"
import AdminInstance from "../../Api/AdminInstance"
import { Base64 } from "js-base64"
import DealerLayout from "../../components/Layout/DealerLayout"
import { HistoryIcon } from "../../components/CustomIcons"
import { useSelector } from "react-redux"
import Green from "../../../assets/green.svg"
import Red from "../../../assets/red.svg"
import AdminLayout from "../../components/Layout/AdminLayout"
const { TabPane } = Tabs
const { Option } = Select
const Dash_history_icon = props => <Icon component={HistoryIcon} {...props} />

const RetailerSingleHistory = () => {
  const [VODHistory, setVODHistory] = useState([])
  const [DataHistory, setDataHistory] = useState([])
  const [AwufHistory, setAwufHistory] = useState([])
  const [VtuHistory, setVtuHistory] = useState([])
  const [historyCredit, setHistoryDebit] = useState([])
  const [usernameH, setUsernameH] = useState([])
  const [filteredCredit, setFilteredCredit] = useState("")
  const [filteredDebit, setFilteredDebit] = useState("")
  const [spinning, setSpinning] = useState(false)
  const [dets, setDets] = useState([])

  const [adminType, setAdminType] = useState("")
  const { retailer } = useSelector(state => state)
  console.log(retailer)
  useEffect(() => {
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

    const VOD = {
      serviceCode: "TTV",
      username: usernameA,
      password: passwordA,
      type: "VOD",
      user_id: retailer.user_id,
    }
    ////////////log history/////////////////
    const VTU = {
      serviceCode: "RTLT",
      tp_id: retailer.tp_id,
      username: usernameA,
      password: passwordA,
      r_id: retailer.user_id,
    }
    console.log(VTU)
    const requestVtu = new Promise(res => {
      res(AdminInstance.post("", VTU))
    })
    requestVtu.then(({ data }) => {
      console.log(data, "vtu")
      if (data.status === "200") {
        console.log(data)
        setSpinning(false)
        setVtuHistory(data.transaction)
      }
    })
  }, [])
  const HistoryColumn = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Phone Number",
      dataIndex: "loaded",
      key: "loaded",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: text =>
        text === 1 ? (
          <p className="enabled">
            <Green className="dotPosition" />
            Successful
          </p>
        ) : (
          <p className="disabled">
            <Red className="dotPosition" />
            Failed
          </p>
        ),
    },

    {
      title: "Date Created/Time",
      dataIndex: "created_at",
      key: "created_at",
    },
  ]

  const title = (
    <h4>
      <Dash_history_icon style={{ marginRight: "10px" }} />
      {retailer.name}'s Log
    </h4>
  )
  const headerCredit = [
    { label: "Source", key: "source" },
    { label: "Retailer Name", key: "destination" },
    { label: "Amount", key: "amount" },
    { label: "Transaction ref", key: "ref" },
    { label: "Date Created/Time", key: "created_at" },
  ]
  const headerDebit = [
    { label: "Source", key: "source" },
    { label: "Retailer Name", key: "destination" },
    { label: "Amount", key: "amount" },
    { label: "Transaction ref", key: "ref" },
    { label: "Date Created/Time", key: "time" },
  ]
  const Vtu = []
  return (
    <AdminLayout title={title} position={["5"]}>
      <div>
        <div
          className="table_container"
          style={
            HistoryColumn.length <= 9 ? { height: "100vh" } : { height: "auto" }
          }
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Logs" key="1">
              <div className="table_Group">
                {/* <div className="table_header"></div> */}
                <Spin spinning={spinning} size="large" delay={0}>
                  <Table
                    columns={HistoryColumn}
                    dataSource={VtuHistory}
                    bordered
                    size="small"
                  />
                </Spin>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  )
}

export default RetailerSingleHistory

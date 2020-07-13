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
import "../../scss/Dealer_home.scss"
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
  const [spinning, setSpinning] = useState(true)
  const [dets, setDets] = useState([])

  const [adminType, setAdminType] = useState("")
  const { retailer } = useSelector(state => state)
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

    setTimeout(() => {
      setSpinning(false)
    }, 10000)
    ////////////log history/////////////////
    const VTU = {
      serviceCode: "AABB",
      retailer: retailer.r_id,
      username: usernameA,
      password: passwordA,
      start: retailer.start,
      end: retailer.end,
    }
    console.log(VTU)
    const requestVtu = new Promise(res => {
      res(AdminInstance.post("", VTU))
    })
    requestVtu.then(({ data }) => {
      console.log(data)
      if (data.status === "200") {
        setSpinning(false)
        setVtuHistory(data.transaction)
      }
    })
  }, [])
  const HistoryColumn = [
    {
      title: "TRANSACTION AMOUNT",
      dataIndex: "total_sales",
      key: "total_sales",
    },
    {
      title: "TRANSACTION DATE",
      dataIndex: "date(created_at)",
      key: "date(created_at)",
    },
  ]

  const title = (
    <h4>
      <Dash_history_icon style={{ marginRight: "10px" }} />
      {retailer.name}'s Log
    </h4>
  )
  const headers = [
    { label: "TRANSACTION AMOUNT", key: "total_sales" },
    { label: "TRANSACTION DATE", key: "date(created_at)" },
  ]

  const Vtu = []

  const Total = VtuHistory.reduce(
    (prev, cur) => prev + Number(`${cur.total_sales}`),
    0
  )

  return (
    <AdminLayout title={title} position={["5"]}>
      <div>
        <div
          className="table_container"
          style={
            HistoryColumn.length <= 9 ? { height: "100vh" } : { height: "auto" }
          }
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ color: "green", fontSize: "24px" }}>
              Total Transaction: ₦ {parseInt(`${Total}`).toLocaleString()}
            </div>
            <Button style={{ backgroundColor: "green" }}>
              <CSVLink
                data={VtuHistory}
                filename={"Retailer's log.csv"}
                headers={headers}
                className="btn btn-success"
                style={{ color: "white" }}
              >
                Export to CSV
              </CSVLink>
            </Button>
          </div>

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

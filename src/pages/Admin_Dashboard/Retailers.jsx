import React, { useState, useEffect } from "react"
import { Table, Icon, Input, Select, Pagination, Tabs, Button } from "antd"
import { ColumnsTwo, TableTwo } from "../../components/Constants/Tableone"
import "../../scss/Table.scss"
import "../../scss/Retailer.scss"
import { CSVLink, CSVDownload } from "react-csv"
import Instance from "../../Api/Instance"
import { Base64 } from "js-base64"
import AdminLayout from "../../components/Layout/AdminLayout"
import { HistoryIcon } from "../../components/CustomIcons"
import axios from "axios"
import { DatePicker } from "antd"
import AdminInstance from "../../Api/AdminInstance"
const { RangePicker } = DatePicker
const { TabPane } = Tabs
const { Option } = Select
const Dash_history_icon = props => <Icon component={HistoryIcon} {...props} />

const Retailers = () => {
  const [history, setHistory] = useState([])
  const [historyCredit, setHistoryDebit] = useState([])
  const [usernameH, setUsernameH] = useState([])
  const [filteredCredit, setFilteredCredit] = useState("")
  const [date, setDate] = useState([])
  const [dets, setDets] = useState([])
  const [loading, setloading] = useState(false)
  const [search, setSearch] = useState("")
  const [balance, setBalance] = useState("")
  const [msg, setMsg] = useState(false)

  useEffect(() => {
    let onLogged = sessionStorage.getItem("persist:root")
      ? JSON.parse(sessionStorage.getItem("persist:root"))
      : []
    const { userData } = onLogged
    let allData = JSON.parse(userData)
    const { user_id } = allData
    setUsernameH(allData.username)
    let data = sessionStorage.getItem("topup2")
      ? JSON.parse(sessionStorage.getItem("topup2"))
      : []

    const username = Base64.decode(data.TOKEN_ONE_ADMIN)
    const password = Base64.decode(data.TOKEN_TWO_ADMIN)

    setDets([...dets, username, password])
  }, [])

  const HistoryColumn = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Reference Number",
      dataIndex: "ref",
      key: "ref",
    },
    {
      title: "Date Created/Time",
      dataIndex: "created_at",
      key: "created_at",
    },
  ]

  //   const filteredDebitItems = history.filter(
  //     item =>
  //       item.ref.includes(filteredDebit.toLocaleLowerCase()) ||
  //       item.destination
  //         .toLocaleLowerCase()
  //         .includes(filteredDebit.toLocaleLowerCase())
  //   )
  //   const filteredItems = history.filter(
  //     item =>
  //       item.retailer_code.includes(filteredCredit.toLocaleLowerCase()) ||
  //       item.phone_number
  //         .toLocaleLowerCase()
  //         .includes(filteredCredit.toLocaleLowerCase())
  //   )

  const title = (
    <h4>
      {/* <Dash_history_icon style={{ marginRight: "10px" }} /> */}
      Retailers
    </h4>
  )
  const headerCredit = [
    { label: "Source", key: "source" },
    { label: "Retailer Name", key: "destination" },
    { label: "Amount", key: "amount" },
    { label: "Transaction ref", key: "ref" },
    { label: "Date Created/Time", key: "created_at" },
  ]

  // get date
  function onChange(value, dateString) {
    setDate(dateString)
  }

  const handleSearch = e => {
    setSearch(e.currentTarget.value)
  }

  const QueryRetailer = () => {
    setloading(true)
    const QuerySearch = {
      username: dets[0],
      password: dets[1],
      rt_code: search,
      serviceCode: "SEARCH_H",
    }

    const request = new Promise(res => {
      res(AdminInstance.post("", QuerySearch))
    })
    request.then(({ data }) => {
      if (data.status === "200") {
        setMsg(true)
        setloading(false)
        setBalance(`₦ ${data.balance.toLocaleString()}`)
        setHistory(data.histories)
      } else {
        setloading(false)
      }
    })
  }

  return (
    <AdminLayout title={title} position={["10"]}>
      <div>
        <div
          className="table_container"
          style={
            HistoryColumn.length <= 9 ? { height: "100vh" } : { height: "auto" }
          }
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="wallet history" key="1">
              <div className="table_Group">
                <div className="table_header">
                  <div className="rowShow">
                    <Input
                      placeholder="last 4 digits of retailer code"
                      value={search}
                      onChange={handleSearch}
                      prefix={
                        <Icon type="search" style={{ color: "#D8D8D8" }} />
                      }
                    />
                    <Button onClick={QueryRetailer} loading={loading}>
                      search
                    </Button>
                  </div>
                  {/* <div className="searchTable">
                    <Input
                      placeholder="Search by Retailer code"
                      value={search}
                      onChange={handleSearch}
                      prefix={
                        <Icon type="search" style={{ color: "#D8D8D8" }} />
                      }
                    />
                    <Button onClick={QueryRetailer}>search</Button>
                  </div> */}
                </div>
                <div
                  style={{ padding: "10px" }}
                  className={msg ? "balance" : "hide"}
                >
                  Retailer balance is {balance}
                </div>
                <Table
                  columns={HistoryColumn}
                  dataSource={history}
                  bordered
                  size="small"
                />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Retailers

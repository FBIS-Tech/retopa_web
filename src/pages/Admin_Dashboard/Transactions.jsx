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

const Transactions = () => {
  const [history, setHistory] = useState([])
  const [historyCredit, setHistoryDebit] = useState([])
  const [usernameH, setUsernameH] = useState([])
  const [filteredCredit, setFilteredCredit] = useState("")
  const [date, setDate] = useState([])
  const [dets, setDets] = useState([])
  const [loading, setloading] = useState(false)
  const [search, setSearch] = useState("")

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

  //   id: 14
  // user_id: 6
  // batch_id: 2
  // vtu_id: 3
  // unit: 1
  // amount: "50.00"
  // total_amount: "50.00"
  // network: "MTN"
  // description: "Payment for Pins Generation"
  // retailer_code: null
  // retailer_name: null
  // phone: null
  // loaded: null
  // type: "DEBIT"
  // status: "0"
  // created_at: "2019-06-14 23:44:33"
  // updated_at: "2019-06-14 2
  const HistoryColumn = [
    {
      title: "Retailer code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Trade Partner",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <p style={{ marginBottom: "0px" }}>
          {record.status === 0 ? (
            <div style={{ color: "amber" }}>Pending Approval</div>
          ) : record.status === 1 ? (
            <div style={{ color: "green" }}>Loaded</div>
          ) : record.status === 2 ? (
            <div style={{ color: "red" }}>Failed</div>
          ) : (
            <div style={{ color: "red" }}>Recharge Later</div>
          )}
        </p>
      ),
    },
    {
      title: "Initiator",
      dataIndex: "requested",
      key: "requested",
    },
    {
      title: "Receiver",
      dataIndex: "loaded",
      key: "loaded",
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
      <Dash_history_icon style={{ marginRight: "10px" }} />
      Transaction
    </h4>
  )
  const header = [
    { label: "Retailer code", key: "code" },
    { label: "Trade Partner", key: "name" },
    { label: "Amount", key: "amount" },
    { label: "Retailer's number", key: "requested" },
    { label: "Customer", key: "loaded" },
    { label: "Date Created/Time", key: "created_at" },
  ]

  // get date
  function onChange(value, dateString) {
    setDate(dateString)
  }

  const handleSearch = e => {
    setSearch(e.currentTarget.value)
  }

  const Query = () => {
    setloading(true)
    const QuerySearch = {
      serviceCode: "SEARCH_TRAN",
      search,
      username: dets[0],
      password: dets[1],
    }
    const request = new Promise(res => {
      res(AdminInstance.post("", QuerySearch))
    })
    request.then(({ data }) => {
      //console.log(data)
      if (data.status === "200") {
        setloading(false)
        setHistory(data.transactions)
      } else {
        setloading(false)
      }
    })
  }

  return (
    <div title={title} position={["10"]}>
      <div>
        <div
          className="table_container"
          style={
            HistoryColumn.length <= 9 ? { height: "100vh" } : { height: "auto" }
          }
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Transactions" key="1">
              <div className="table_Group">
                <div className="table_header">
                  <div className="rowShow">
                    {/* Date:{" "}
                    <RangePicker
                      showTime
                      style={{ marginLeft: "5px" }}
                      onChange={onChange}
                    /> */}
                    <Input
                      placeholder="234***********"
                      value={search}
                      onChange={handleSearch}
                      prefix={
                        <Icon type="search" style={{ color: "#D8D8D8" }} />
                      }
                    />
                    <Button
                      style={{
                        marginLeft: "5px",
                        height: "40px",
                      }}
                      onClick={Query}
                      loading={loading}
                    >
                      SEARCH
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      className={history.length <= 0 ? "hide" : ""}
                    >
                      <CSVLink
                        data={history}
                        filename={"Retailers.csv"}
                        headers={header}
                        style={{ color: "white" }}
                      >
                        Export to CSV
                      </CSVLink>
                    </Button>
                  </div>
                  <div className="searchTable">
                    {/* <Input
                      placeholder="Search By Retail code or  phone number"
                      value={search}
                      onChange={handleSearch}
                      prefix={
                        <Icon type="search" style={{ color: "#D8D8D8" }} />
                      }
                    /> */}
                  </div>
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
    </div>
  )
}

export default Transactions

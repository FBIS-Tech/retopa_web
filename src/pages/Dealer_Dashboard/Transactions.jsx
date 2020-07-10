import React, { useState, useEffect } from "react"
import { Table, Icon, Input, Select, Pagination, Tabs, Button } from "antd"
import { ColumnsTwo, TableTwo } from "../../components/Constants/Tableone"
import "../../scss/Table.scss"
import "../../scss/Retailer.scss"
import { CSVLink, CSVDownload } from "react-csv"
import Instance from "../../Api/Instance"
import { Base64 } from "js-base64"
import DealerLayout from "../../components/Layout/DealerLayout"
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

    const search = {
      serviceCode: "SEARCH",
      //   from_date: "2019-06-14 09:06:03",
      //   to_date: "2019-06-14 17:28:45",
      username,
      password,
    }
    const request = new Promise(res => {
      res(AdminInstance.post("", search))
    })
    request.then(({ data }) => {
      //console.log(data)
      if (data.status === "200") {
        setHistory(data.transactions)
      }
    })
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
    // {
    //   title: "Source",
    //   dataIndex: "source",
    //   key: "source",
    //   render: (text, record) => (
    //     <p style={{ marginBottom: "0px" }}>
    //       {record.source === 1 ? usernameH : "ADMIN"}
    //     </p>
    //   ),
    // },

    // {
    //   title: "Retailer Code",
    //   dataIndex: "retailer_code",
    //   key: "retailer_code",
    // },

    {
      title: "Retailer code",
      dataIndex: "retailer_code",
      key: "retailer_code",
    },
    {
      title: "Name",
      dataIndex: "retailer_name",
      key: "retailer_name",
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
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
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

  const QueryDate = () => {
    setloading(true)
    const search = {
      serviceCode: "SEARCH",
      from_date: date[0],
      to_date: date[1],
      username: dets[0],
      password: dets[1],
    }
    const request = new Promise(res => {
      res(AdminInstance.post("", search))
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
    <DealerLayout title={title} position={["10"]}>
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
                    Date:{" "}
                    <RangePicker
                      showTime
                      style={{ marginLeft: "5px" }}
                      onChange={onChange}
                    />
                    <Button
                      style={{
                        marginLeft: "5px",
                        height: "33px",
                      }}
                      onClick={QueryDate}
                      loading={loading}
                    >
                      SEARCH
                    </Button>
                  </div>
                  <div className="searchTable">
                    <Input
                      placeholder="Search Transactions…"
                      value={filteredCredit}
                      onChange={e => {
                        setFilteredCredit(e.target.value)
                      }}
                      prefix={
                        <Icon type="search" style={{ color: "#D8D8D8" }} />
                      }
                    />
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
    </DealerLayout>
  )
}

export default Transactions

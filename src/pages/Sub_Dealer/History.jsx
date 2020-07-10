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
import { ColumnsTwo, TableTwo } from "../../components/Constants/Tableone"
import "../../scss/Table.scss"
import "../../scss/Retailer.scss"
import { CSVLink, CSVDownload } from "react-csv"
import DealerLoginInstance from "../../Api/DealerLoginInstance"
import { Base64 } from "js-base64"
import DealerLayout from "../../components/Layout/DealerLayout"
import { HistoryIcon } from "../../components/CustomIcons"
import SubDealerLayout from "../../components/Layout/SubDealerLayout"
const { TabPane } = Tabs
const { Option } = Select
const Dash_history_icon = props => <Icon component={HistoryIcon} {...props} />

const RetailerHistory = () => {
  const [subHistory, setSUBHistory] = useState([])
  const [historyRetailer, setHistoryRetailer] = useState([])
  const [creditHistory, setCreditHistory] = useState([])
  const [usernameH, setUsernameH] = useState([])
  const [spinning, setSpinning] = useState(true)
  const [filtered, setFiltered] = useState("")

  useEffect(() => {
    let onLogged = sessionStorage.getItem("persist:root")
      ? JSON.parse(sessionStorage.getItem("persist:root"))
      : []
    const { userData } = onLogged
    let allData = JSON.parse(userData)
    const { user_id } = allData
    setUsernameH(allData.username)
    // gets tokens
    let data = sessionStorage.getItem("topup3")
      ? JSON.parse(sessionStorage.getItem("topup3"))
      : []
    const username = Base64.decode(data.TOKEN_ONE_DEALER)
    const password = Base64.decode(data.TOKEN_TWO_DEALER)

    setTimeout(() => {
      setSpinning(false)
    }, 60000)

    const Creditreq = {
      serviceCode: "CWH",
      username,
      password,
      user_id,
    }
    const Debitreq = {
      serviceCode: "DWH",
      username,
      password,
      user_id,
    }
    const SubDealereq = {
      serviceCode: "SMM",
      username,
      password,
      user_id,
    }
    const retailereq = {
      serviceCode: "SMH",
      username,
      password,
      user_id,
    }
    // ////credit history list//////////////////////////////////////
    const requestCRD = new Promise(res => {
      res(DealerLoginInstance.post("", Creditreq))
    })
    requestCRD.then(({ data }) => {
      if (data.status === "200") {
        setSpinning(false)
        setCreditHistory(data.history)
      }
    })
    // ////debit history list//////////////////////////////////////
    const requestDBT = new Promise(res => {
      res(DealerLoginInstance.post("", Debitreq))
    })
    requestDBT.then(({ data }) => {
      if (data.status === "200") {
        setSUBHistory(data.history)
      }
    })
  }, [])

  const HistoryColumni = [
    {
      title: "Retailer Name",
      dataIndex: "retailer_name",
      key: "retailer_name",
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (
        <div>{`₦ ${parseInt(record.amount).toLocaleString()}`}</div>
      ),
    },
    {
      title: "Transaction Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Retailer Balance",
      dataIndex: "balance",
      key: "balance",
      render: (text, record) => (
        <div>{`₦ ${parseInt(record.balance).toLocaleString()}`}</div>
      ),
    },
    {
      title: "Trade Partner Balance",
      dataIndex: "fro_balance",
      key: "fro_balance",
      render: (text, record) => (
        <div>{`₦ ${parseInt(record.fro_balance).toLocaleString()}`}</div>
      ),
    },

    {
      title: "Transaction ref",
      dataIndex: "ref",
      key: "ref",
    },
    {
      title: "Date Created/Time",
      dataIndex: "created_at",
      key: "created_at",
    },
  ]

  // id: 41
  // amount: "10.00"
  // type: "CREDIT"
  // account_type: "SD"
  // ref: "1586117836995"
  // balance: "60.00"
  // fro_balance: "20.00"
  // source: 2
  // destination: 9
  // created_at: "2020-04-05 20:17:16"
  // updated_at: "2020-04-05 20:17:16"
  // retailer_name: "Kayode"
  // vtu_name: "94RT1"

  const HistoryColumn = [
    {
      title: "Retailer Name",
      dataIndex: "retailer_name",
      key: "retailer_name",
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (
        <div>{`₦ ${parseInt(record.amount).toLocaleString()}`}</div>
      ),
    },
    {
      title: "Sub-Dealer Balance",
      dataIndex: "fro_balance",
      key: "fro_balance",
    },
    {
      title: "Retailer Balance",
      dataIndex: "balance",
      key: "balance",
    },

    {
      title: "VTU Name",
      dataIndex: "vtu_name",
      key: "vtu_name",
    },

    {
      title: "Transaction ref",
      dataIndex: "ref",
      key: "ref",
    },
    {
      title: "Date Created/Time",
      dataIndex: "created_at",
      key: "created_at",
    },
  ]
  const HistoryColumn2 = [
    {
      title: "Source",
      dataIndex: "vtu_name",
      key: "vtu_name",
    },
    {
      title: "Trade Partner Name",
      dataIndex: "tp_name",
      key: "tp_name",
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "amount",
    },

    {
      title: "Transaction ref",
      dataIndex: "ref",
      key: "ref",
    },
    {
      title: "Date Created/Time",
      dataIndex: "created_at",
      key: "created_at",
    },
  ]

  const filteredSubHistory = subHistory
    .slice()
    .reverse()
    .filter(
      item =>
        item.ref.includes(filtered) ||
        item.sub_dealer_name
          .toLocaleLowerCase()
          .includes(filtered.toLocaleLowerCase())
    )
  const filteredRetailer = historyRetailer.filter(
    item =>
      item.ref.includes(filtered.toLocaleLowerCase()) ||
      item.retailer_name
        .toLocaleLowerCase()
        .includes(filtered.toLocaleLowerCase())
  )
  const filtercreditHistory = creditHistory
    .slice()
    .reverse()
    .filter(item => item.ref.includes(filtered))

  const title = (
    <h4>
      <Dash_history_icon style={{ marginRight: "10px" }} />
      History
    </h4>
  )
  const headerCredit = [
    { label: "Source", key: "source" },
    { label: "Retailer Name", key: "destination" },
    { label: "Amount", key: "amount" },
    { label: "Transaction ref", key: "ref" },
    { label: "Date Created/Time", key: "created_at" },
  ]
  const headerSub = [
    { label: "Source", key: "source" },
    { label: "Sub-Dealer Name", key: "sub_dealer_name" },
    { label: "Amount", key: "amount" },
    { label: "Transaction Type", key: "type" },
    { label: "Sub-Dealer Balance", key: "balance" },
    { label: "Trade Partner Balance", key: "fro_balance" },
    { label: "VTU Name", key: "vtu_name" },
    { label: "Transaction ref", key: "ref" },
    { label: "Date Created/Time", key: "created_at" },
  ]

  const headerCrd = [
    { label: "Source", key: "source" },
    { label: "Retailer Name", key: "retailer_name" },
    { label: "Amount", key: "amount" },
    { label: "Transaction Type", key: "type" },
    { label: "Retailer Balance", key: "balance" },
    { label: "Trade Partner Balance", key: "fro_balance" },
    { label: "Transaction ref", key: "ref" },
    { label: "Date Created/Time", key: "created_at" },
  ]

  return (
    <SubDealerLayout title={title} position={["5"]}>
      <div>
        <div
          className="table_container"
          style={
            HistoryColumn.length <= 9 ? { height: "100vh" } : { height: "auto" }
          }
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Credit History" key="1">
              <div className="table_Group">
                <div className="table_header">
                  <div className="rowShow">
                    <Button>
                      <CSVLink
                        data={creditHistory}
                        filename={"Trade Partner History.csv"}
                        headers={headerCredit}
                        style={{ color: "white" }}
                      >
                        Export to CSV
                      </CSVLink>
                    </Button>
                  </div>
                  <div className="searchTable">
                    <Input
                      placeholder="Search Trade Partner History…"
                      value={filtered}
                      onChange={e => {
                        setFiltered(e.target.value)
                      }}
                      prefix={
                        <Icon type="search" style={{ color: "#D8D8D8" }} />
                      }
                    />
                  </div>
                </div>
                <Spin spinning={spinning} size="large" delay={0}>
                  <Table
                    columns={HistoryColumn2}
                    dataSource={filtercreditHistory}
                    bordered
                    size="small"
                  />
                </Spin>
              </div>
            </TabPane>
            <TabPane tab="Debit History" key="2">
              <div className="table_Group">
                <div className="table_header">
                  <div className="rowShow">
                    <Button>
                      <CSVLink
                        data={subHistory}
                        filename={"Debit History.csv"}
                        headers={headerSub}
                        style={{ color: "white" }}
                      >
                        Export to CSV
                      </CSVLink>
                    </Button>
                  </div>
                  <div className="searchTable">
                    <Input
                      placeholder="Search Sub-Dealer History…"
                      value={filtered}
                      onChange={e => {
                        setFiltered(e.target.value)
                      }}
                      prefix={
                        <Icon type="search" style={{ color: "#D8D8D8" }} />
                      }
                    />
                  </div>
                </div>
                <Table
                  columns={HistoryColumn}
                  dataSource={filteredSubHistory}
                  bordered
                  size="small"
                />
              </div>
            </TabPane>
            {/* <TabPane tab="Retailer" key="3">
              <div className="table_Group">
                <div className="table_header">
                  <div className="rowShow">
                    <Button>
                      <CSVLink
                        data={historyRetailer}
                        filename={"retailer history.csv"}
                        headers={headerCrd}
                        style={{ color: "white" }}
                      >
                        Export to CSV
                      </CSVLink>
                    </Button>
                  </div>
                  <div className="searchTable">
                    <Input
                      placeholder="Search Retailer History…"
                      value={filtered}
                      onChange={e => {
                        setFiltered(e.target.value)
                      }}
                      prefix={
                        <Icon type="search" style={{ color: "#D8D8D8" }} />
                      }
                    />
                  </div>
                </div>
                <Table
                  columns={HistoryColumni}
                  dataSource={filteredRetailer}
                  bordered
                  size="small"
                />
              </div>
            </TabPane> */}
          </Tabs>
        </div>
      </div>
    </SubDealerLayout>
  )
}

export default RetailerHistory

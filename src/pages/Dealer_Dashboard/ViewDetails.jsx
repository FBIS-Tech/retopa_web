import React, { useState, useEffect } from "react"
import { Table, Icon, Input, Select, Pagination, Tabs, Button } from "antd"
import "../../scss/Table.scss"
import "../../scss/Retailer.scss"
import { CSVLink, CSVDownload } from "react-csv"
import Instance from "../../Api/Instance"
import { Base64 } from "js-base64"
import DealerLayout from "../../components/Layout/DealerLayout"
import { HistoryIcon } from "../../components/CustomIcons"
import { useSelector } from "react-redux"
import { Link, navigate } from "gatsby"
import Green from "../../../assets/green.svg"
import Red from "../../../assets/red.svg"
import axios from "axios"
import AdminInstance from "../../Api/AdminInstance"
const { TabPane } = Tabs
const { Option } = Select
const Dash_history_icon = props => <Icon component={HistoryIcon} {...props} />

const ViewDetails = () => {
  const [VODHistory, setVODHistory] = useState([])
  const [DataHistory, setDataHistory] = useState([])
  const [VtuHistory, setVtuHistory] = useState([])
  const [usernameH, setUsernameH] = useState([])
  const [filteredCredit, setFilteredCredit] = useState("")
  const [filteredDebit, setFilteredDebit] = useState("")

  const { retailer, transactions } = useSelector(state => state)

  useEffect(() => {
    let onLogged = sessionStorage.getItem("persist:root")
      ? JSON.parse(sessionStorage.getItem("persist:root"))
      : []
    const { userData } = onLogged
    let allData = JSON.parse(userData)
    const { user_id } = allData
    setUsernameH(allData.username)
    let data = sessionStorage.getItem("topup")
      ? JSON.parse(sessionStorage.getItem("topup"))
      : []

    const username = Base64.decode(data.TOKEN_ONE)
    const password = Base64.decode(data.TOKEN_TWO)

    // admin token
    let dataA = sessionStorage.getItem("topup2")
      ? JSON.parse(sessionStorage.getItem("topup2"))
      : []
    let usernameA = Base64.decode(dataA.TOKEN_ONE_ADMIN)
    let passwordA = Base64.decode(dataA.TOKEN_TWO_ADMIN)

    // get usaer type

    let UserData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : []
  }, [])

  const HistoryColumn = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <p style={{ marginBottom: "0px" }}>
          {record.status === 1 ? (
            <p style={{ color: "green" }}>Successful</p>
          ) : (
            <p style={{ color: "red" }}>Failed</p>
          )}
        </p>
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
  const Column = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <p style={{ marginBottom: "0px" }}>
          {record.status === 1 ? (
            <p style={{ color: "green" }}>Successful</p>
          ) : (
            <p style={{ color: "red" }}>Failed</p>
          )}
        </p>
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

  const USSDColumn = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Number",
      dataIndex: "msisdn",
      key: "msisdn",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <p style={{ marginBottom: "0px" }}>
          {record.status === 1 ? (
            <p style={{ color: "green" }}>Successful</p>
          ) : (
            <p style={{ color: "red" }}>Failed</p>
          )}
        </p>
      ),
    },
    {
      title: "Date Created/Time",
      dataIndex: "created_at",
      key: "created_at",
    },
  ]

  const filteredDebitItems = VODHistory.filter(item =>
    item.ref.includes(filteredDebit.toLocaleLowerCase())
  )
  const filteredDataItems = DataHistory.filter(item =>
    item.ref.includes(filteredCredit.toLocaleLowerCase())
  )

  const filteredVTUItems = VtuHistory.filter(item =>
    item.ref.includes(filteredCredit.toLocaleLowerCase())
  )

  const title = (
    <h4>
      <Dash_history_icon style={{ marginRight: "10px" }} />
      {retailer.name}'s History
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

  return (
    <DealerLayout title="Transaction Details" position={["1"]}>
      <div>
        <div
          className="table_container"
          style={
            HistoryColumn.length <= 9 ? { height: "100vh" } : { height: "auto" }
          }
        >
          <Tabs defaultActiveKey="1">
            {/* <TabPane tab="VTU" key="1">
              <div className="table_Group">
                <div className="table_header">
                  <div className="searchTable">
                    <Input
                      placeholder="Search"
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
                  dataSource={voucher}
                  bordered
                  size="small"
                />
              </div>
            </TabPane> */}
            <TabPane tab="VOD" key="1">
              <div className="table_Group">
                {/* <div className="table_header"> */}
                {/* <div className="rowShow">
                    <Button>
                      <CSVLink
                        data={voucher}
                        filename={"Wallet Debits.csv"}
                        headers={headerDebit}
                        style={{ color: "white" }}
                      >
                        Export to CSV
                      </CSVLink>
                    </Button>
                  </div> */}
                {/* <div className="searchTable">
                    <Input
                      placeholder="Search Debit History…"
                      value={filteredDebit}
                      onChange={e => {
                        setFilteredDebit(e.target.value)
                      }}
                      prefix={
                        <Icon type="search" style={{ color: "#D8D8D8" }} />
                      }
                    />
                  </div> */}
                {/* </div> */}
                <Table
                  columns={Column}
                  dataSource={transactions.voucherData}
                  bordered
                  size="small"
                />
              </div>
            </TabPane>
            <TabPane tab="DATA" key="2">
              <div className="table_Group">
                {/* <div className="table_header">
                  <div className="searchTable">
                    <Input
                      placeholder="Search Debit History…"
                      value={filteredDebit}
                      onChange={e => {
                        setFilteredDebit(e.target.value)
                      }}
                      prefix={
                        <Icon type="search" style={{ color: "#D8D8D8" }} />
                      }
                    />
                  </div>
                </div> */}
                <Table
                  columns={HistoryColumn}
                  dataSource={transactions.dataData}
                  bordered
                  size="small"
                />
              </div>
            </TabPane>
            <TabPane tab="USSD" key="3">
              <div className="table_Group">
                {/* <div className="table_header">
                  <div className="rowShow">
                    <Button>
                      <CSVLink
                        data={ussdData}
                        filename={`${retailer.name}'s Data.csv`}
                        headers={headerDebit}
                        style={{ color: "white" }}
                      >
                        Export to CSV
                      </CSVLink>
                    </Button>
                  </div>
                  <div className="searchTable">
                    <Input
                      placeholder="Search Debit History…"
                      value={filteredDebit}
                      onChange={e => {
                        setFilteredDebit(e.target.value)
                      }}
                      prefix={
                        <Icon type="search" style={{ color: "#D8D8D8" }} />
                      }
                    />
                  </div>
                </div> */}
                <Table
                  columns={USSDColumn}
                  dataSource={transactions.ussdData}
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

export default ViewDetails

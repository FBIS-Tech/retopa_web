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
import "../../scss/Admin.scss"
import { CSVLink, CSVDownload } from "react-csv"
import { Base64 } from "js-base64"
import DealerLayout from "../../components/Layout/DealerLayout"
import { HistoryIcon } from "../../components/CustomIcons"
import { useSelector } from "react-redux"
import Green from "../../../assets/green.svg"
import Red from "../../../assets/red.svg"
import SubDealerLayout from "../../components/Layout/SubDealerLayout"
import DealerLoginInstance from "../../Api/DealerLoginInstance"
const { TabPane } = Tabs
const { Option } = Select
const Dash_history_icon = props => <Icon component={HistoryIcon} {...props} />

const RetailerSingleHistory = () => {
  const [VODHistory, setVODHistory] = useState([])
  const [DataHistory, setDataHistory] = useState([])
  const [AwufHistory, setAwufHistory] = useState([])
  const [VtuHistory, setVtuHistory] = useState([])
  const [spinning, setSpinning] = useState(true)
  const [usernameH, setUsernameH] = useState([])
  const [filteredCredit, setFilteredCredit] = useState("")
  const [filteredDebit, setFilteredDebit] = useState("")

  const { retailer } = useSelector(state => state)

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

    const VOD = {
      serviceCode: "TTV",
      username,
      type: "VOD",
      password,
      // user_id: retailer.user_id,
      user_id: 1,
    }

    //////////////VOD history//////////////////////
    const request = new Promise(res => {
      res(DealerLoginInstance.post("", VOD))
    })
    request.then(({ data }) => {
      if (data.status === "200") {
        setVODHistory(data.history)
      }
    })

    ///////////data history/////////////////
    const DATA = {
      serviceCode: "TTV",
      username,
      type: "DATA",
      password,
      user_id: retailer.user_id,
    }
    const requestData = new Promise(res => {
      res(DealerLoginInstance.post("", DATA))
    })
    requestData.then(({ data }) => {
      if (data.status === "200") {
        setDataHistory(data.history)
      }
    })
    ////////////AWUF history/////////////////
    const AWUF = {
      serviceCode: "TTV",
      username,
      type: "AWUF",
      password,
      user_id: retailer.user_id,
    }
    const requestAwuf = new Promise(res => {
      res(DealerLoginInstance.post("", AWUF))
    })
    requestAwuf.then(({ data }) => {
      if (data.status === "200") {
        setAwufHistory(data.history)
      }
    })
    ////////////AWUF history/////////////////
    const VTU = {
      serviceCode: "TTV",
      username,
      type: "VTU",
      password,
      user_id: retailer.user_id,
    }
    const requestVtu = new Promise(res => {
      res(DealerLoginInstance.post("", VTU))
    })
    requestVtu.then(({ data }) => {
      if (data.status === "200") {
        setSpinning(false)
        setVtuHistory(data.history)
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
      title: "Number",
      dataIndex: "phone",
      key: "phone",
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
    <SubDealerLayout title={title} position={["5"]}>
      <div>
        <div
          className="table_container"
          style={
            HistoryColumn.length <= 9 ? { height: "100vh" } : { height: "auto" }
          }
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="VTU" key="1">
              <div className="table_Group">
                <div className="table_header">
                  <div className="rowShow">
                    <Button>
                      <CSVLink
                        data={VtuHistory}
                        filename={"Wallet credits.csv"}
                        headers={headerCredit}
                        style={{ color: "white" }}
                      >
                        Export to CSV
                      </CSVLink>
                    </Button>
                  </div>
                  <div className="searchTable">
                    <Input
                      placeholder="Search Credit Wallet…"
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
                <Spin spinning={spinning} size="large" delay={0}>
                  <Table
                    columns={HistoryColumn}
                    dataSource={filteredVTUItems}
                    bordered
                    size="small"
                  />
                </Spin>
              </div>
            </TabPane>
            <TabPane tab="VOD" key="2">
              <div className="table_Group">
                <div className="table_header">
                  <div className="rowShow">
                    <Button>
                      <CSVLink
                        data={VODHistory}
                        filename={"Wallet Debits.csv"}
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
                </div>
                <Table
                  columns={HistoryColumn}
                  dataSource={filteredDebitItems}
                  bordered
                  size="small"
                />
              </div>
            </TabPane>
            <TabPane tab="DATA" key="3">
              <div className="table_Group">
                <div className="table_header">
                  <div className="rowShow">
                    <Button>
                      <CSVLink
                        data={DataHistory}
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
                </div>
                <Table
                  columns={HistoryColumn}
                  dataSource={filteredDataItems}
                  bordered
                  size="small"
                />
              </div>
            </TabPane>
            {/* <TabPane tab="AWUF" key="4">
              <div className="table_Group">
                <div className="table_header">
                  <div className="rowShow">
                    <Button>
                      <CSVLink
                        // data={history}
                        filename={"Wallet Debits.csv"}
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
                </div>
                <Table
                  columns={HistoryColumn}
                  dataSource={filteredAwufItems}
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

export default RetailerSingleHistory

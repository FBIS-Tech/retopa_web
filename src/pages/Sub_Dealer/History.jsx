import React, { useState, useEffect } from "react"
import { Table, Icon, Input, Select, Pagination, Tabs, Button } from "antd"
import "../../scss/Table.scss"
import "../../scss/Retailer.scss"
import { CSVLink, CSVDownload } from "react-csv"
import Instance from "../../Api/Instance"
import { Base64 } from "js-base64"
import { HistoryIcon } from "../../components/CustomIcons"
import SubDealerLayout from "../../components/Layout/SubDealerLayout"
const { TabPane } = Tabs
const { Option } = Select
const Dash_history_icon = props => <Icon component={HistoryIcon} {...props} />

const RetailerHistory = () => {
  const [history, setHistory] = useState([])
  const [historyCredit, setHistoryDebit] = useState([])
  const [usernameH, setUsernameH] = useState([])
  const [name, setName] = useState("")
  const [id, setID] = useState("")
  const [filteredCredit, setFilteredCredit] = useState("")
  const [filteredDebit, setFilteredDebit] = useState("")

  useEffect(() => {
    let onLogged = sessionStorage.getItem("persist:root")
      ? JSON.parse(sessionStorage.getItem("persist:root"))
      : []
    const { userData } = onLogged
    let allData = JSON.parse(userData)
    const { user_id } = allData
    setID(user_id)
    setUsernameH(allData.username)
    setName(allData.name)
    let data = sessionStorage.getItem("topup")
      ? JSON.parse(sessionStorage.getItem("topup"))
      : []

    const username = Base64.decode(data.TOKEN_ONE)
    const password = Base64.decode(data.TOKEN_TWO)
    // const req = { serviceCode: "SMM", username, password, user_id }
    const req = {
      serviceCode: "HSS",
      username,
      type: "VTU",
      id: user_id,
      rt_id: user_id,
      password,
      user_id,
    }
    const reqCredit = {
      serviceCode: "SMH",
      username,
      password,
      user_id,
    }

    const request = new Promise(res => {
      res(Instance.post("", req))
    })
    request.then(({ data }) => {
      if (data.status === "200") {
        setHistory(data.sub_dealers)
      }
    })
    const requestCredit = new Promise(res => {
      res(Instance.post("", reqCredit))
    })

    requestCredit.then(({ data }) => {
      if (data.status === "200") {
        //   var datat = data.history;
        //let cast = (array) datat
        console.log(data.history)
        setHistoryDebit(data.history)
      }
    })

    // get retailers
    const reqRtl = {
      serviceCode: "DHL",
      username,
      password,
      user_id,
      rt_id: user_id,
      d_id: user_id,
    }
    // request for retailer list
    const requestRtl = new Promise(res => {
      res(Instance.post("", reqRtl))
    })
    console.log(requestRtl)
    requestRtl.then(({ data }) => {
      // if (data.status === "200") {
      //   setRetailer(data.sub_dealers)
      // }
    })
  }, [])
  const HistoryColumn = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      render: (text, record) => (
        <p style={{ marginBottom: "0px" }}>{text === id ? name : "ADMIN"}</p>
      ),
    },
    {
      title: "Retailer Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: text => <p style={{ marginBottom: "0px" }}>{text}</p>,
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Transaction ref",
      dataIndex: "ref",
      key: "ref",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
    },
  ]

  const filteredDebitItems = history.filter(item =>
    item.ref.includes(filteredDebit.toLocaleLowerCase())
  )
  const filteredCreditItems = historyCredit.filter(item =>
    item.ref.includes(filteredCredit.toLocaleLowerCase())
  )

  const title = (
    <h4>
      <Dash_history_icon style={{ marginRight: "10px" }} />
      History
    </h4>
  )

  const headerDebit = [
    { label: "Source", key: "source" },
    { label: "Retailer Name", key: "destination" },
    { label: "Amount", key: "amount" },
    { label: "Type", key: "type" },
    { label: "Transaction ref", key: "ref" },
    { label: "Created at", key: "time" },
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
            {/* <TabPane tab="Credit History" key="1">
              <div className="table_Group">
                <div className="table_header">
                  <div className="rowShow">
                    <Button>
                      <CSVLink
                        data={historyCredit}
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
                <Table
                  columns={HistoryColumnTwo}
                  dataSource={filteredCreditItems}
                  bordered
                  size="small"
                />
              </div>
            </TabPane> */}
            <TabPane tab="History" key="1">
              <div className="table_Group">
                <div className="table_header">
                  <div className="rowShow">
                    <Button>
                      <CSVLink
                        data={history}
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
                {/* <Pagination
            total={TableOne.length}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            pageSize={10}
            defaultCurrent={1}
          /> */}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </SubDealerLayout>
  )
}

export default RetailerHistory

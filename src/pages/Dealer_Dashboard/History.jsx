import React, { useState, useEffect } from "react"
import { Table, Icon, Input, Select, Pagination, Tabs } from "antd"
import { ColumnsTwo, TableTwo } from "../../components/Constants/Tableone"
import "../../scss/Retailer.scss"
// import { HistoryColumn, History } from "../../components/Constants/historyTable"
import Instance from "../../Api/Instance"
import { Base64 } from "js-base64"
import DealerLayout from "../../components/Layout/DealerLayout"
import { HistoryIcon } from "../../components/CustomIcons"
const { TabPane } = Tabs
const { Option } = Select
const Dash_history_icon = props => <Icon component={HistoryIcon} {...props} />

const RetailerHistory = () => {
  const [history, setHistory] = useState([])
  const [historyCredit, setHistoryDebit] = useState([])
  const [usernameH, setUsernameH] = useState([])

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
    const req = { serviceCode: "SMM", username, password, user_id }
    const reqDebit = { serviceCode: "SMH", username, password, user_id }

    const request = new Promise(res => {
      res(Instance.post("", req))
    })
    request.then(({ data }) => {
      if (data.status === "200") {
        setHistory(data.history)
      }
    })
    const requestCredit = new Promise(res => {
      res(Instance.post("", reqDebit))
    })
    console.log(requestCredit)
    requestCredit.then(({ data }) => {
      if (data.status === "200") {
        setHistoryDebit(data.history)
      }
    })
  }, [])
  const HistoryColumn = [
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      render: (text, record) => (
        <p style={{ marginBottom: "0px" }}>
          {record.source === 1 ? usernameH : "ADMIN"}
        </p>
      ),
    },
    {
      title: "Retailer Name",
      dataIndex: "destination",
      key: "destination",
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
      dataIndex: "time",
      key: "time",
    },
  ]

  const title = (
    <h4>
      <Dash_history_icon style={{ marginRight: "10px" }} />
      History
    </h4>
  )
  return (
    <DealerLayout title={title} position={["5"]}>
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
                    <Select
                      defaultValue="10"
                      style={{ width: 70 }}
                      // onChange={handleChange}
                    >
                      <Option value="10">10</Option>
                      <Option value="15">15</Option>
                      <Option value="20">20</Option>
                      <Option value="25">25</Option>
                    </Select>
                    <h4>Records per page</h4>
                  </div>
                  <div className="searchTable">
                    <Input
                      placeholder="Search Retailer…"
                      prefix={
                        <Icon type="search" style={{ color: "#D8D8D8" }} />
                      }
                    />
                  </div>
                </div>
                <Table
                  columns={HistoryColumn}
                  dataSource={historyCredit}
                  bordered
                  size="small"
                />
              </div>
            </TabPane>
            <TabPane tab="Debit History" key="2">
              <div className="table_Group">
                <div className="table_header">
                  <div className="rowShow">
                    <Select
                      defaultValue="10"
                      style={{ width: 70 }}
                      // onChange={handleChange}
                    >
                      <Option value="10">10</Option>
                      <Option value="15">15</Option>
                      <Option value="20">20</Option>
                      <Option value="25">25</Option>
                    </Select>
                    <h4>Records per page</h4>
                  </div>
                  <div className="searchTable">
                    <Input
                      placeholder="Search Retailer…"
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
    </DealerLayout>
  )
}

export default RetailerHistory

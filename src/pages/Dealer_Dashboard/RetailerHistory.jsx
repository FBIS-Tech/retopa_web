import React, { useState, useEffect } from "react"
import { Table, Icon, Input, Select, Pagination, Tabs } from "antd"
import { ColumnsTwo, TableTwo } from "../../components/Constants/Tableone"
import "../../scss/Retailer.scss"
import { HistoryColumn, History } from "../../components/Constants/historyTable"
import Instance from "../../Api/Instance"
import Cryptr from "cryptr"
const { TabPane } = Tabs
const { Option } = Select

const RetailerHistory = () => {
  const [history, setHistory] = useState([])
  const cryptr = new Cryptr("retopaToken")
  useEffect(() => {
    let onLogged = sessionStorage.getItem("persist:root")
      ? JSON.parse(sessionStorage.getItem("persist:root"))
      : []
    const { userData } = onLogged
    let allData = JSON.parse(userData)
    const { user_id } = allData
    let data = sessionStorage.getItem("topup")
      ? JSON.parse(sessionStorage.getItem("topup"))
      : []

    const username = cryptr.decrypt(data.TOKEN_ONE)
    const password = cryptr.decrypt(data.TOKEN_TWO)
    const req = { serviceCode: "SHR", username, password, user_id }

    const request = new Promise(res => {
      res(Instance.post("", req))
    })
    request.then(({ data }) => {
      if (data.status === "200") {
        setHistory(data.history)
      }
    })
  }, [])
  return (
    <div>
      <div
        className="table_container"
        style={
          HistoryColumn.length <= 9 ? { height: "100vh" } : { height: "auto" }
        }
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Fund History" key="1">
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
                    prefix={<Icon type="search" style={{ color: "#D8D8D8" }} />}
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
  )
}

export default RetailerHistory

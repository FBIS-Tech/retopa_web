import React, { useState, useEffect } from "react"
import { Table, Icon, Input, Select, Pagination, Button, Tabs } from "antd"
import { Columns, TableOne } from "../../components/Constants/Tableone"
import "../../scss/Retailer.scss"
import "../../scss/Dealer_home.scss"
import { History, HistoryColumn } from "../../components/Constants/historyTable"
import RetailerHistory from "./History"
import DealerActivities from "../../components/DealerActivities"
import Instance from "../../Api/Instance"
import { Base64 } from "js-base64"
import DealerLayout from "../../components/Layout/DealerLayout"
import { WalletIcon } from "../../components/CustomIcons"
import SubDealerLayout from "../../components/Layout/SubDealerLayout"
const { Option } = Select
const { TabPane } = Tabs
const Dash_bill_icon = props => <Icon component={WalletIcon} {...props} />

const Retailer = () => {
  const [balance, setBalance] = useState("0")
  useEffect(() => {
    //gets user details
    let onLogged = sessionStorage.getItem("persist:root")
      ? JSON.parse(sessionStorage.getItem("persist:root"))
      : []
    const { userData } = onLogged
    let allData = JSON.parse(userData)
    const { user_id } = allData
    let data = sessionStorage.getItem("topup")
      ? JSON.parse(sessionStorage.getItem("topup"))
      : []
    const username = Base64.decode(data.TOKEN_ONE)
    const password = Base64.decode(data.TOKEN_TWO)
    const req = {
      serviceCode: "DDB",
      username,
      id: user_id,
      password,
    }
    const request = new Promise(res => {
      res(Instance.post("", req))
    })
    request.then(({ data }) => {
      ////console.log(data)
      if (data.status === "200") {
        setBalance(data.balance)
      }
    })
  }, [])
  const title = (
    <h4>
      <Dash_bill_icon style={{ marginRight: "10px" }} />
      Wallet
    </h4>
  )
  return (
    <SubDealerLayout title={title} position={["3"]}>
      <div>
        <div
          className="table_container"
          style={
            TableOne.length <= 9 ? { height: "100vh" } : { height: "auto" }
          }
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="MTN VTU" key="1">
              <div className="table_header">
                <div className="rowShow">
                  <h4>MTN VTU Wallet</h4>
                </div>
              </div>
              <div
                className="all_activities_container"
                style={{ border: "1px solid #F0F0F0" }}
              >
                <div className="allActivityGroup">
                  <DealerActivities
                    title="MTN WALLET BALANCE"
                    price={`₦ ${balance}`}
                  />
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </SubDealerLayout>
  )
}

export default Retailer

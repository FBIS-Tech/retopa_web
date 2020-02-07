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
import Green from "../../../assets/green.svg"
import Red from "../../../assets/red.svg"
const { TabPane } = Tabs
const { Option } = Select
const Dash_history_icon = props => <Icon component={HistoryIcon} {...props} />

const SubDealerList = () => {
  const [VODHistory, setVODHistory] = useState([])
  const [DataHistory, setDataHistory] = useState([])
  const [AwufHistory, setAwufHistory] = useState([])
  const [VtuHistory, setVtuHistory] = useState([])
  const [historyCredit, setHistoryDebit] = useState([])
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
    let data = sessionStorage.getItem("topup")
      ? JSON.parse(sessionStorage.getItem("topup"))
      : []

    const username = Base64.decode(data.TOKEN_ONE)
    const password = Base64.decode(data.TOKEN_TWO)

    ////////////AWUF history/////////////////
    const VTU = {
      serviceCode: "DHL",
      username,
      type: "VTU",
      password,
      user_id,
      rt_id: retailer.user_id,
      d_id: retailer.user_id,
    }
    const requestVtu = new Promise(res => {
      res(Instance.post("", VTU))
    })
    requestVtu.then(({ data }) => {
      console.log(data)
      if (data.status === "200") {
        let retailers = data.sub_dealers
        setVtuHistory(retailers)
      }
    })
  }, [])

  const ColumnsTwo = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",

      // render: text => <a>{text}</a>,
    },
    {
      title: "Full name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",

      // render: text => <a>{text}</a>,
    },

    {
      title: "Retailer number",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "USSD Code",
      dataIndex: "code",
      key: "code",
      render: (text, record) => (
        <div>
          {record.tp_no}
          {record.code}
        </div>
      ),

      // align: "right",
    },
    {
      title: "POS Status",
      dataIndex: "status",
      key: "status",

      render: text =>
        text === 1 ? (
          <p className="enabled">
            <Green className="dotPosition" />
            Enable
          </p>
        ) : (
          <p className="disabled">
            <Red className="dotPosition" />
            Disabled
          </p>
        ),
    },
    {
      title: "Dealer",
      dataIndex: "d_id",
      key: "d_id",
      render: (text, record) => (
        <p style={{ marginBottom: "0px" }}>{retailer.name}</p>
      ),
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",

      // align: "right",
    },
  ]

  const filteredVTUItems = VtuHistory.filter(item =>
    item.name.includes(filteredCredit.toLocaleLowerCase())
  )

  const title = (
    <h4>
      <Dash_history_icon style={{ marginRight: "10px" }} />
      {retailer.name}'s Retailer List
    </h4>
  )
  const headerCredit = [
    { label: "Source", key: "source" },
    { label: "Retailer Name", key: "destination" },
    { label: "Amount", key: "amount" },
    { label: "Transaction ref", key: "ref" },
    { label: "Created at", key: "created_at" },
  ]
  const headerDebit = [
    { label: "Source", key: "source" },
    { label: "Retailer Name", key: "destination" },
    { label: "Amount", key: "amount" },
    { label: "Transaction ref", key: "ref" },
    { label: "Created at", key: "time" },
  ]
  return (
    <DealerLayout title={title} position={["5"]}>
      <div>
        <div
          className="table_container"
          style={
            ColumnsTwo.length <= 9 ? { height: "100vh" } : { height: "auto" }
          }
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Retailer List" key="1">
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
                <Table
                  columns={ColumnsTwo}
                  dataSource={filteredVTUItems}
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

export default SubDealerList

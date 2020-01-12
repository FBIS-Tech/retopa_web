import React, { useState } from "react"
import {
  Table,
  Icon,
  Input,
  Select,
  Pagination,
  Button,
  Tabs,
  Popover,
  Form,
} from "antd"
import "../../scss/Table.scss"
import { TableTwo } from "../../components/Constants/Tableone"
import "../../scss/Retailer.scss"
import Green from "../../../assets/green.svg"
import Red from "../../../assets/red.svg"

import { openTokenForm } from "../../Actions/ActionsType"
// import { useSelector, useDispatch } from "react-redux"

const { TabPane } = Tabs

const { Option } = Select

const RetailerList = () => {
  const [openToken, setOpenToken] = useState(false)
  // const { tokenForm } = useSelector(state => state)
  // const dispatch = useDispatch()

  const ColumnsTwo = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",

      // render: text => <a>{text}</a>,
    },
    {
      title: "Full name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Retailer number",
      dataIndex: "retailerNumber",
      key: "retailerNumber",
    },

    {
      title: "Token",
      dataIndex: "token",
      key: "token",

      // align: "right",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: text =>
        text === "enable" ? (
          <p className="enabled">
            <Green className="dotPosition" />
            {text}
          </p>
        ) : (
          <p className="disabled">
            <Red className="dotPosition" />
            {text}
          </p>
        ),
    },
    {
      title: "Created at",
      dataIndex: "date",
      key: "date",

      // align: "right",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popover
          content={
            <div className="pop_content">
              <p
                onClick={() => {
                  setOpenToken(!openToken)
                }}
              >
                Send Token
              </p>
              <p>Edit</p>
            </div>
          }
          placement="bottom"
          //  title="Title"
          trigger="click"
        >
          <span className="popover">...</span>
        </Popover>
      ),
    },
  ]

  // handle retail tab click{}
  const handleRetailTab = () => {
    setOpenToken(false)
  }

  return (
    <div>
      <Tabs defaultActiveKey="1" onTabClick={handleRetailTab}>
        <TabPane tab="Retailer List" key="1">
          <div
            className={openToken ? "hide" : "table_container"}
            style={
              TableTwo.length <= 9 ? { height: "100vh" } : { height: "auto" }
            }
          >
            <div className="table_Group">
              <div className="table_header">
                <div className="rowShow">
                  <Button>Fund Wallet</Button>
                </div>
                <div className="searchTable">
                  <Input
                    placeholder="Search Retailer…"
                    prefix={<Icon type="search" style={{ color: "#D8D8D8" }} />}
                  />
                </div>
              </div>
              <Table
                columns={ColumnsTwo}
                dataSource={TableTwo}
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
          </div>
          <div className={openToken ? "sendTokenContainer" : "hide"}>
            <div className="sendTokenGroup">
              <div className="tokenTitle">
                <h4>Send Token</h4>
              </div>
              <div className="tokenForm">
                <Form layout="vertical">
                  <Form.Item label="Phone Number">
                    <Input placeholder="2346208675" />
                  </Form.Item>
                  <Form.Item label="Amount">
                    <Input placeholder="Enter Amount Here" />
                  </Form.Item>
                  <Form.Item label="Token">
                    <Input placeholder="****" />
                  </Form.Item>
                  <Form.Item label="Network">
                    <Input placeholder="MTN" />
                  </Form.Item>
                </Form>
              </div>
              <div className="btnTokenGroup"></div>
              <div className="tokenBtn">
                <Button>Send Token</Button>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default RetailerList

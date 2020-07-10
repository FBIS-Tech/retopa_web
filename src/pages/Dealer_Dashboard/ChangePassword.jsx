import React, { useState } from "react"
import "../../scss/Retailer.scss"
import "../../scss/Admin.scss"
import "../../scss/Export.scss"
import { Input, Button, Tabs, Popover, Icon, Table } from "antd"
import DealerLayout from "../../components/Layout/DealerLayout"
import { VoucherIcon } from "../../components/CustomIcons"
const { TabPane } = Tabs
const Dash_voucher_icon = props => <Icon component={VoucherIcon} {...props} />

const ChangePassword = () => {
  const data = [
    {
      batch: "1",
      network: "MTN",
      domination: "500",
      units: "50",
      date: "2019-10-11   11:54:01",
    },
    {
      batch: "2",
      network: "MTN",
      domination: "500",
      units: "50",
      date: "2019-10-11   11:54:01",
    },
    {
      batch: "3",
      network: "MTN",
      domination: "500",
      units: "50",
      date: "2019-10-11   11:54:01",
    },
  ]
  const VoucherColumn = [
    {
      title: "Batch",
      dataIndex: "batch",
      key: "batch",
    },
    {
      title: "Network",
      dataIndex: "network",
      key: "network",
    },

    {
      title: "Domination",
      dataIndex: "domination",
      key: "domination",
    },
    {
      title: "Units",
      dataIndex: "units",
      key: "units",
    },
    {
      title: "Date Created/Time",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popover
          content={
            <div className="pop_content">
              <p>Download Encrypted</p>
            </div>
          }
          placement="bottom"
          trigger="click"
        >
          <span className="popover">...</span>
        </Popover>
      ),
    },
  ]
  const title = (
    <h4>
      <Dash_voucher_icon style={{ marginRight: "10px" }} />
      Voucher
    </h4>
  )
  return (
    <DealerLayout title={title} position={["4"]}>
      <div className="adminContainer">
        <div className="adminGroup">
          <div className="admin">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Generate Pins" key="1">
                <div className="formContainer">
                  <div className="formTitle">
                    <p>Generate Pins</p>
                  </div>
                  <div className="formGroup">
                    <div className="adminForm">
                      <div className="formInput VoucherInput">
                        <label htmlFor="name">VTU Line</label>
                        <Input
                          placeholder="Enter name here..."
                          className="inputBack"
                        />
                      </div>

                      <div className="formInput VoucherInput">
                        <label htmlFor="name">Denomination</label>
                        <Input placeholder="500" />
                      </div>
                      <div className="formInput VoucherInput">
                        <label htmlFor="name">Unit</label>
                        <Input
                          placeholder="Enter Units"
                          className="inputBack"
                        />
                      </div>
                      <div className="formInput VoucherInput">
                        <label htmlFor="name">Your Key</label>
                        <Input placeholder="Please enter your secret key" />
                      </div>
                    </div>
                  </div>
                  <div className="adminFormBtn">
                    <div className="btngroup">
                      <Button>Generate Pin(s)</Button>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Pin Requests" key="2">
                <div className="table_Group">
                  <div className="table_header">
                    <div className="rowShow">
                      <h4>Pin Requests Table</h4>
                    </div>
                    <div className="searchTable">
                      <Input
                        placeholder="Search Admin…"
                        prefix={
                          <Icon type="search" style={{ color: "#D8D8D8" }} />
                        }
                      />
                    </div>
                  </div>
                  <Table
                    columns={VoucherColumn}
                    dataSource={data}
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
              <TabPane tab="Pin Query" key="3">
                <div className="formContainer">
                  <div className="formTitle">
                    <p>Pin Query</p>
                  </div>
                  <div className="formGroup">
                    <div className="adminForm">
                      <div className="formInput exportInput">
                        <label htmlFor="name">Pin</label>
                        <Input placeholder="Enter Pin" className="inputBack" />
                      </div>
                    </div>
                  </div>
                  <div className="adminFormBtn">
                    <div className="btngroup">
                      <Button>Query</Button>
                    </div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </DealerLayout>
  )
}

export default ChangePassword

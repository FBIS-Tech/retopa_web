import React, { useState } from "react"
import "../../scss/Retailer.scss"
import "../../scss/Admin.scss"
import "../../scss/Export.scss"
import { Input, Button, Tabs, Icon } from "antd"
import DealerLayout from "../../components/Layout/DealerLayout"
import { ExportIcon } from "../../components/CustomIcons"
const Dash_export_icon = props => <Icon component={ExportIcon} {...props} />
const { TabPane } = Tabs

const Export = () => {
  const title = (
    <h4>
      <Dash_export_icon style={{ marginRight: "10px" }} />
      Export Data
    </h4>
  )
  return (
    <DealerLayout title={title} position={["9"]}>
      <div className="adminContainer">
        <div className="adminGroup">
          <div className="admin">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Export" key="1">
                <div className="formContainer">
                  <div className="formTitle">
                    <p>Export Data To PDF/Excel</p>
                  </div>
                  <div className="formGroup">
                    <div className="adminForm">
                      <div className="formInput exportInput">
                        <label htmlFor="name">From</label>
                        <Input
                          placeholder="Enter name here..."
                          className="inputBack"
                        />
                      </div>

                      <div className="formInput exportInput">
                        <label htmlFor="name">To</label>
                        <Input placeholder="Enter email here..." />
                      </div>
                      <div className="formInput exportInput">
                        <label htmlFor="name">Email</label>
                        <Input placeholder="****" className="inputBack" />
                      </div>
                      <div className="formInput exportInput">
                        <label htmlFor="name">Token</label>
                        <Input placeholder="Confirm Password..." />
                      </div>
                    </div>
                  </div>
                  <div className="adminFormBtn">
                    <div className="btngroup">
                      <Button>Submit</Button>
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

export default Export

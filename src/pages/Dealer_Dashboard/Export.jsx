import React, { useState } from "react"
import "../../scss/Retailer.scss"
import "../../scss/Admin.scss"
import { Input, Button, Tabs } from "antd"
const { TabPane } = Tabs

const Export = () => {
  return (
    <>
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
                      <div className="formInput">
                        <label htmlFor="name">From</label>
                        <Input
                          placeholder="Enter name here..."
                          className="inputBack"
                        />
                      </div>

                      <div className="formInput">
                        <label htmlFor="name">To</label>
                        <Input placeholder="Enter email here..." />
                      </div>
                      <div className="formInput">
                        <label htmlFor="name">Email</label>
                        <Input placeholder="****" className="inputBack" />
                      </div>
                      <div className="formInput">
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
    </>
  )
}

export default Export

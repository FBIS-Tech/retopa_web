import React, { useState } from "react"
import "../../scss/Retailer.scss"
import "../../scss/merchantPayment.scss"
import { Tabs, Button } from "antd"
import CardDetails from "../../components/Constants/CreditCardDetails"
const { TabPane } = Tabs

const Payment = () => {
  return (
    <>
      <div className="cardPageContainer">
        <div className="cardPageGroup">
          <div className="payment admin">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Card" key="1">
                <div className="formContainer">
                  <div className="formTitle">
                    <p>Card</p>
                  </div>
                  <div className="cardsContainer">
                    <div className="cardsGroup">
                      <div className="viewCards">
                        <div className="cardBtn">
                          <Button>
                            <p>+</p>
                            <p>Add Card</p>
                          </Button>
                        </div>
                        <CardDetails />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Bank" key="2">
                bank
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment

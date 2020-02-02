import React, { useState } from "react"
import "../../scss/Retailer.scss"
import "../../scss/merchantPayment.scss"
import { Tabs, Button, Modal } from "antd"
import CardDetails from "../../components/Constants/CreditCardDetails"
import DealerLayout from "../../components/Layout/DealerLayout"
import Master from "../../images/masterCard.png"
import { Icon } from "antd"
import { PaymentIcon } from "../../components/CustomIcons"
// const { Header, Content, Sider } = Layout

const Dash_payment_icon = props => <Icon component={PaymentIcon} {...props} />
const { TabPane } = Tabs

const Payment = () => {
  const [visible, setVisible] = useState(false)
  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }
  const title = (
    <h4>
      <Dash_payment_icon style={{ marginRight: "10px", fontSize: "16px" }} />
      Payment
    </h4>
  )
  return (
    <DealerLayout title={title} position={["6"]}>
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
                          <Button onClick={showModal}>
                            <p>+</p>
                            <p>Add Card</p>
                          </Button>
                        </div>
                        <CardDetails
                          number="**** 7268"
                          title="Expires Mar 2022"
                          image={Master}
                        />
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
      <div className="modal">
        <Modal
          title="Add Card"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Proceed"
          okType="default"
          centered
        >
          To add and verify card N100 will be charged and saved into your wallet
        </Modal>
      </div>
    </DealerLayout>
  )
}

export default Payment

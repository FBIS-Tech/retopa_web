import React, { useState } from "react"
import "../../scss/User_Payment.scss"
import { Button, Icon, Input } from "antd"
import { CardIcon } from "../../components/CustomIcons"
import { Link } from "gatsby"
const Card_Icon = props => <Icon component={CardIcon} {...props} />

const User_Payment = () => {
  const [opacity, setOpacity] = useState(true)
  return (
    <>
      <div className="paymentcontainer">
        <div className="payment_left_container">
          <div className="payment_container_group">
            <p className="cardInfo_payment">No Cards is added</p>
            <Button
              onClick={() => {
                setOpacity(!opacity)
              }}
            >
              <Card_Icon />
              <p>Add Credit / Debit Card</p>
            </Button>
          </div>
        </div>
        <div className="payment_billing_container">
          <div
            className={
              opacity ? "payment_billing_group" : "payment_billing_group_on"
            }
          >
            <h4>Billing Address</h4>
            <p style={{ paddingBottom: "13px" }}>
              Kindly enter your Card details here
            </p>
            <fieldset>
              <legend>Enter card number</legend>
              <input
                disabled={opacity ? true : false}
                type="text"
                placeholder="**** **** **** 6787"
              />
            </fieldset>
            <div className="fieldset_bottom">
              <fieldset className="fieldset_one">
                <legend>Expiry date</legend>
                <input
                  disabled={opacity ? true : false}
                  type="text"
                  placeholder="MM/YY"
                />
              </fieldset>
              <fieldset className="fieldset_two">
                <legend>Enter CVV</legend>
                <input
                  disabled={opacity ? true : false}
                  type="text"
                  placeholder="CVV"
                />
              </fieldset>
            </div>
            <h6>
              By clicking on top-up it means you’ve agreed to retopa
              <Link> terms and conditions</Link>
            </h6>
            <Button disabled={opacity ? true : false}>Add Card</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default User_Payment

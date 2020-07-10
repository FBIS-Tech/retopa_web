import React, { useState } from "react"
import DashLayout from "../../components/Layout/DashLayout"
import "../../scss/User_airtime.scss"
import { Icon, Select, Input, Button } from "antd"
import Mtn from "../../../assets/small_mtn.svg"
import useTopUpHooks from "./hook/useTopUpHooks"
import PaystackButton from "react-paystack"

const { Option } = Select

const User_Airtime = () => {
  const [
    airtimeShow,
    dataShow,
    ToggleAirtime,
    ToggleData,
    disabled,
    handleDisabled,
    key,
  ] = useTopUpHooks()

  const email = "foobar@example.com" // customer email
  const amount = 10000 //equals NGN100,
  const callback = response => {
    ////console.log(response) // card charged successfully, get reference here
  }

  const close = () => {
    ////console.log("Payment closed")
  }

  const getReference = () => {
    //you can put any unique reference implementation code here
    let text = ""
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.="

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
  }

  return (
    <>
      <div className="user_airtime_container">
        <div className="user_airtime_group">
          <div className="user_airtime_left">
            <div className="user_airtime_topUp_group">
              <div className="Airtime_Top_up_container">
                <div className="Airtime_Top_up_title" onClick={ToggleAirtime}>
                  <h4>Airtime Top-up</h4>
                  <Icon type={!airtimeShow ? "caret-down" : "caret-up"} />
                </div>
                <div className={airtimeShow ? "airtime_drop_down" : "hide"}>
                  <Select defaultValue="Mtn" style={{ width: "100%" }}>
                    <Option value="Mtn">Mtn</Option>
                    <Option value="Glo">Glo</Option>
                    <Option value="9Mobile">9Mobile</Option>
                    <Option value="Airtel">Airtel</Option>
                  </Select>
                  <div className="bottom">
                    <p>You can buy airtime worth of N100,000.00</p>
                    <Input prefix="‎₦" />
                    <Button>Top Up</Button>
                  </div>
                </div>
              </div>
              <div className="Airtime_Top_up_container DataTopUp">
                <div className="Airtime_Top_up_title " onClick={ToggleData}>
                  <h4>Data Top-up</h4>
                  <Icon type={!dataShow ? "caret-down" : "caret-up"} />
                </div>
                <div className={dataShow ? "airtime_drop_down" : "hide"}>
                  <Select defaultValue="Mtn" style={{ width: "100%" }}>
                    <Option value="Mtn">Mtn</Option>
                    <Option value="Glo">Glo</Option>
                    <Option value="9Mobile">9Mobile</Option>
                    <Option value="Airtel">Airtel</Option>
                  </Select>
                  <div className="bottom">
                    <p>You can buy airtime worth of N100,000.00</p>
                    <Input prefix="‎₦" />
                    <Button>Top Up</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="user_airtime_right">
            <div className="Airtime_Top_up_container right_topup_container">
              <div className="Airtime_Top_up_title">
                <h4>Airtime Top-up</h4>
                <Button onClick={handleDisabled}>Edit</Button>
              </div>
              <div className="airtime_drop_down">
                <Select
                  defaultValue="Mtn"
                  disabled={disabled ? true : false}
                  style={{ width: "100%" }}
                >
                  <Option value="Mtn">Mtn</Option>
                  <Option value="Glo">Glo</Option>
                  <Option value="9Mobile">9Mobile</Option>
                  <Option value="Airtel">Airtel</Option>
                </Select>
                <div className="bottom">
                  <p>You can buy airtime worth of N100,000.00</p>
                  <Input prefix="‎₦" disabled={disabled ? true : false} />
                </div>
                <div className="paystack_billing">
                  <h4>Billing Address</h4>
                  <p>Kindly enter your Card details here</p>
                  <p>
                    <PaystackButton
                      text="Buy Now"
                      className="payButton"
                      callback={callback}
                      close={close}
                      disabled={false}
                      embed={true}
                      reference={getReference()}
                      email={email}
                      amount={amount}
                      paystackkey={key}
                      tag="button"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default User_Airtime

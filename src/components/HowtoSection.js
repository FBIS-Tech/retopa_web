import React from "react"
import "../scss/HowToSect.scss"
import Hand from "../images/Hand.png"
import { Button } from "antd"

export default function HowtoSection() {
  return (
    <div className="HowToSectionGroup">
      <div className="HowTo_sect_top">
        <h4>Simple, Easy and fast way to topup</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor st,
          sed do eiusmod tempor incididuet dolore{" "}
        </p>
      </div>
      <div className="how_to_position">
        <div className="HowTo_sect_right">
          <img src={Hand} style={{ margin: "0px" }} />
        </div>
        <div className="HowTo_sect_right">
          <h4 className="steps_title">
            Start Retoping in less than 10 seconds
          </h4>
          <div className="steps">
            <div className="step">
              <h4 className="number">01</h4>
              <h4 className="title">Create an account</h4>
            </div>
            <div className="step2">
              <h4 className="divider"></h4>
              <h4 className="step_text">
                Sign up for an account with your name, email and phone number
              </h4>
            </div>
            <div className="step">
              <h4 className="number">02</h4>
              <h4 className="title">Create an account</h4>
            </div>
            <div className="step2">
              <h4 className="divider"></h4>
              <h4 className="step_text">
                Using your debit card, bank account, USSD setup your payment
                plan
              </h4>
            </div>
            <div className="step">
              <h4 className="number">03</h4>
              <h4 className="title">Create an account</h4>
            </div>
            <div className="step2">
              {/* <h4 className="divider"></h4> */}
              <h4 className="step_text third">
                Start enjoying RETOPA by Recharging your phone, Buying Airtime
                and paying bills in less than 10 seconds
              </h4>
            </div>
          </div>
          <Button>Get Started</Button>
        </div>
      </div>
    </div>
  )
}

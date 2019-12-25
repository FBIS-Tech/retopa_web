import React from "react"
import Layout from "../components/Layout/Layout"
import "../scss/MerchantHero.scss"
import "../scss/AirTime.scss"
import { Button, Icon } from "antd"
import LadyHero from "../images/Untitled-1@3x 1.png"
import Imac from "../../assets/icon_iMac.svg"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"
import "react-accessible-accordion/dist/fancy-example.css"
import { Accordion_Airtime } from "../components/Constants/AirtimePage"

const Airtime = () => {
  return (
    <Layout>
      <div className="hero">
        <div className="hero_merchant_container">
          <div className="merchant_hero_left">
            <h3>Airtime/Data Recharge & Bills Payment</h3>
            <p>
              Recharge your phone anywhere and anytime using your ATM card. Load
              or send recharge pin with a single button.
            </p>
            <div className="stores">
              <Button>
                Get started <Icon type="arrow-right" />
              </Button>
            </div>
          </div>
          <div className="hero_right">
            <img src={LadyHero} />
          </div>
        </div>
      </div>
      <div className="features_container two">
        <div className="features_group airtime_group">
          <h4 className="airTime_title">
            Simple, Easy and fast way to Recharge Airtime, Data & Bills Payment
          </h4>
          <p className="airTime_text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor st,
            sed do eiusmod tempor incididuet dolore{" "}
          </p>
          <div className="feature_illustration">
            <div className="illustration_right">
              <h4 className="airTime_illustration_title">Airtime Recharge</h4>
              <p className="airTime_illustration_text">
                You can recharge as much as #1,000,000 with retopa and is so
                simple, easy and very fast to recharge as much as you wish
              </p>
              <h4 className="airTime_illustration_title">Data Recharge</h4>
              <p className="airTime_illustration_text">
                You can Subscribe as much as #1,000,000 with retopa and is so
                simple, easy and very fast to recharge as much as you wish
              </p>
              <h4 className="airTime_illustration_title">Bills Payment</h4>
              <p className="airTime_illustration_text">
                You can pay all kinds of bills with retopa, ranges from DSTV,
                GOTV, Startime PHCN Bill, Waste bills, and many more.
              </p>
              <Button>Get Started</Button>
            </div>
            <div className="illustration_left">
              <Imac />
            </div>
          </div>
        </div>
      </div>
      <div className="merchant_faq">
        <div className="merchant_faq_group">
          <h4 className="merchant_faq_title">Wondering how it works</h4>
          <p className="merchant_faq_text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor sit
            amet,
          </p>
          <div className="merchant_accordion_container">
            <div className="merchant_accordion_group">
              <Button>FAQ’s on Recharge</Button>
              <div className="accordion_view">
                <p className="accordion_view_title">Recharge</p>
                <div className="accordion">
                  <Accordion allowZeroExpanded={true}>
                    {Accordion_Airtime.map(data => {
                      return (
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              {data.title}
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                            <p>{data.text}</p>
                          </AccordionItemPanel>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Airtime

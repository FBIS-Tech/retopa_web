import React from "react"
import Layout from "../components/Layout/Layout"
import "../scss/MerchantHero.scss"
import LadyHero from "../images/Untitled-1@3x 1.png"
import { Button } from "antd"
import {
  NumbersCard,
  RecruitCard,
  AccordionInfo,
} from "../components/Constants/MerchantPage"
import Imac from "../../assets/icon_iMac.svg"
import DashImac from "../../assets/dashicon_iMac.svg"
import RetailImac from "../../assets/retailicon_iMac.svg"
import LastIconImac from "../../assets/Lasticon_iMac.svg"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"
import "react-accessible-accordion/dist/fancy-example.css"

const Merchants = () => {
  return (
    <Layout>
      <div className="hero">
        <div className="hero_merchant_container">
          <div className="merchant_hero_left">
            <h3>Merchant/Dealer</h3>
            <p>
              Recharge your phone anywhere and anytime using your ATM card. Load
              or send recharge pin with a single button.
            </p>
            <div className="stores">
              <Button>Fund Wallet</Button>
            </div>
          </div>
          <div className="hero_right hero_right_merchant">
            <img src={LadyHero} alt="hero_pic" />
          </div>
        </div>
      </div>
      <div className="numbers">
        <div className="numbersGroup">
          <h3>Current numbers</h3>
          <div className="numbers_list">
            {NumbersCard.map(data => {
              return (
                <div className="card_number_container">
                  <div className="card_number_group">
                    <div className="image">{data.image}</div>
                    <h4 className="cardNumber">{data.numbers}</h4>
                    <h4 className="cardText">{data.text}</h4>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="recruit_container">
        <div className="recruit_group">
          <h4 className="recruit_title">
            How Retopa Merchants works in Simple, easy and fastest way to please
            your Retailer
          </h4>
          <p className="recruit_text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et
          </p>
          <div className="recruitCard">
            {RecruitCard.map(data => {
              return (
                <div className="recruit_container">
                  <div className="recruitCard_group">
                    <div className="image">{data.image}</div>
                    <h4 className="cardTitle">{data.title}</h4>
                    <h4 className="cardText">{data.text}</h4>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="features_container">
        <div className="features_group">
          <h3 className="features_title">Features and how retopa works</h3>
          <p className="features_text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore
          </p>
          <div className="feature_illustration">
            <div className="illustration_left">
              <DashImac />
            </div>
            <div className="illustration_right">
              <h4 className="illustration_title">
                Get a massive discount at a very reasonale price
              </h4>
              <p>
                With our assesment tool, it get you ready for your dream job,
                Explore our assessment today and get started.
              </p>
              <p>
                With our assesment tool, it get you ready for your dream job,
                Explore our assessment today and get started.
              </p>
              <p>
                With our assesment tool, it get you ready for your dream job,
                Explore our assessment today and get started.
              </p>
              <p>
                With our assesment tool, it get you ready for your dream job,
                Explore our assessment today and get started.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="features_container two">
        <div className="features_group">
          <div className="feature_illustration">
            <div className="illustration_right">
              <h4 className="illustration_title">
                Get a massive discount at a very reasonale price
              </h4>
              <p>
                With our assesment tool, it get you ready for your dream job,
                Explore our assessment today and get started.
              </p>
              <p>
                With our assesment tool, it get you ready for your dream job,
                Explore our assessment today and get started.
              </p>
              <p>
                With our assesment tool, it get you ready for your dream job,
                Explore our assessment today and get started.
              </p>
              <p>
                With our assesment tool, it get you ready for your dream job,
                Explore our assessment today and get started.
              </p>
            </div>
            <div className="illustration_left">
              <RetailImac />
            </div>
          </div>
        </div>
      </div>
      <div className="features_container">
        <div className="features_group">
          <div className="feature_illustration">
            <div className="illustration_left">
              <LastIconImac />
            </div>
            <div className="illustration_right">
              <h4 className="illustration_title">
                Get a massive discount at a very reasonale price
              </h4>
              <p>
                With our assesment tool, it get you ready for your dream job,
                Explore our assessment today and get started.
              </p>
              <p>
                With our assesment tool, it get you ready for your dream job,
                Explore our assessment today and get started.
              </p>
              <p>
                With our assesment tool, it get you ready for your dream job,
                Explore our assessment today and get started.
              </p>
              <p>
                With our assesment tool, it get you ready for your dream job,
                Explore our assessment today and get started.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="merchant_faq">
        <div className="merchant_faq_group">
          <h4 className="merchant_faq_title">Merchant/Dealer core functions</h4>
          <p className="merchant_faq_text">
            Lorem ipsum dolor sit amet, conusmod tempor incididunt ut labore et
            dolore Lorem ipsum dolor sit amet, consectetur adipiscing eli
          </p>
          <div className="merchant_accordion_container">
            <div className="merchant_accordion_group">
              <Button>Dealers FAQ’s</Button>
              <div className="accordion_view">
                <p className="accordion_view_title">Dealers FAQ’s</p>
                <div className="accordion">
                  <Accordion allowZeroExpanded={true}>
                    {AccordionInfo.map(data => {
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

export default Merchants

import React from "react"
import Layout from "../components/Layout/Layout"
import HederHero from "../components/HederHero"
import "../scss/index.scss"
import "../scss/MerchantHero.scss"
import HowtoSection from "../components/HowtoSection"
import { Howto, Accordion_Nfc } from "../components/Constants/Nfcpage"
import { Button, Icon } from "antd"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"
import "react-accessible-accordion/dist/fancy-example.css"

const {
  main_title,
  main_text,
  sub_text,
  titleOne,
  textOne,
  titleTwo,
  textTwo,
  titleThree,
  textThree,
} = Howto

const NFC = () => {
  return (
    <Layout>
      <HederHero
        title="NFC (Near field communication)"
        text="Recharge your phone anywhere and anytime using your ATM card. Load or send recharge pin with a single button."
      />
      <div className="HowTo_container">
        <div className="HowtoSection">
          <HowtoSection
            main_title={main_title}
            main_text={main_text}
            sub_text={sub_text}
            titleOne={titleOne}
            textOne={textOne}
            titleTwo={titleTwo}
            textTwo={textTwo}
            titleThree={titleThree}
            textThree={textThree}
          />
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
              <Button>FAQ’s on NFC</Button>
              <div className="accordion_view">
                <p className="accordion_view_title">
                  NFC (Near Field Communication)
                </p>
                <div className="accordion">
                  <Accordion allowZeroExpanded={true}>
                    {Accordion_Nfc.map(data => {
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

export default NFC

import React, { useState, useEffect } from "react"
import Layout from "../components/Layout/Layout"
import "../scss/Terms.scss"
import "../scss/Faq.scss"
import { Input, Anchor } from "antd"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion"
import "react-accessible-accordion/dist/fancy-example.css"
import "../scss/MerchantHero.scss"
import { Accordion_FAQ_general } from "../components/Constants/FaqPage"
// import { Link } from "gatsby"
const { Link } = Anchor

const FAQ = () => {
  const [focus, setFocus] = useState(undefined)
  useEffect(() => {
    setFocus(window.innerHeight / 4)
  }, [])
  return (
    <Layout>
      <div className="terms_header_container">
        <div className="terms_header_group">
          <h3>Frequently Asked Questions</h3>
          <Input className="faq_search" placeholder="Search for a question…" />
        </div>
      </div>
      <div className="faq_main_questions_container">
        <div className="faq_main_questions_group">
          <div className="faq_main_questions">
            <div className="faq_navlinks">
              <Anchor affix={false} targetOffset={focus}>
                <Link href="#general" title="General" />
                <Link href="#safety" title="Safety & Security" />
                <Link href="#account" title="Retopa’s Account" />
                <Link href="#topup" title="Topup and Bills" />
                <Link href="#charges" title="Retopa charges" />
                <Link href="#withdrwal" title="Withhdrawals" />
                <Link href="#referal" title="Referral program" />
                <Link href="#mobile" title="Mobile App" />
                <Link href="#workings" title="How does it work" />
                <Link href="#cashback" title="Cashback" />
                <Link href="#howWorks" title="How does it work" />
                <Link href="ContactUs" title="More questions ?" />
              </Anchor>
            </div>
            <div className="main_questions">
              <div className="accordion_view" id="general">
                <p className="accordion_view_title">WHAT IS RETOPA</p>
                <div className="accordion">
                  <Accordion allowZeroExpanded={true}>
                    {Accordion_FAQ_general.map(data => {
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
              <div className="accordion_view" id="safety">
                <p className="accordion_view_title" id="safety">
                  SAFETY & SECURITY
                </p>
                <div className="accordion">
                  <Accordion allowZeroExpanded={true}>
                    {Accordion_FAQ_general.map(data => {
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
              <div className="accordion_view">
                <p className="accordion_view_title">RETOPA WALLET</p>
                <div className="accordion">
                  <Accordion allowZeroExpanded={true}>
                    {Accordion_FAQ_general.map(data => {
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
              <div className="accordion_view" id="topup">
                <p className="accordion_view_title">TOPUP & PAY BILLS</p>
                <div className="accordion">
                  <Accordion allowZeroExpanded={true}>
                    {Accordion_FAQ_general.map(data => {
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
              <div className="accordion_view" id="mobile">
                <p className="accordion_view_title">MOBILE APP</p>
                <div className="accordion">
                  <Accordion allowZeroExpanded={true}>
                    {Accordion_FAQ_general.map(data => {
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

export default FAQ

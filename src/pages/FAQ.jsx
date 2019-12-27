import React, { useState } from "react"
import Layout from "../components/Layout/Layout"
import "../scss/Terms.scss"
import "../scss/Faq.scss"
import { Input } from "antd"
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
import { Link } from "gatsby"

const FAQ = () => {
  const [focus, setFocus] = useState(false)
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
              <Link to="FAQ" activeClassName="active">
                General
              </Link>
              <Link
                onFocus={() => {
                  setFocus(true)
                }}
                ClassName={focus ? "active" : ""}
                to="FAQ#safety"
              >
                Safety & Security
              </Link>
              <Link>Retopa’s Account</Link>
              <Link>Topup and Bills</Link>
              <Link>Retopa charges</Link>
              <Link>Withhdrawals</Link>
              <Link>Referral program</Link>
              <Link>Mobile App</Link>
              <Link>How does it work</Link>
              <Link>Cashback</Link>
              <Link to="ContactUs">More questions ?</Link>
            </div>
            <div className="main_questions">
              <div className="accordion_view">
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
              <div className="accordion_view">
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
              <div className="accordion_view">
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
              <div className="accordion_view">
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

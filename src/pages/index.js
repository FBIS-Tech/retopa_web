import React from "react"
import Layout from "../components/Layout/Layout"
import HederHero from "../components/HederHero"
import "../scss/index.scss"
import Net from "../../assets/Netapp.svg"
import Xamp from "../../assets/Xamp.svg"
import Mtn from "../../assets/mtn.svg"
import Glo from "../../assets/glo.svg"
import Watch from "../../assets/watch.svg"
import CardSections from "../components/CardSections"
import {
  FirstCardInfo,
  FirstCardSectionText,
  SecondCardSectionText,
  SecondCardInfo,
  IndexList,
  ThirdCardInfo,
  Logo,
  LogoOne,
} from "../components/Constants/indexPage"
import HowtoSection from "../components/HowtoSection"
import { Button } from "antd"
import IndexCarousel from "../components/Carousel/IndexCarousel"

export default function index() {
  return (
    <Layout>
      <HederHero />
      <div className="businesses_container">
        <div className="business_group">
          <div className="business_left">
            <h4>Trusted by over 1,000 businesses</h4>
            <div className="business_logo">
              {LogoOne.map(data => {
                return <img src={data} />
              })}
            </div>
          </div>
          <div className="business_right">
            <h4>Watch the experience of Retopa mobile app</h4>
            <div className="business_logo">
              <Watch />
            </div>
          </div>
        </div>
      </div>

      <div className="cardSection_container">
        <div className="CardSection">
          <CardSections
            title="What we do as a brand"
            text={FirstCardSectionText}
            CardInfo={FirstCardInfo}
          />
        </div>
      </div>
      <div className="HowTo_container">
        <div className="HowtoSection">
          <HowtoSection />
        </div>
      </div>
      <div className="cardSection_container_two">
        <div className="CardSection">
          <CardSections
            title="Wondering how it works"
            text={SecondCardSectionText}
            CardInfo={SecondCardInfo}
          />
        </div>
      </div>
      <div className="indexList">
        <div className="indexList_group">
          {IndexList.map(data => {
            return (
              <div key={data.svg}>
                <div className="img">{data.svg}</div>
                <h4>{data.text}</h4>
              </div>
            )
          })}
        </div>
        <div className="index_list_text">
          <h3>
            We offer a seamless experience by making every step as easy as
            possible,
          </h3>
          <h3>
            Once you log in, create an account, fund fund your wallet and start
            making transactions easily
          </h3>
        </div>
      </div>
      <div className="trusted_container">
        <div className="trusted_group">
          <h4 className="trusted_title">Trusted by over 1,000 businesses</h4>
          <p>
            Thousands of organization of all sizes trust Retopa in recharging
            and paying of bills of there business.
          </p>
          <div className="Trusted_cards">
            {ThirdCardInfo.map(data => {
              return (
                <div className="card_group" key={data.title}>
                  <div className="card_group_top">
                    <div className="Trust_img">{data.svg}</div>
                    <h4 className="trust_title">{data.title}</h4>
                    <h3>{data.text}</h3>
                  </div>
                  <Button>Get started </Button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="patners-container">
        <div className="partner_group">
          <div className="partner_title">Our partners</div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore
          </p>
          <div className="Patners_logo">
            {Logo.map(data => {
              return <img src={data} />
            })}
          </div>
          <div className="Patners_logo">
            {Logo.map(data => {
              return <img src={data} />
            })}
          </div>
        </div>
      </div>
      <div className="testimony_container">
        <div className="testimony_group">
          <div className="Testimony_title">
            <h4>What people are saying about us</h4>
            <p>
              Lorem ipsum dolor sit amet, conusmod tempor incididunt ut labore
              et dolore Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore{" "}
            </p>
          </div>
          <IndexCarousel />
        </div>
      </div>
    </Layout>
  )
}

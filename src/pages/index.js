import React, { useEffect } from "react"
import Layout from "../components/Layout/Layout"
import HederHero from "../components/HederHero"
import "../scss/index.scss"
import Watch from "../../assets/watch.svg"
import CardSections from "../components/CardSections"
import ScrollAnimation from "react-animate-on-scroll"
import "animate.css/animate.min.css"
import {
  FirstCardInfo,
  FirstCardSectionText,
  SecondCardSectionText,
  SecondCardInfo,
  IndexList,
  ThirdCardInfo,
  Logo,
  LogoOne,
  Howto,
} from "../components/Constants/indexPage"
import HowtoSection from "../components/HowtoSection"
import { Button } from "antd"
import IndexCarousel from "../components/Carousel/IndexCarousel"
import Privacy from "../../assets/privacy.svg"
import { Link } from "gatsby"

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
export default function index() {
  return (
    <Layout>
      <HederHero
        title="Fast Recharge"
        text=" Recharge your phone anywhere and anytime using your ATM card. Load
            or send recharge pin with a single button."
      />
      <div className="businesses_container">
        <div className="business_group">
          <div className="business_left">
            <h4>Trusted by over 1,000 businesses</h4>
            <div className="business_logo">
              {LogoOne.map(data => {
                return <img src={data} alt="logo" />
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
      <div className="cardSection_container_two">
        <div className="CardSection worksSection">
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
          <ScrollAnimation animateIn="zoomIn" className="Trusted_cards">
            {ThirdCardInfo.map(data => {
              return (
                <div className="card_group" key={data.title}>
                  <div className="card_group_top">
                    <div className="Trust_img">{data.svg}</div>
                    <h4 className="trust_title">{data.title}</h4>
                    <h3>{data.text}</h3>
                  </div>
                  <Button>
                    <Link to="Login">Get started</Link>
                  </Button>
                </div>
              )
            })}
          </ScrollAnimation>
        </div>
      </div>
      <div className="patners-container">
        <div className="partner_group">
          <div className="partner_title">Our partners</div>
          <p>
            We are constantly satisfied to take part in association with
            organizations that offer our vision to give quality Services
          </p>
          <div className="Patners_logo">
            {Logo.map(data => {
              return <img src={data} alt="logo" />
            })}
          </div>
          <div className="Patners_logo">
            {Logo.map(data => {
              return <img src={data} alt="logo" />
            })}
          </div>
        </div>
      </div>
      <div className="testimony_container">
        <div className="testimony_group">
          <div className="Testimony_title">
            <h4>What people are saying about us</h4>
            <p>
              We don't care to boast, yet we wouldn't fret when our customers
              do. Here are a portion of the tributes we have gotten in the wake
              of working with these brilliant people.
            </p>
          </div>
          <div className="IndexCarousel">
            <IndexCarousel />
          </div>
        </div>
      </div>
      <div className="Privacy_container">
        <div className="privacy_group">
          <Privacy />
          <div className="Privacy_text">
            <h3 className="title">Your Security is our Priority</h3>
            <h3 className="title_text">
              Retopa uses the highest levels of Internet Security, and it is
              secured by 256 bits SSL security encryption to ensure that your
              information is completely protected from fraud.
            </h3>
          </div>
        </div>
      </div>
    </Layout>
  )
}

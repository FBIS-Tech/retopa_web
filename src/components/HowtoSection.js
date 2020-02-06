import React, { useState, useEffect } from "react"
import "../scss/HowToSect.scss"
import Hand from "../images/Hand.png"
import Scroll from "../images/screencapture-localhost-8000-2020-01-06-11_54_43.png"
import { Button } from "antd"
import "../scss/HeaderHero.scss"
import Playstore from "../../assets/playStore.svg"
import AppStore from "../../assets/AppStore.svg"
import ScrollAnimation from "react-animate-on-scroll"
import "animate.css/animate.min.css"
const windowGlobal = typeof window !== "undefined" && window

export default function HowtoSection({
  main_title,
  main_text,
  sub_text,
  titleOne,
  textOne,
  titleTwo,
  textTwo,
  titleThree,
  textThree,
}) {
  const [top, setTop] = useState(0)
  const [position, setPosition] = useState("0")

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  }, [])

  const handleScroll = () => {
    let positiond = windowGlobal.pageYOffset
    if (positiond >= 1391.199951171875) {
      // setTop(windowGlobal.pageYOffset)
    } else if (windowGlobal.pageYOffset <= 1391.199951171875) {
      setTop(0)
    }
  }
  return (
    <div className="HowToSectionGroup">
      <div className="HowTo_sect_top">
        <h4>{main_title}</h4>
        <p>{main_text}</p>
      </div>
      <div className="how_to_position">
        <ScrollAnimation animateIn="fadeInLeft" className="HowTo_sect_left">
          <img
            className="handImage"
            src={Hand}
            style={{ margin: "0px" }}
            alt="hand"
          />
          <div className="scrollImage">
            <img
              src={Scroll}
              style={{
                margin: "0px",
                position: "relative",
                bottom: `${top}px`,
              }}
              alt="hand"
            />
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInRight" className="HowTo_sect_right">
          <h4
            className={
              titleOne === "Request" ? "steps_title_nfc" : "steps_title"
            }
          >
            {sub_text}
          </h4>
          <div className="steps">
            <div className="step">
              <h4 className="number">01</h4>
              <h4 className="title">{titleOne}</h4>
            </div>
            <div className="step2">
              <h4 className="divider"></h4>
              <h4 className="step_text">{textOne}</h4>
            </div>
            <div className="step">
              <h4 className="number">02</h4>
              <h4 className="title">{titleTwo}</h4>
            </div>
            <div className="step2">
              <h4 className="divider"></h4>
              <h4 className="step_text">{textTwo}</h4>
            </div>
            <div className="step">
              <h4 className="number">03</h4>
              <h4 className="title">{titleThree}</h4>
            </div>
            <div className="step2">
              {/* <h4 className="divider"></h4> */}
              <h4 className="step_text third">{textThree}</h4>
            </div>
          </div>
          {titleOne === "Request" ? (
            <div className="nfc_store">
              <div style={{ marginRight: "18px" }}>
                <Playstore />
              </div>
              <div>
                <AppStore />
              </div>
            </div>
          ) : (
            <Button>Get Started</Button>
          )}
        </ScrollAnimation>
      </div>
    </div>
  )
}

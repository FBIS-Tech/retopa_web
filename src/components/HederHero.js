import React from "react"
import "../scss/HeaderHero.scss"
import Playstore from "../../assets/playStore.svg"
import AppStore from "../../assets/AppStore.svg"
import Image from "../../assets/landingPageone.svg"
import Phone from "../images/iphone2.png"

const HederHero = ({ title, text, page }) => {
  return (
    <div className="hero">
      <div className="hero_container">
        <div className="hero_left">
          <h3
            className={title === "NFC (Near field communication)" ? "nfc" : ""}
          >
            {title}
          </h3>
          <p>{text}</p>
          <div className="stores">
            <div>
              <Playstore />
            </div>
            <div>
              <AppStore />
            </div>
          </div>
        </div>
        <div className="hero_right">
          {title !== "NFC (Near field communication)" ? (
            <Image />
          ) : (
            <img
              src={Phone}
              style={{
                position: "relative",
                top: "55px",
                // left: "-7%",
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default HederHero

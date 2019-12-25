import React from "react"
import "../scss/HeaderHero.scss"
import Playstore from "../../assets/playStore.svg"
import AppStore from "../../assets/AppStore.svg"
import Image from "../../assets/landingPageone.svg"

const HederHero = ({ title, text }) => {
  return (
    <div className="hero">
      <div className="hero_container">
        <div className="hero_left">
          <h3 className={title==="NFC (Near field communication)"? "nfc":""}>{title}</h3>
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
          <Image />
        </div>
      </div>
    </div>
  )
}

export default HederHero

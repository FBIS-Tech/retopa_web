import React from "react"
import Layout from "../components/Layout/Layout"
import "../scss/MerchantHero.scss"
import LadyHero from "../images/Untitled-1@3x 1.png"
import { Button } from "antd"

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
          <div className="hero_right">
            <img src={LadyHero} />
          </div>
        </div>
      </div>
      <div className="numbers">
        <div className="numbersGroup">
          <h3>Current numbers</h3>
        </div>
      </div>
    </Layout>
  )
}

export default Merchants

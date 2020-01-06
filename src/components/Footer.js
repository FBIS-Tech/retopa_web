import React from "react"
import Logo from "../../assets/logo.svg"
import "../scss/Footer.scss"
import Facebook from "../../assets/facebook.svg"
import Insta from "../../assets/insta.svg"
import Twit from "../../assets/twitter.svg"
import Linkd from "../../assets/linkdn.svg"
import Android from "../../assets/android.svg"
import Ios from "../../assets/ios.svg"
import { Link } from "gatsby"
export default function Footer() {
  return (
    <div className="footer_container">
      <div className="footer_group">
        <div className="footer_details one">
          <Logo />
          <h4 className="address">
            12, Landbrude Ave, Oniru, Victoria Island, Lagos, nigeria.
          </h4>
        </div>
        <div className="company">
          <h3 className="footer_title">Company</h3>
          <div>
            <h4>About Us</h4>
            <h4>Our Partners</h4>
            <h4>FAQ</h4>
          </div>
        </div>
        <div className="legal">
          <h3 className="footer_title">Legal</h3>
          <div>
            <h4>
              <Link style={{ color: "inherit" }} to="Terms&Conditions">
                Terms and Conditions
              </Link>
            </h4>

            <Link style={{ color: "inherit" }} to="Privacy">
              <h4>Privacy / Policy</h4>
            </Link>
          </div>
        </div>
        <div className="contact">
          <h3 className="footer_title">Contact</h3>
          <div>
            <h4>12, Landbrude Ave, Oniru, VI, Lagos</h4>
            <h4>info@retopa.com</h4>
            <h4>+234(0)80 65748392</h4>
          </div>
          <div className="logos">
            <Facebook />
            <Twit />
            <Insta />
            <Linkd />
          </div>
        </div>
        <div className="app">
          <h3 className="footer_title">App</h3>
          <div className="store1">
            <Android />
          </div>
          <div className="store">
            <Ios />
          </div>
        </div>
      </div>
    </div>
  )
}

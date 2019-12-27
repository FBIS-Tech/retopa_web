import React from "react"
import Layout from "../components/Layout/Layout"
import "../scss/Terms.scss"
import "../scss/ContactUs.scss"
import TermsForm from "../components/TermsForm"
import Contact from "../../assets/contactUs.svg"
const ContactUs = () => {
  return (
    <Layout>
      <div className="terms_header_container">
        <div className="terms_header_group">
          <h3>Contact Us</h3>
          <p>Ask us anything and w will guide you to your dream</p>
        </div>
      </div>
      <div className="contactus_container">
        <div className="contactus_group">
          <div className="contactUs_form">
            <TermsForm />
          </div>
          <div className="contact_us_details">
            <div className="contact_image">
              <Contact />
            </div>
            <div className="contact_information">
              <div className="contact_infos">
                <h4>ADDRESS</h4>
                <p>25B Admiralty way lekki- phase 1, Victoria Island</p>
              </div>
              <div className="contact_infos">
                <h4>PHONE</h4>
                <p>08056876754</p>
              </div>
              <div className="contact_infos">
                <h4>ONLINE SERVICE</h4>
                <p>info@retopa.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactUs

import React from "react"
import Layout from "../components/Layout/Layout"
import "../scss/Terms.scss"
import Logo from "../../assets/logo.svg"
import TermsForm from "../components/TermsForm"
import Call from "../../assets/call.svg"
import { Button } from "antd"
import { Link } from "gatsby"

const Terms_Conditions = () => {
  return (
    <Layout>
      <div className="terms_header_container">
        <div className="terms_header_group">
          <h3>Privacy Policy</h3>
        </div>
      </div>
      <div className="terms_details_container">
        <div className="terms_details_group">
          <div className="terms_logo">
            <Logo />
          </div>
          <div className="terms_main_title">
            <h4>
              These Privacy Policy outline the rukes and regulations for the use
              of retopa platform
            </h4>
          </div>
          <div className="terms_details">
            <div className="terms_detail_sects">
              <h3>Consectetur adipiscing elit, sed do eiusmod tempor </h3>
              <p className="para">
                onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna n ullamco laboris nisi u
              </p>
              <p>
                ed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque
                ipsciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipiscm.
              </p>
            </div>
            <div className="terms_detail_sects">
              <h3>Consectetur adipiscing elit, sed do eiusmod tempor </h3>
              <p className="para">
                onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna n ullamco laboris nisi u
              </p>
              <p>
                ed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque
                ipsciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipiscm.
              </p>
            </div>
            <div className="terms_detail_sects">
              <h3>Consectetur adipiscing elit, sed do eiusmod tempor </h3>
              <p className="para">
                onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna n ullamco laboris nisi u
              </p>
              <p>
                ed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque
                ipsciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipiscm.
              </p>
            </div>
            <div className="terms_detail_sects">
              <h3>Consectetur adipiscing elit, sed do eiusmod tempor </h3>
              <p className="para">
                onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna n ullamco laboris nisi u
              </p>
              <p>
                ed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque
                ipsciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipiscm.
              </p>
            </div>
            <div className="terms_detail_sects">
              <h3>Consectetur adipiscing elit, sed do eiusmod tempor </h3>
              <p className="para">
                onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna n ullamco laboris nisi u
              </p>
              <p>
                ed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque
                ipsciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipiscm.
              </p>
            </div>
            <div className="terms_detail_sects">
              <h3>Consectetur adipiscing elit, sed do eiusmod tempor </h3>
              <p className="para">
                onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna n ullamco laboris nisi u
              </p>
              <p>
                ed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque
                ipsciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipiscm.
              </p>
            </div>
            <div className="terms_detail_sects">
              <h3>Consectetur adipiscing elit, sed do eiusmod tempor </h3>
              <p className="para">
                onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna n ullamco laboris nisi u
              </p>
              <p>
                ed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque
                ipsciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipiscm.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="terms_contact_container">
        <div className="terms_contact_group">
          <h4 className="terms_contact_title">Have any questions for?</h4>
          <div className="terms_contact_form_container">
            <div className="terms_form">
              <TermsForm />
            </div>
            <div className="terms_contact">
              <div className="terms_contact_grouped">
                <div className="contact_info">
                  <Call />
                  <h4 className="contact_name">Retopa</h4>
                  <p>12, Landbrude Ave, Oniru, VI, Lagos</p>
                  <h4 className="contact_number">+23490675643</h4>
                  <p style={{ paddingBottom: "18px" }}>info@retopa.com</p>
                  <p>Intercom 24/7</p>
                </div>
              </div>
              <div className="faqCard">
                <div className="faqCard_group">
                  <h4>Help Center</h4>
                  <p>
                    If you prefer finding information on your own, please kindly
                    visit our FAQ
                  </p>
                  <Button>
                    <Link to="FAQ">FAQ</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Terms_Conditions

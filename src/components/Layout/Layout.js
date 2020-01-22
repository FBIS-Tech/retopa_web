import React from "react"
import PropTypes from "prop-types"
import Footer from "../Footer"
import "./Layout.scss"
import TopScreen from "./Top"
import Navbar from "../Navbar"
import Play from "../../../assets/playStoreW.svg"
import IOS from "../../../assets/AppStoreW.svg"
import Helmet from "react-helmet"
import Favicon from "../../images/favicon.ico"

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <link rel="icon" href={Favicon} />
      </Helmet>
      <div className="Layout_container">
        <TopScreen />
        <Navbar />
        <div>
          <main>{children}</main>
        </div>
      </div>
      <div className="application">
        <div className="app_group">
          <div className="app_info">
            <h3 className="get">Get the app</h3>
            <h3 className="get_text">Fast download</h3>
            <div className="get_store">
              <Play />
              <IOS />
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

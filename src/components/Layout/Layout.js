import React from "react"
import PropTypes from "prop-types"
import Footer from "../Footer"
import "./Layout.scss"
import TopScreen from "./Top"
import Navbar from "../Navbar"
const Layout = ({ children }) => {
  return (
    <>
      <div className="Layout_container">
        <TopScreen />
        <Navbar />
        <div>
          <main>{children}</main>
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

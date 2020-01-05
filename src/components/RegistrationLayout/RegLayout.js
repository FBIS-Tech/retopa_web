/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"

import "../../scss/RegLayout.scss"
import RegHeader from "./RegHeader"
import Footer from "../Footer"

const RegLayout = ({ children }) => {
  //   const data = useStaticQuery(graphql`
  //     query SiteTitleQuery {
  //       site {
  //         siteMetadata {
  //           title
  //         }
  //       }
  //     }
  //   `)

  return (
    <>
      <RegHeader />
      <div>
        <main style={{ paddingBottom: "44px" }}>{children}</main>
        {/* <footer>
          <Footer />
        </footer> */}
      </div>
    </>
  )
}

RegLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RegLayout

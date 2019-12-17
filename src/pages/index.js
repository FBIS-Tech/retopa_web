import React from "react"
import { Link } from "gatsby"
import { Button } from "antd"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <div>
      <Link to="Login">Login</Link>
    </div>
    <Link to="SignUp">SignUp</Link>
  </Layout>
)

export default IndexPage

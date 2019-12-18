// import React from "react"
// import { Link } from "gatsby"

// import Layout from "../components/Layout/Layout"
// import Image from "../components/image"

// const IndexPage = () => <Layout>uhuhu</Layout>

// export default IndexPage

import React from "react"
import Layout from "../components/Layout/Layout"
import HederHero from "../components/HederHero"

export default function index() {
  return (
    <Layout>
      <HederHero />
    </Layout>
  )
}

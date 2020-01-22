import React from "react"
import Logo from "../../../assets/logo.svg"
import "../../scss/RegHeader.scss"
import { Link } from "gatsby"

export default function RegHeader() {
  return (
    <div className="container">
      <Link to="/">
        <Logo />
      </Link>
    </div>
  )
}

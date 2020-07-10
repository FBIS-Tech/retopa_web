import React from "react"
import Logo from "../../../assets/RetailerCode.svg"
import "../../scss/RegHeader.scss"
import { Link } from "gatsby"

export default function RegHeaderTwo() {
  return (
    <div className="container">
      <Link to="/">
        <Logo />
      </Link>
    </div>
  )
}

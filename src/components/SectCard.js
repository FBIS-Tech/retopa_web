import React from "react"
import "../scss/SectCard.scss"
import Learn from "../../assets/learn.svg"
import { Link } from "gatsby"

export default function SectCard({ svg, title, text, Links }) {
  return (
    <div className="sect_card_container">
      <div className="sect_card_group">
        <div className="sect_card_image">{svg}</div>
        <h4 className="sect_card_title">{title}</h4>
        <h4 className="sect_card_text">{text}</h4>
        <Link to={Links} className="sect_card_learn">
          <Learn />
          <h4>Learn more</h4>
        </Link>
      </div>
    </div>
  )
}

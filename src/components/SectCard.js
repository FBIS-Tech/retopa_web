import React from "react"
import "../scss/SectCard.scss"
import Learn from "../../assets/learn.svg"
import Link from "gatsby-plugin-transition-link"
import AniLink from "gatsby-plugin-transition-link"

export default function SectCard({ svg, title, text, Links }) {
  return (
    <div className="sect_card_container">
      <div className="sect_card_group">
        <div className="sect_card_image">{svg}</div>
        <h4 className="sect_card_title">{title}</h4>
        <h4 className="sect_card_text">{text}</h4>
        <AniLink
          swipe
          top="exit"
          direction="down"
          duration={0.45}
          to={Links}
          className="sect_card_learn"
        >
          <Learn />
          <h4>Learn more</h4>
        </AniLink>
      </div>
    </div>
  )
}

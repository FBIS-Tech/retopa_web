import React, { Fragment } from "react"
import "../scss/CardSection.scss"
import SectCard from "./SectCard"
import ScrollAnimation from "react-animate-on-scroll"
import "animate.css/animate.min.css"

const CardSections = ({ title, text, CardInfo }) => {
  return (
    <>
      <div>
        <h3 className="section_title">{title}</h3>
        <h3 className="text">{text}</h3>
      </div>
      <ScrollAnimation animateIn="fadeIn" className="sectFlex">
        {CardInfo.map(data => {
          return (
            <Fragment key={data.svg}>
              <SectCard
                svg={data.svg}
                title={data.title}
                text={data.text}
                Links={data.Link}
              />
            </Fragment>
          )
        })}
      </ScrollAnimation>
    </>
  )
}

export default CardSections

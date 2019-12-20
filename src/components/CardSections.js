import React, { Fragment } from "react"
import "../scss/CardSection.scss"
import SectCard from "./SectCard"

const CardSections = ({ title, text, CardInfo }) => {
  return (
    <>
      <div>
        <h3 className="section_title">{title}</h3>
        <h3 className="text">{text}</h3>
      </div>
      <div className="sectFlex">
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
      </div>
    </>
  )
}

export default CardSections

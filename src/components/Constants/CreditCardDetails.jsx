import React from "react"
import "../../scss/Carddetails.scss"

const CardDetails = ({ number, title, image }) => {
  return (
    <div>
      <div className="creditContainer">
        <div className="creditGroup">
          <h4 style={{ marginBottom: "0px" }}>{number}</h4>
          <div className="carBottom">
            <h4 style={{ marginBottom: "0px" }}>{title}</h4>
            <img scr={image} style={{ marginBottom: "0px" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetails

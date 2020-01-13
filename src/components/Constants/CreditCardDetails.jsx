import React from "react"
import "../../scss/Carddetails.scss"
import Master from "../../../assets/master.svg"

const CardDetails = ({ number, title, image }) => {
  return (
    <div>
      <div className="creditContainer">
        <div className="creditGroup">
          <h4 style={{ marginBottom: "0px" }}>{number}</h4>
          <div className="cardBottom">
            <p style={{ marginBottom: "0px" }}>{title}</p>
            <div className="logoImage">
              {/* <img scr={Master} style={{ marginBottom: "0px" }} /> */}
              <Master />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetails

import React from "react"
import Down from "../../../assets/down.svg"
import Up from "../../../assets/up.svg"
import "../../scss/DashTable.scss"

const DashTable = ({ status, title, detail, amount }) => {
  return (
    <div className="DashContainer">
      <div className="leftHandSide">
        <div className="sideImages">
          {status === "successful" ? <Down /> : <Up />}
        </div>
        <div className="leftHandSideDetails">
          <h4>{title}</h4>
          <p>{detail}</p>
        </div>
      </div>
      <div className="rightHandSide">
        <h4>{amount}</h4>
        <p className={status === "successful" ? "success" : "fail"}>{status}</p>
      </div>
    </div>
  )
}

export default DashTable

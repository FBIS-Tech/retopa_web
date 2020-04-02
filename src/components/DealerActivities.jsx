import React from "react"
import Pen from "../../assets/pen.svg"
import "../scss/DealerTopCards.scss"

const DealerActivities = ({ title, price, viewClicked }) => {
  return (
    <>
      <div className="activities_dealer">
        <h4 className="activity_title">{title}</h4>
        <p className="activity_price">{price}</p>
        <div className="view_activity" onClick={viewClicked}>
          {/* <Pen />
          <p>View details</p> */}
        </div>
      </div>
    </>
  )
}

export default DealerActivities

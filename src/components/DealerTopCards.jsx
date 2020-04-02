import React from "react"
import "../scss/DealerTopCards.scss"
import Circle from "../images/dasg_circle.png"
import Voucher from "../../assets/dash-info-voucher.svg"
import Direct from "../../assets/dash-info-direct.svg"

const DealerTopCards = ({ number, description, voucher, direct }) => {
  return (
    <>
      <div className="dealer_card_container">
        <div className="dealer_card_group">
          <div className="dealerCardImage">
            {description === "Voucher Count" ? (
              <Voucher />
            ) : description === "Total Recharge Today" ? (
              <Direct />
            ) : (
              <div className="imgee">
                <img src={Circle} alt="circle" />
                <h4 className="circle_data">{number}</h4>
              </div>
            )}
          </div>
          <div className="dealer_card_details">
            <h4>
              {description === "Voucher Count"
                ? voucher
                : description === "Total Recharge Today"
                ? direct
                : number}
            </h4>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DealerTopCards

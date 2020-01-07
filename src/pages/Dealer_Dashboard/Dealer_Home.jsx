import React from "react"
import {
  topCardDetails,
  Dealer_Activities,
} from "../../components/Constants/DealerDashHome"
import DealerTopCards from "../../components/DealerTopCards"
import "../../scss/Dealer_home.scss"
import { Button } from "antd"
import DealerActivities from "../../components/DealerActivities"

const Dealer_Home = () => {
  return (
    <>
      <div className="dealer_home_container">
        <div className="dealer_home_group">
          <div className="dash_dealer_top">
            {topCardDetails.map(data => {
              return (
                <DealerTopCards number={data.number} description={data.desc} />
              )
            })}
          </div>
          <div className="activity_container">
            <div className="top_activity_container">
              <h4>Activities</h4>
              <Button>Add Retailer</Button>
            </div>
            <div className="all_activities_container">
              <div className="allActivityGroup">
                {Dealer_Activities.map(data => {
                  return (
                    <DealerActivities title={data.title} price={data.price} />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dealer_Home

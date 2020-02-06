import React, { useEffect, useState } from "react"
import {
  topCardDetails,
  Dealer_Activities,
} from "../../components/Constants/DealerDashHome"
import DealerTopCards from "../../components/DealerTopCards"
import "../../scss/Dealer_home.scss"
import { Button } from "antd"
import DealerActivities from "../../components/DealerActivities"
import Instance from "../../Api/Instance"
import { Base64 } from "js-base64"
import DealerLayout from "../../components/Layout/DealerLayout"

const SubDealer_Home = () => {
  const [retailer, setRetailer] = useState([])
  const [user, setUser] = useState({})
  const [counter, setCounter] = useState("0")

  useEffect(() => {
    //gets user details
    let onLogged = sessionStorage.getItem("persist:root")
      ? JSON.parse(sessionStorage.getItem("persist:root"))
      : []
    const { userData } = onLogged
    let allData = JSON.parse(userData)
    const { user_id } = allData

    // gets tokens
    let data = sessionStorage.getItem("topup")
      ? JSON.parse(sessionStorage.getItem("topup"))
      : []
    const username = Base64.decode(data.TOKEN_ONE)
    const password = Base64.decode(data.TOKEN_TWO)
    const req = {
      serviceCode: "DHL",
      username,
      password,
      user_id,
      rt_id: user_id,
      d_id: user_id,
    }

    // request for retailer list
    const request = new Promise(res => {
      res(Instance.post("", req))
    })
    request.then(({ data }) => {
      if (data.status === "200") {
        setRetailer(data.sub_dealers)
      }
    })

    // const reqs = { serviceCode: "SHP", username, password, user_id: "1" }
    // const profile = new Promise(res => {
    //   res(Instance.post("", reqs))
    // })
    // profile.then(({ data }) => {
    //   let user = data.user
    //   setUser(user)
    //   setCounter(user.counter)
    // })
  }, [])

  return (
    <>
      <div className="dealer_home_container">
        <div className="dealer_home_group">
          <div className="dash_dealer_top">
            {topCardDetails.map(data => {
              return (
                <DealerTopCards
                  number={
                    retailer.length <= 9
                      ? `0${retailer.length}`
                      : retailer.length
                  }
                  description={data.desc}
                  voucher={counter}
                />
              )
            })}
          </div>
          <div className="activity_container">
            <div className="top_activity_container">
              <h4>Activities</h4>
              {/* <Button>Add Retailer</Button> */}
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

export default SubDealer_Home

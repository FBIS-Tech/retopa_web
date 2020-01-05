import React, { useState } from "react"
import DashLayout from "../../components/Layout/DashLayout"
import User_Home from "./User_Home"
import "../../scss/User_dashboard.scss"
import displayHooks from "./hook/displayHooks"
import User_Airtime from "./User_Airtime"
import Dash_history from "./Dash_history"
import User_Payment from "./User_Payment"

const Dashboard = () => {
  const [
    title,
    home,
    airtime,
    history,
    payment,
    selectHome,
    selectAirtime,
    selectHistory,
    selectPayment,
  ] = displayHooks()
  return (
    <DashLayout
      title={title}
      handleHome={selectHome}
      handleAirtime={selectAirtime}
      handleHistory={selectHistory}
      handlePayment={selectPayment}
    >
      <div className={home ? "user_home" : "hide"}>
        <User_Home />
      </div>
      <div className={airtime ? "user_Airtime" : "hide"}>
        <User_Airtime />
      </div>
      <div className={history ? "user_bills" : "hide"}>
        <Dash_history />
      </div>
      <div className={payment ? "user_payment" : "hide"}>
        <User_Payment />
      </div>
    </DashLayout>
  )
}

export default Dashboard

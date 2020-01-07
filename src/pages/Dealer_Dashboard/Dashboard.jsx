import React from "react"
import DealerLayout from "../../components/Layout/DealerLayout"
import useDisplayHooks from "./hooks/useDisplayHooks"
import Dealer_Home from "./Dealer_Home"

const Dashboard = () => {
  const [
    title,
    home,
    airtime,
    history,
    payment,
    billing,
    selectHome,
    selectAirtime,
    selectHistory,
    selectPayment,
    selectBilling,
  ] = useDisplayHooks()
  return (
    <DealerLayout
      title={title}
      handleHome={selectHome}
      handleAirtime={selectAirtime}
      handleHistory={selectHistory}
      handlePayment={selectPayment}
      handleBilling={selectBilling}
    >
      <div
        style={{ padding: "20px" }}
        className={home ? "dealers_dashboard" : "hide"}
      >
        <Dealer_Home />
      </div>
    </DealerLayout>
  )
}

export default Dashboard

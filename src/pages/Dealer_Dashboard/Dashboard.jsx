import React from "react"
import DealerLayout from "../../components/Layout/DealerLayout"
import useDisplayHooks from "./hooks/useDisplayHooks"
import Dealer_Home from "./Dealer_Home"
import Retailer from "./Retailer"
import RetailerList from "./RetailerList"
import RetailerHistory from "./RetailerHistory"

const Dashboard = () => {
  const [
    title,
    home,
    retailer,
    history,
    payment,
    billing,
    selectHome,
    selectRetailer,
    selectHistory,
    selectPayment,
    selectBilling,
  ] = useDisplayHooks()
  return (
    <DealerLayout
      title={title}
      handleHome={selectHome}
      handleRetailer={selectRetailer}
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
      <div
        style={{ padding: "20px", backgroundColor: "#FBFBFA", border: "none" }}
        className={retailer ? "dealers_retail" : "hide"}
      >
        <RetailerList />
      </div>
      <div
        style={{ padding: "20px", backgroundColor: "#FBFBFA", border: "none" }}
        className={billing ? "dealers_retail" : "hide"}
      >
        <Retailer />
      </div>
      <div
        style={{ padding: "20px", backgroundColor: "#FBFBFA", border: "none" }}
        className={history ? "dealers_retail" : "hide"}
      >
        <RetailerHistory />
      </div>
    </DealerLayout>
  )
}

export default Dashboard

import React, { useState, useEffect } from "react"
import DealerLayout from "../../components/Layout/DealerLayout"
import useDisplayHooks from "./hooks/useDisplayHooks"
import Dealer_Home from "./Dealer_Home"
import { navigate } from "gatsby"
import Retailer from "./Wallet"
import RetailerList from "./RetailerList"
import RetailerHistory from "./RetailerHistory"
import Admin from "./Admin"
import Export from "./Export"
import Payment from "./Payment"
import Voucher from "./Voucher"
import Cryptr from "cryptr"

const Dashboard = () => {
  const [logged, setLogged] = useState(true)
  const cryptr = new Cryptr("retopaToken")
  useEffect(() => {
    let onLogged = sessionStorage.getItem("persist:root")
      ? JSON.parse(sessionStorage.getItem("persist:root"))
      : []
    let status = onLogged.isLogged

    if (status === "false") {
      navigate("/Login")
      setLogged(false)
      return false
    }
  }, [])

  const [
    title,
    home,
    retailer,
    history,
    payment,
    billing,
    admin,
    exxport,
    voucher,
    selectHome,
    selectRetailer,
    selectHistory,
    selectPayment,
    selectBilling,
    selectAdmin,
    selectExport,
    selectVoucher,
  ] = useDisplayHooks()
  return (
    <div className={!logged ? "hide" : ""}>
      <DealerLayout
        title={title}
        handleHome={selectHome}
        handleRetailer={selectRetailer}
        handleHistory={selectHistory}
        handlePayment={selectPayment}
        handleBilling={selectBilling}
        handleAdmin={selectAdmin}
        handleExport={selectExport}
        handleVoucher={selectVoucher}
      >
        <div
          style={{ padding: "20px", minWidth: "320px" }}
          className={home ? "dealers_dashboard" : "hide"}
        >
          <Dealer_Home />
        </div>
        <div
          style={{
            padding: "20px",
            minWidth: "320px",
            backgroundColor: "#FBFBFA",
          }}
          className={admin ? "dealers_dashboard" : "hide"}
        >
          <Admin />
        </div>
        <div
          style={{
            padding: "20px",
            minWidth: "320px",
            backgroundColor: "#FBFBFA",
            border: "none",
          }}
          className={retailer ? "dealers_retail" : "hide"}
        >
          <RetailerList />
        </div>
        <div
          style={{
            padding: "20px",
            minWidth: "320px",
            backgroundColor: "#FBFBFA",
            border: "none",
          }}
          className={billing ? "dealers_retail" : "hide"}
        >
          <Retailer />
        </div>
        <div
          style={{
            padding: "20px",
            minWidth: "320px",
            backgroundColor: "#FBFBFA",
            border: "none",
          }}
          className={history ? "dealers_retail" : "hide"}
        >
          <RetailerHistory />
        </div>
        <div
          style={{
            padding: "20px",
            minWidth: "320px",
            backgroundColor: "#FBFBFA",
            border: "none",
          }}
          className={exxport ? "dealers_retail" : "hide"}
        >
          <Export />
        </div>
        <div
          style={{
            padding: "20px",
            minWidth: "320px",
            backgroundColor: "#FBFBFA",
            border: "none",
          }}
          className={payment ? "dealers_retail" : "hide"}
        >
          <Payment />
        </div>
        <div
          style={{
            padding: "20px",
            minWidth: "320px",
            backgroundColor: "#FBFBFA",
            border: "none",
          }}
          className={voucher ? "dealers_retail" : "hide"}
        >
          <Voucher />
        </div>
      </DealerLayout>
    </div>
  )
}

export default Dashboard

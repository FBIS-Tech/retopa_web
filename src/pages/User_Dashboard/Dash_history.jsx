import React from "react"
import History from "../../../assets/history.svg"
const Dash_history = () => {
  return (
    <>
      <div
        className="history"
        style={{
          height: "79.1vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <History />
        <p
          style={{
            fontWeight: "500",
            fontSize: "18px",
            lineHeight: "22px",
            color: "#878E85",
            marginTop: "24.22px",
          }}
        >
          Looks lonely here, Start transacting
        </p>
      </div>
    </>
  )
}

export default Dash_history

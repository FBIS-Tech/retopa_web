import { useState } from "react"

export default () => {
  const [title, setTitle] = useState("Home")
  const [home, setHome] = useState(true)
  const [airtime, setAirtime] = useState(false)
  const [history, setHistory] = useState(false)
  const [payment, setPayment] = useState(false)
  const [billing, setBilling] = useState(false)

  const selectHome = () => {
    setTitle("Home")
    setHome(true)
    setAirtime(false)
    setHistory(false)
    setPayment(false)
    setBilling(false)
  }
  const selectAirtime = () => {
    setTitle("Airtime & Data")
    setHome(false)
    setAirtime(true)
    setHistory(false)
    setPayment(false)
    setBilling(false)
  }
  const selectHistory = () => {
    setTitle("History")
    setHome(false)
    setAirtime(false)
    setHistory(true)
    setPayment(false)
    setBilling(false)
  }
  const selectPayment = () => {
    setTitle("Add Card")
    setHome(false)
    setAirtime(false)
    setHistory(false)
    setPayment(true)
    setBilling(false)
  }
  const selectBilling = () => {
    setTitle("Bills Payment")
    setHome(false)
    setAirtime(false)
    setHistory(false)
    setPayment(false)
    setBilling(true)
  }

  return [
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
  ]
}

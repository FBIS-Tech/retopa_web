import { useState } from "react"

export default () => {
  const [title, setTitle] = useState("Home")
  const [home, setHome] = useState(true)
  const [airtime, setAirtime] = useState(false)
  const [history, setHistory] = useState(false)
  const [payment, setPayment] = useState(false)

  const selectHome = () => {
    setTitle("Home")
    setHome(true)
    setAirtime(false)
    setHistory(false)
    setPayment(false)
  }
  const selectAirtime = () => {
    setTitle("Airtime & Data")
    setHome(false)
    setAirtime(true)
    setHistory(false)
    setPayment(false)
  }
  const selectHistory = () => {
    setTitle("History")
    setHome(false)
    setAirtime(false)
    setHistory(true)
    setPayment(false)
  }
  const selectPayment = () => {
    setTitle("Add Card")
    setHome(false)
    setAirtime(false)
    setHistory(false)
    setPayment(true)
  }

  return [
    title,
    home,
    airtime,
    history,
    payment,
    selectHome,
    selectAirtime,
    selectHistory,
    selectPayment,
  ]
}

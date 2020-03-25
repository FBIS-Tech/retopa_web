import React, { useState, useEffect, Suspense } from "react"
import DealerLayout from "../../components/Layout/DealerLayout"
import { navigate } from "gatsby"
import { Icon } from "antd"
import { HomeIcon } from "../../components/CustomIcons"
import AdminLayout from "../../components/Layout/AdminLayout"
import Transactions from "./Transactions"
const Dash_home_icon = props => <Icon component={HomeIcon} {...props} />
const Home = React.lazy(() => import("./Home"))

const Dashboard = () => {
  const [logged, setLogged] = useState(true)
  const [admintype, setAdminType] = useState("")
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
    // get usaer type

    let UserData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : []

    setAdminType(UserData.admintype)
  }, [])
  const title = (
    <h4>
      <Dash_home_icon style={{ marginRight: "10px" }} />
      Home
    </h4>
  )
  return (
    <div className={!logged ? "hide" : ""}>
      <AdminLayout title={title} position={["1"]}>
        <Suspense fallback={<h1>Loading...</h1>}>
          {admintype === "adminB" ? <Transactions /> : <Home />}
        </Suspense>
      </AdminLayout>
    </div>
  )
}

export default Dashboard

import React, { useState, useEffect, Suspense } from "react"
import DealerLayout from "../../components/Layout/DealerLayout"
import { navigate } from "gatsby"
import { Icon } from "antd"
import { HomeIcon } from "../../components/CustomIcons"
const Dash_home_icon = props => <Icon component={HomeIcon} {...props} />
const Dealer_Home = React.lazy(() => import("./Dealer_Home"))

const Dashboard = () => {
  const [logged, setLogged] = useState(true)
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
  const title = (
    <h4>
      <Dash_home_icon style={{ marginRight: "10px" }} />
      Home
    </h4>
  )
  return (
    <div className={!logged ? "hide" : ""}>
      <DealerLayout title={title} position={["1"]}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Dealer_Home />
        </Suspense>
      </DealerLayout>
    </div>
  )
}

export default Dashboard

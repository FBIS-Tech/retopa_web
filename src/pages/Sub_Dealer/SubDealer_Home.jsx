import React, { useEffect, useState } from "react"
import {
  topCardDetails,
  Dealer_Activities,
} from "../../components/Constants/DealerDashHome"
import { Table } from "antd"
import DealerTopCards from "../../components/DealerTopCards"
import "../../scss/Dealer_home.scss"
import { Spin } from "antd"
import DealerActivities from "../../components/DealerActivities"
import Instance from "../../Api/Instance"
import { Base64 } from "js-base64"
import DealerLayout from "../../components/Layout/DealerLayout"
import DealerLoginInstance from "../../Api/DealerLoginInstance"

const SubDealer_Home = () => {
  const [retailer, setRetailer] = useState([])
  const [walletData, setWalletData] = useState([])
  const [spinning, setSpinning] = useState(true)
  const [counter, setCounter] = useState("0")

  useEffect(() => {
    //gets user details
    let onLogged = sessionStorage.getItem("persist:root")
      ? JSON.parse(sessionStorage.getItem("persist:root"))
      : []
    const { userData } = onLogged
    let allData = JSON.parse(userData)
    const { user_id } = allData
    const { tp_id } = allData

    // gets tokens
    let data = sessionStorage.getItem("topup3")
      ? JSON.parse(sessionStorage.getItem("topup3"))
      : []
    const username = Base64.decode(data.TOKEN_ONE_DEALER)
    const password = Base64.decode(data.TOKEN_TWO_DEALER)

    setTimeout(() => {
      setSpinning(false)
    }, 6000)

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
    // ////balance//////////////////////
    const reqs = {
      username,
      password,
      serviceCode: "DDB",
      id: user_id,
    }
    const profile = new Promise(res => {
      res(DealerLoginInstance.post("", reqs))
    })
    profile.then(({ data }) => {
      setSpinning(false)
      setWalletData(data.wallets)
    })
  }, [])

  /////////////////////wallet column/////////////////////////
  const WalletColums = [
    {
      title: "VTU Name",
      dataIndex: "vtu_name",
      key: "vtu_name",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (text, record) => (
        <div>{`₦ ${parseInt(record.balance).toLocaleString()}`}</div>
      ),
    },
  ]

  return (
    <>
      <div className="dealer_home_container">
        <div className="dealer_home_group">
          {/* <div className="dash_dealer_top">
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
          </div> */}
          <div className="activity_container">
            <div className="top_activity_container">
              <h4>Activities</h4>
              {/* <Button>Add Retailer</Button> */}
            </div>
            <div className="table" style={{ margin: "3%" }}>
              <Spin spinning={spinning} size="large" delay={0}>
                <Table
                  title={() => (
                    <div
                      style={{
                        color: "green",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      Wallet Balance
                    </div>
                  )}
                  columns={WalletColums}
                  dataSource={walletData}
                  bordered
                  size="small"
                />
              </Spin>
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

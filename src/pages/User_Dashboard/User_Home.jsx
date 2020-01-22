import React from "react"
import "../../scss/User_dashboard.scss"
import { Divider } from "antd"
import Mtn from "../../images/dash_mtn.png"
import Glo from "../../images/dash_glo.png"
import Eti from "../../images/dash_eti.png"
import Airtel from "../../images/dash_airtel.png"
import { Link } from "gatsby"
import Refresh from "../../../assets/refresh.svg"
import DashTable from "../../components/Constants/DashTable"
import { DashContent } from "../../components/Constants/DashContent"

export default function User_Home() {
  return (
    <>
      <div className="user_dash_container">
        <div className="user_dash_group">
          <div className="user_group_left">
            <div className="user_account_balance">
              <div className="user_account_balance_left">
                <label>Current Account</label>
                <h4 className="value">
                  0.<span>00</span>
                </h4>
              </div>
              <Divider type="vertical" />
              <div className="user_account_balance_right">
                <label>Reward Earned</label>
                <h4 className="value">
                  0.<span>00</span>
                </h4>
              </div>
            </div>
            <div className="user_account_airtime">
              <div className="user_account_airtime_container">
                <div className="user_account_airtime_group">
                  <h4 className="airtime_title">Buy Quick Airtime</h4>
                  <div className="airtime_Brands">
                    <div id="mtn">
                      <img src={Mtn} alt="mtn" />
                    </div>
                    <div id="glo">
                      <img src={Glo} alt="glo" />
                    </div>
                    <div id="Etisalat">
                      <img src={Eti} alt="etisalat" />
                    </div>
                    <div id="Airtel">
                      <img src={Airtel} alt="airtel" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="account_referral_container">
              <div className="account_referral_group">
                <h4 className="referral_title">Referral code</h4>
                <h5 className="code">KEHINNY6</h5>
                <p>
                  <Link>https://www.rget.retopa.com/r/kehinNY6</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="user_group_right" id="style-1">
            <div className="user_group_right_head">
              <h4>Recent Transactions</h4>
              <Refresh />
            </div>
            {DashContent.map(data => {
              return (
                <DashTable
                  title={data.title}
                  detail={data.detail}
                  status={data.status}
                  amount={data.amount}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

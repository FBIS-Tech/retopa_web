import React from "react"
import "../../scss/user_billins.scss"
import { Input, Icon } from "antd"
import { Billing_List } from "../../components/Constants/BillsDashbord"

const { Search } = Input
const User_billing = () => {
  return (
    <>
      <div className="billings_container">
        <div className="billings_left">
          <div className="billings_search">
            <Search
              prefix={
                <Icon
                  type="search"
                  style={{ color: "#9B9B9B", marginRight: "18px" }}
                />
              }
              placeholder="Find a biller e.g DSTV"
              //   onSearch={value => console.log(value)}
            />
          </div>
          <div className="bill_list_container">
            <div className="bills_list_group">
              {Billing_List.map(data => {
                return (
                  <div className="billGroupContainer">
                    <div className="bill_image">
                      <img src={data.image} alt="logos" />
                    </div>
                    <div className="bill_text">
                      <h4>{data.title}</h4>
                      <p>{data.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="billings_right"></div>
      </div>
    </>
  )
}

export default User_billing

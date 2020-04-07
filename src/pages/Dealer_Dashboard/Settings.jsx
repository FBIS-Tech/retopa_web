import React, { useState, useEffect } from "react"
import "../../scss/Retailer.scss"
import "../../scss/Admin.scss"
import {
  Table,
  Icon,
  Input,
  Select,
  Pagination,
  Button,
  Tabs,
  Popover,
  Form,
} from "antd"
import { navigate } from "gatsby"
import { HomeIcon } from "../../components/CustomIcons"
import Green from "../../../assets/green.svg"
import Red from "../../../assets/red.svg"
import { AdminMember } from "../../components/Constants/AdminPage"
import DealerLayout from "../../components/Layout/DealerLayout"
import SubDealerLayout from "../../components/Layout/SubDealerLayout"

import { Base64 } from "js-base64"
import Instance from "../../Api/Instance"
const { TabPane } = Tabs
const Dash_admin_icon = props => <Icon component={HomeIcon} {...props} />

const Settings = () => {
  const [openForm, setOpenForm] = useState(false)
  const [messageAct, setMessageAct] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState([])
  const [inputChange, setInput] = useState({ serviceCode: "CHP" })

  useEffect(() => {
    //gets user details
    let onLogged = sessionStorage.getItem("persist:root")
      ? JSON.parse(sessionStorage.getItem("persist:root"))
      : []
    const { userData } = onLogged
    let allData = JSON.parse(userData)
    const { user_id } = allData

    // gets tokens
    let data = sessionStorage.getItem("topup")
      ? JSON.parse(sessionStorage.getItem("topup"))
      : []
    const username = Base64.decode(data.TOKEN_ONE)
    const password = Base64.decode(data.TOKEN_TWO)

    setInput({
      ...inputChange,
      username,
      password,
      user_id,
    })
  }, [])

  const passwordInput = e => {
    setInput({ ...inputChange, [e.target.name]: e.target.value })
  }

  const submitPassword = () => {
    setLoading(true)
    const submitRequest = new Promise(res => {
      res(Instance.post("", inputChange))
    })
    if (inputChange.confirmed === inputChange.new_password) {
      submitRequest.then(({ data }) => {
        let fields = data.required_fields
        let m = data.message
        ////console.log(submitRequest)
        if (data.status === "301") {
          setLoading(false)
          setError(fields)
          setTimeout(() => {
            setError([])
          }, 3000)
        } else if (data.status === "200") {
          setLoading(false)
          setMessageAct(m)
          setTimeout(() => {
            setMessage("")
            localStorage.clear()
            sessionStorage.clear()
            navigate("/Login")
          }, 3000)
        } else if (data.status === "300") {
          setLoading(false)
          setMessageAct(m)
          setTimeout(() => {
            setMessageAct("")
          }, 3000)
        }
      })
    } else {
      setMessageAct("Please check that you typed in the correct password")
      setLoading(false)
    }
  }

  const title = (
    <h4>
      <Dash_admin_icon style={{ marginRight: "10px" }} />
      Dashboard
    </h4>
  )
  return (
    <DealerLayout title={title} position={["8"]}>
      <div
        className={AdminMember.length <= 9 ? "tableheight" : "adminContainer"}
      >
        <div className="adminGroup">
          <div className="admin">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Password" key="1">
                <div className="formContainer">
                  <div className="formTitle">
                    <p>Change Password</p>
                  </div>
                  <div className="formGroup">
                    <div className="adminForm">
                      {error.map(data => (
                        <div key={data} className="errors">
                          {data}
                        </div>
                      ))}
                      <div
                        className={
                          messageAct ===
                          "Please check that you typed in the correct password"
                            ? "errors"
                            : "msg"
                        }
                      >
                        {messageAct}
                      </div>
                      <div className="formInput changeToken">
                        <label htmlFor="name">Old Password</label>
                        <Input
                          placeholder="Enter new password here..."
                          className="inputBack"
                          name="old_password"
                          onChange={passwordInput}
                        />
                      </div>
                      <div className="formInput changeToken">
                        <label htmlFor="name">New Password</label>
                        <Input
                          placeholder="Enter new password here..."
                          className="inputBack"
                          name="new_password"
                          onChange={passwordInput}
                        />
                      </div>
                      <div className="formInput changeToken">
                        <label htmlFor="name">Confirm Password</label>
                        <Input
                          placeholder="Confirm password "
                          className="inputBack"
                          name="confirmed"
                          onChange={passwordInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="adminFormBtn">
                    <div className="btngroup">
                      <Button loading={loading} onClick={submitPassword}>
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </DealerLayout>
  )
}

export default Settings

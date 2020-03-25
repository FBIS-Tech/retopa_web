import React, { useState } from "react"
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
import { HomeIcon } from "../../components/CustomIcons"
import Green from "../../../assets/green.svg"
import Red from "../../../assets/red.svg"
import { AdminMember } from "../../components/Constants/AdminPage"
import DealerLayout from "../../components/Layout/DealerLayout"
import AdminLayout from "../../components/Layout/AdminLayout"
const { TabPane } = Tabs
const Dash_admin_icon = props => <Icon component={HomeIcon} {...props} />

const Settings = () => {
  const [openForm, setOpenForm] = useState(false)
  const [input, setInput] = useState({})
  const AdminColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: text =>
        text === "enable" ? (
          <p className="enabled">
            <Green className="dotPosition" />
            {text}
          </p>
        ) : (
          <p className="disabled">
            <Red className="dotPosition" />
            {text}
          </p>
        ),
    },
    {
      title: "Created at",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popover
          content={
            <div className="pop_content">
              <p>Send Token</p>
              <p>Edit</p>
            </div>
          }
          placement="bottom"
          trigger="click"
        >
          <span className="popover">...</span>
        </Popover>
      ),
    },
  ]

  //   handle admin add form
  const handleForm = () => {
    setOpenForm(true)
  }
  //   close admin add form on tabchange
  const handleDefault = () => {
    setOpenForm(false)
  }

  const getInput = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  console.log(input)
  const handlePassword = () => {
    const QueryPassword = {
      serviceCode: "PWD",
      username: "Retopa",
      password: "123456",
      old_password: input.old_password,
      new_password: input.new_password,
    }
  }

  const title = (
    <h4>
      <Dash_admin_icon style={{ marginRight: "10px" }} />
      Dashboard
    </h4>
  )
  return (
    <AdminLayout title={title} position={["8"]}>
      <div
        className={AdminMember.length <= 9 ? "tableheight" : "adminContainer"}
      >
        <div className="adminGroup">
          <div className="admin">
            <Tabs defaultActiveKey="1" onChange={handleDefault}>
              <TabPane tab="Password" key="1">
                <div className="formContainer">
                  <div className="formTitle">
                    <p>Change Password</p>
                  </div>
                  <div className="formGroup">
                    <div className="adminForm">
                      <div className="formInput changeToken">
                        <label htmlFor="old_password">Old Password</label>
                        <Input
                          name="old_password"
                          placeholder="Enter new password here..."
                          className="inputBack"
                          onChange={getInput}
                        />
                      </div>
                      <div className="formInput changeToken">
                        <label htmlFor="new_password">New Password</label>
                        <Input
                          placeholder="Confirm password "
                          className="inputBack"
                          name="new_password"
                          onChange={getInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="adminFormBtn">
                    <div className="btngroup">
                      <Button onClick={handlePassword}>Submit</Button>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Change Token" key="2">
                <div className="formContainer">
                  <div className="formTitle">
                    <p>Change Pin</p>
                  </div>
                  <div className="formGroup">
                    <div className="adminForm">
                      <div className="formInput changeToken">
                        <label htmlFor="name">New Token</label>
                        <Input
                          placeholder="Enter name here..."
                          className="inputBack"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="adminFormBtn">
                    <div className="btngroup">
                      <Button>Submit</Button>
                    </div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Settings

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
import { AdminIcon } from "../../components/CustomIcons"
import Green from "../../../assets/green.svg"
import Red from "../../../assets/red.svg"
import { AdminMember } from "../../components/Constants/AdminPage"
import DealerLayout from "../../components/Layout/DealerLayout"
const { TabPane } = Tabs
const Dash_admin_icon = props => <Icon component={AdminIcon} {...props} />

const Admin = () => {
  const [openForm, setOpenForm] = useState(false)
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

  const title = (
    <h4>
      <Dash_admin_icon style={{ marginRight: "10px" }} />
      Admin
    </h4>
  )
  return (
    <DealerLayout title={title} position={["8"]}>
      <div
        className={AdminMember.length <= 9 ? "tableheight" : "adminContainer"}
      >
        <div className="adminGroup">
          <div className="admin">
            <Tabs defaultActiveKey="1" onChange={handleDefault}>
              <TabPane tab="View Admin" key="1">
                <div className={openForm ? "hide" : "table_Group"}>
                  <div className="table_header">
                    <div className="rowShow">
                      <Button onClick={handleForm}>Add Admin</Button>
                    </div>
                    <div className="searchTable">
                      <Input
                        placeholder="Search Admin…"
                        prefix={
                          <Icon type="search" style={{ color: "#D8D8D8" }} />
                        }
                      />
                    </div>
                  </div>
                  <Table
                    columns={AdminColumn}
                    dataSource={AdminMember}
                    bordered
                    size="small"
                  />
                  {/* <Pagination
            total={TableOne.length}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            pageSize={10}
            defaultCurrent={1}
          /> */}
                </div>
                <div className={openForm ? "formContainer" : "hide"}>
                  <div className="formTitle">
                    <p>Add Admin</p>
                    <p
                      className="cancle"
                      onClick={() => {
                        setOpenForm(false)
                      }}
                    >
                      X
                    </p>
                  </div>
                  <div className="formGroup">
                    <div className="adminForm">
                      <div className="formInput">
                        <label htmlFor="name">Name</label>
                        <Input
                          placeholder="Enter name here..."
                          className="inputBack"
                        />
                      </div>

                      <div className="formInput">
                        <label htmlFor="name">Email</label>
                        <Input placeholder="Enter email here..." />
                      </div>
                      <div className="formInput">
                        <label htmlFor="name">PassWord</label>
                        <Input placeholder="****" className="inputBack" />
                      </div>
                      <div className="formInput">
                        <label htmlFor="name">Confirm Password</label>
                        <Input placeholder="Confirm Password..." />
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
              <TabPane tab="Change Token" key="2">
                <div className="formContainer">
                  <div className="formTitle">
                    <p>Change Token</p>
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
    </DealerLayout>
  )
}

export default Admin

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
import { AdminIcon } from "../../components/CustomIcons"
import Instance from "../../Api/Instance"
import { Base64 } from "js-base64"
import Green from "../../../assets/green.svg"
import Red from "../../../assets/red.svg"
import { AdminMember } from "../../components/Constants/AdminPage"
import DealerLayout from "../../components/Layout/DealerLayout"
import axios from "axios"
import AdminInstance from "../../Api/AdminInstance"
const { TabPane } = Tabs
const Dash_admin_icon = props => <Icon component={AdminIcon} {...props} />

const Admin = () => {
  const [openForm, setOpenForm] = useState(false)
  const [filterText, setFilterText] = useState("")
  const [tps, setTps] = useState([])
  useEffect(() => {
    //gets user details
    let onLogged = sessionStorage.getItem("persist:root")
      ? JSON.parse(sessionStorage.getItem("persist:root"))
      : []
    const { userData } = onLogged
    let allData = JSON.parse(userData)
    const { user_id } = allData

    // gets tokens
    let data = sessionStorage.getItem("topup2")
      ? JSON.parse(sessionStorage.getItem("topup2"))
      : []
    const username = Base64.decode(data.TOKEN_ONE_ADMIN)
    const password = Base64.decode(data.TOKEN_TWO_ADMIN)
    const req = { serviceCode: "RTL", username, password, user_id }

    // trade partners....
    const tpReqst = {
      serviceCode: "TRAL",
      username,
      password,
    }
    const tp = new Promise(res => {
      res(AdminInstance.post("", tpReqst))
    })
    tp.then(({ data }) => {
      let Arry = data.tp_details
      setTps(Arry)
    })
  }, [])

  const AdminColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendor_name",
      key: "vendor_name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: text =>
    //     text === "enable" ? (
    //       <p className="enabled">
    //         <Green className="dotPosition" />
    //         {text}
    //       </p>
    //     ) : (
    //       <p className="disabled">
    //         <Red className="dotPosition" />
    //         {text}
    //       </p>
    //     ),
    // },
    {
      title: "Date Created/Time",
      dataIndex: "created_at",
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
      Trade Partners
    </h4>
  )

  const filteredItems = tps.filter(
    item =>
      item.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
      item.email.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
      item.phone_number
        .toLocaleLowerCase()
        .includes(filterText.toLocaleLowerCase())
  )

  return (
    <DealerLayout title={title} position={["8"]}>
      <div
        className={AdminMember.length <= 9 ? "tableheight" : "adminContainer"}
      >
        <div className="adminGroup">
          <div className="admin">
            <Tabs defaultActiveKey="1" onChange={handleDefault}>
              <TabPane tab="Partners" key="1">
                <div className={openForm ? "hide" : "table_Group"}>
                  <div className="table_header">
                    <div className="rowShow">
                      {/* <Button onClick={handleForm}>Add Admin</Button> */}
                    </div>
                    <div className="searchTable">
                      <Input
                        placeholder="Search Retailer…"
                        value={filterText}
                        onChange={e => {
                          setFilterText(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <Table
                    columns={AdminColumn}
                    dataSource={filteredItems}
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
              {/* <TabPane tab="Change Token" key="2">
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
              </TabPane> */}
            </Tabs>
          </div>
        </div>
      </div>
    </DealerLayout>
  )
}

export default Admin

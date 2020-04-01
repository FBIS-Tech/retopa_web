import React, { useState, useEffect } from "react"
import "../../scss/Retailer.scss"
import "../../scss/Admin.scss"
import "../../scss/Export.scss"
import { Input, Button, Tabs, Popover, Icon, Table, Form } from "antd"
import DealerLayout from "../../components/Layout/DealerLayout"
import { VoucherIcon } from "../../components/CustomIcons"
import { Base64 } from "js-base64"
import Instance from "../../Api/Instance"
const { TabPane } = Tabs
const Dash_voucher_icon = props => <Icon component={VoucherIcon} {...props} />

const Voucher = () => {
  const [input, setInput] = useState({})
  const [msg, setMsg] = useState("")
  const [error, setError] = useState([])
  const [vtu, setVtu] = useState([])
  const [loading, setLoading] = useState(false)
  const [filtered, setFiltered] = useState("")
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [openToken, setOpenToken] = useState(false)
  const [fund, setFund] = useState({
    serviceCode: "FDM",
  })

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
      ...input,
      username,
      password,
      serviceCode: "ADDVTU",
    })
    setFund({ ...fund, username, password, user_id }) //initial state for sending funds
    const req = {
      username,
      password,
      serviceCode: "VTULS",
    }

    // request for Vtu list
    const request = new Promise(res => {
      res(Instance.post("", req))
    })
    request.then(({ data }) => {
      if (data.status === "200") {
        setVtu(data.vtus)
      }
    })
  }, [])

  const handleInput = e => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  // add vtu
  const submitVtu = () => {
    setLoading(true)
    // request for Vtu list
    const request = new Promise(res => {
      res(Instance.post("", input))
    })
    request.then(({ data }) => {
      let m = data.message
      let e = data.required_fields
      if (data.status === "200") {
        setLoading(false)
        setMsg(m)
      } else {
        setLoading(false)
        setError(e)
      }
    })
  }

  // handle retail tab click{}
  const handleRetailTab = () => {
    setOpenToken(false)
  }

  ////////////////////fund transfer////////////////////////////////
  const handleFund = e => {
    setFund({
      ...fund,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }
  const handleFundTransfer = () => {
    setLoading(true)
    const sendRequest = new Promise(res => {
      res(Instance.post("", fund))
    })
    sendRequest.then(({ data }) => {
      let fields = data.required_fields
      let m = data.message
      if (data.status === "301") {
        setLoading(false)
        setError(fields)
        setTimeout(() => {
          setError([])
        }, 3000)
      } else if (data.status === "200") {
        setLoading(false)
        setMessage(m)
        setTimeout(() => {
          setMessage("")
        }, 3000)
      } else {
        setLoading(false)
        setMessage(m)
        setTimeout(() => {
          setMessage("")
          window.location.reload()
        }, 3000)
      }
    })
  }
  const VoucherColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "VTU Line",
      dataIndex: "vtu_line",
      key: "vtu_line",
    },
    {
      title: "Counter",
      dataIndex: "counter",
      key: "counter",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <p style={{ marginBottom: "0px" }}>
          {record.status === "0" ? (
            <div style={{ color: "orange" }}>Pending</div>
          ) : record.status === "1" ? (
            <div style={{ color: "green" }}>Approved</div>
          ) : (
            <div style={{ color: "red" }}>Disapproved</div>
          )}
        </p>
      ),
    },
    {
      title: "VTU Balance",
      dataIndex: "balance",
      key: "balance",
      render: (text, record) => (
        <div>{`₦ ${parseInt(record.balance).toLocaleString()}`}</div>
      ),
    },

    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (text, record) => (
        <p style={{ marginBottom: "0px" }}>
          {record.active === "0" ? (
            <div style={{ color: "red" }}>Inactive</div>
          ) : (
            <div style={{ color: "green" }}>Active</div>
          )}
        </p>
      ),
    },
    {
      title: "Date/Time",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popover
          content={
            <div className="pop_content">
              <p
                id={record.username}
                title={record.name}
                onClick={e => {
                  let id = e.target.id
                  setOpenToken(!openToken)
                  setFund({ ...fund, vtu_id: record.id })
                  setName(e.currentTarget.title)
                }}
              >
                Fund VTU
              </p>
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

  const filteredList = vtu.filter(item => item.vtu_line.includes(filtered))

  const title = (
    <h4>
      <Dash_voucher_icon style={{ marginRight: "10px" }} />
      VTU
    </h4>
  )
  return (
    <DealerLayout title={title} position={["4"]}>
      <div className="adminContainer">
        <div className="adminGroup">
          <div className="admin">
            <Tabs defaultActiveKey="1">
              <TabPane tab="VTU list" key="1" onTabClick={handleRetailTab}>
                <div className={openToken ? "hide" : "table_Group"}>
                  <div className="table_header">
                    <div className="rowShow">
                      <h4>VTU list</h4>
                    </div>
                    <div className="searchTable">
                      <Input
                        placeholder="Search VTU line"
                        prefix={
                          <Icon type="search" style={{ color: "#D8D8D8" }} />
                        }
                        value={filtered}
                        onChange={e => {
                          setFiltered(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                  <Table
                    columns={VoucherColumn}
                    dataSource={filteredList}
                    bordered
                    size="small"
                  />
                </div>
                <div className={openToken ? "sendTokenContainer" : "hide"}>
                  <div className="sendTokenGroup">
                    <div className="tokenTitle">
                      <h4>
                        Send Funds to{" "}
                        <span
                          style={{
                            color: "Green",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          {name}
                        </span>
                      </h4>
                    </div>
                    <div className="tokenForm">
                      <Form layout="vertical">
                        {error.map(data => (
                          <div key={data} className="errors">
                            {data}
                          </div>
                        ))}
                        <div
                          className={
                            message === "Invalid Secret Key...Try again later!"
                              ? "errors"
                              : "msg"
                          }
                        >
                          {message}
                        </div>
                        <Form.Item label="AMOUNT">
                          <Input
                            name="amount"
                            type="number"
                            placeholder="N 1000"
                            onChange={handleFund}
                          />
                        </Form.Item>
                        <Form.Item label="TOKEN">
                          <Input
                            name="ref"
                            placeholder="Enter Unique Token"
                            onChange={handleFund}
                          />
                        </Form.Item>
                        <Form.Item label="Dealer Pin">
                          <Input
                            name="pin"
                            type="password"
                            placeholder="****"
                            onChange={handleFund}
                          />
                        </Form.Item>
                      </Form>
                    </div>
                    <div className="btnTokenGroup"></div>
                    <div className="tokenBtn">
                      <Button
                        onClick={handleFundTransfer}
                        loading={!loading ? false : true}
                      >
                        Send Fund
                      </Button>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Add VTU" key="2">
                <div className="formContainer">
                  <div className="formTitle">
                    <p>Add VTU</p>
                  </div>
                  <div className="formGroup">
                    <div className="adminForm">
                      {error.map(data => {
                        return (
                          <h5
                            style={{
                              color: "red",
                              textAlign: "center",
                            }}
                          >
                            {data}
                          </h5>
                        )
                      })}
                      <div
                        className="msg"
                        style={{
                          color: "green",
                          textAlign: "center",
                        }}
                      >
                        {msg}
                      </div>
                      <div className="formInput VoucherInput">
                        <label htmlFor="name">VTU Line</label>
                        <Input
                          placeholder="Enter name here..."
                          className="inputBack"
                          name="vtu_line"
                          onChange={handleInput}
                        />
                      </div>

                      <div className="formInput VoucherInput">
                        <label htmlFor="name">VTU Username</label>
                        <Input
                          placeholder="Please enter username"
                          name="vtu_username"
                          onChange={handleInput}
                        />
                      </div>
                      <div className="formInput VoucherInput">
                        <label htmlFor="name">VTU Password</label>
                        <Input
                          type="password"
                          placeholder="Please enter password"
                          name="vtu_password"
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="adminFormBtn">
                    <div className="btngroup">
                      <Button loading={loading} onClick={submitVtu}>
                        Add VTU
                      </Button>
                    </div>
                  </div>
                </div>
              </TabPane>

              {/* <TabPane tab="Pin Query" key="3">
                <div className="formContainer">
                  <div className="formTitle">
                    <p>Pin Query</p>
                  </div>
                  <div className="formGroup">
                    <div className="adminForm">
                      <div className="formInput exportInput">
                        <label htmlFor="name">Pin</label>
                        <Input placeholder="Enter Pin" className="inputBack" />
                      </div>
                    </div>
                  </div>
                  <div className="adminFormBtn">
                    <div className="btngroup">
                      <Button>Query</Button>
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

export default Voucher

import React, { useState, useEffect } from "react"
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
import "../../scss/Table.scss"
import { TableTwo } from "../../components/Constants/Tableone"
import "../../scss/Retailer.scss"
import Green from "../../../assets/green.svg"
import Red from "../../../assets/red.svg"
import Cryptr from "cryptr"

import { openTokenForm } from "../../Actions/ActionsType"
import Instance from "../../Api/Instance"
// import { useSelector, useDispatch } from "react-redux"

const { TabPane } = Tabs

const { Option } = Select

const RetailerList = () => {
  const [openToken, setOpenToken] = useState(false)
  const [retailer, setRetailer] = useState([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState([])
  const [name, setName] = useState("")
  const [activateRetailer, setActivateRetailer] = useState({
    serviceCode: "ACT",
  })
  const [deactivateRetailer, setDeactivateRetailer] = useState({
    serviceCode: "DEA",
  })
  const [fund, setFund] = useState({
    serviceCode: "FUD",
  })
  const [inputChange, setInput] = useState({ serviceCode: "AVT" })
  const [inputRetailChange, setInputRetail] = useState({ serviceCode: "ADR" })

  const cryptr = new Cryptr("retopaToken")

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
    const username = cryptr.decrypt(data.TOKEN_ONE)
    const password = cryptr.decrypt(data.TOKEN_TWO)
    const req = { serviceCode: "RTL", username, password, user_id }

    // inputs for adding vtu line
    setInput({
      ...inputChange,
      username,
      password,
      user_id,
    })
    // inputs for adding retailers
    setInputRetail({
      ...inputRetailChange,
      username,
      password,
      user_id,
    })
    // inputs for Activating retailers
    setActivateRetailer({
      ...activateRetailer,
      username,
      password,
    })
    // inputs for Activating retailers
    setDeactivateRetailer({
      ...deactivateRetailer,
      username,
      password,
    })
    // inputs for funding retailers
    setFund({
      ...fund,
      username,
      password,
      user_id,
    })

    // request for retailer list
    const request = new Promise(res => {
      res(Instance.post("", req))
    })
    request.then(({ data }) => {
      if (data.status === "200") {
        setRetailer(data.retailer)
      }
    })
  }, [])

  const ColumnsTwo = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",

      // render: text => <a>{text}</a>,
    },
    {
      title: "Full name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Retailer number",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Token",
      dataIndex: "code",
      key: "code",

      // align: "right",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: text =>
        text === 1 ? (
          <p className="enabled">
            <Green className="dotPosition" />
            Enable
          </p>
        ) : (
          <p className="disabled">
            <Red className="dotPosition" />
            Disabled
          </p>
        ),
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",

      // align: "right",
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
                  setFund({ ...fund, id })
                  setName(e.currentTarget.title)
                }}
              >
                Send Fund
              </p>
              <p>Edit</p>
              <p id={record.id} title={record.type} onClick={ActivateRetailer}>
                {record.status === 1 ? "Deactivate" : "Activate"}
              </p>
            </div>
          }
          placement="bottom"
          //  title="Title"
          trigger="click"
        >
          <span className="popover">...</span>
        </Popover>
      ),
    },
  ]

  // handle retail tab click{}
  const handleRetailTab = () => {
    setOpenToken(false)
  }

  // select network
  function handleNetwork(value) {
    // setNetwork(value)
    setInput({
      ...inputChange,
      network: value,
    })
  }
  const handleChange = e => {
    setInput({
      ...inputChange,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  // handle vtu Submit
  const handleVTUSubmit = () => {
    setLoading(true)
    const submitRequest = new Promise(res => {
      res(Instance.post("", inputChange))
    })
    submitRequest.then(({ data }) => {
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
      }
    })
  }
  //////////////////////////////////////////////add retailer//////////////////////////////////////////////////////////////////////////////////////////
  const handleRetailChange = e => {
    setInputRetail({
      ...inputRetailChange,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  function handleRetailer(value) {
    setInputRetail({
      ...inputRetailChange,
      type: value,
    })
  }
  // submit retailer request
  const handleRetailerSubmit = () => {
    setLoading(true)
    const submitRequest = new Promise(res => {
      res(Instance.post("", inputRetailChange))
    })
    submitRequest.then(({ data }) => {
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
        }, 3000)
      }
    })
  }
  //////////////////////////////add retailer end/////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////ACTIVTE RETAILER//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const ActivateRetailer = async e => {
    let type = e.currentTarget.title
    let user_id = e.target.id
    let status = e.target.innerHTML
    let { serviceCode } = activateRetailer
    let { username } = activateRetailer
    let { password } = activateRetailer
    const Data = { serviceCode, username, password, type, user_id }
    const DataTwo = { serviceCode: "DEA", username, password, type, user_id }
    if (status === "Activate") {
      const submitRequest = new Promise(res => {
        res(Instance.post("", Data))
      })
      submitRequest.then(({ data }) => {
        let fields = data.required_fields
        let m = data.message
        if (data.status === "301") {
          setLoading(false)
          setError(fields)
          setTimeout(() => {
            setError([])
            window.location.reload(true)
          }, 3000)
        } else if (data.status === "200") {
          setLoading(false)
          setMessage(m)
          setTimeout(() => {
            setMessage("")
            window.location.reload(true)
          }, 3000)
        } else {
          setLoading(false)
          setMessage(m)
          setTimeout(() => {
            setMessage("")
          }, 3000)
        }
      })
    } else if (status === "Deactivate") {
      const submitRequest = new Promise(res => {
        res(Instance.post("", DataTwo))
      })
      submitRequest.then(({ data }) => {
        let fields = data.required_fields
        let m = data.message
        if (data.status === "301") {
          setLoading(false)
          setError(fields)
          setTimeout(() => {
            setError([])
            window.location.reload(true)
          }, 3000)
        } else if (data.status === "200") {
          setLoading(false)
          setMessage(m)
          setTimeout(() => {
            setMessage("")
            window.location.reload(true)
          }, 3000)
        } else {
          setLoading(false)
          setMessage(m)
          setTimeout(() => {
            setMessage("")
            window.location.reload(true)
          }, 3000)
        }
      })
    }
  }
  ////////////////////ACTIVTE RETAILER END////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////SEND FUNDS TO RETAILER//////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleFund = e => {
    setFund({ ...fund, [e.currentTarget.name]: e.currentTarget.value })
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
        }, 3000)
      }
    })
  }
  return (
    <div>
      <Tabs defaultActiveKey="1" onTabClick={handleRetailTab}>
        <TabPane tab="Retailer List" key="1">
          <div
            className={openToken ? "hide" : "table_container"}
            style={
              TableTwo.length <= 9 ? { height: "100vh" } : { height: "auto" }
            }
          >
            <div className="table_Group">
              <div className="table_header">
                <div className="rowShow">
                  <Button>Fund Wallet</Button>
                </div>
                <div className="msg">{message}</div>
                <div className="searchTable">
                  <Input
                    placeholder="Search Retailer…"
                    prefix={<Icon type="search" style={{ color: "#D8D8D8" }} />}
                  />
                </div>
              </div>
              <Table
                columns={ColumnsTwo}
                dataSource={retailer}
                bordered
                size="small"
              />
            </div>
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
                  {/* <Form.Item label="Phone Number">
                    <Input placeholder="2346208675" />
                  </Form.Item>
                  <Form.Item label="Amount">
                    <Input placeholder="Enter Amount Here" />
                  </Form.Item> */}
                  <Form.Item label="AMOUNT">
                    <Input
                      name="amount"
                      type="number"
                      placeholder="N 1000"
                      onChange={handleFund}
                    />
                  </Form.Item>
                  <Form.Item label="Pin">
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
        <TabPane tab="Add Retailer" key="2">
          <div className="formContainer">
            <div className="formTitle">
              <p>Add Retailer</p>
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
                    message === "Invalid Secret Key...Try again later!"
                      ? "errors"
                      : "msg"
                  }
                >
                  {message}
                </div>
                <div className="formInput VTUInput">
                  <label htmlFor="name">Name</label>
                  <Input
                    placeholder="Enter Full Name"
                    name="name"
                    onChange={handleRetailChange}
                  />
                </div>
                <div className="formInput VTUInput">
                  <label htmlFor="name">Type</label>
                  <Select
                    style={{ width: "100%" }}
                    className="inputBack"
                    defaultValue="Select Type"
                    onChange={handleRetailer}
                  >
                    <Option value="REGULAR">REGULAR</Option>
                  </Select>
                </div>

                <div className="formInput VTUInput">
                  <label htmlFor="name">Pin</label>
                  <Input
                    type="password"
                    placeholder="****"
                    name="pin"
                    onChange={handleRetailChange}
                  />
                </div>
              </div>
            </div>
            <div className="adminFormBtn">
              <div className="btngroup">
                <Button
                  onClick={handleRetailerSubmit}
                  loading={!loading ? false : true}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Add VTU Line" key="3">
          <div className="formContainer">
            <div className="formTitle">
              <p>Add VTU Line</p>
            </div>
            <div className="formGroup">
              <div className="adminForm">
                {error.map(data => (
                  <div key={data} className="errors">
                    {data}
                  </div>
                ))}
                <div className="msg">{message}</div>
                <div className="formInput VTUInput">
                  <label htmlFor="name">Network</label>
                  <Select
                    style={{ width: "100%" }}
                    className="inputBack"
                    name="network"
                    defaultValue="Select Network"
                    onChange={handleNetwork}
                  >
                    <Option value="MTN">MTN</Option>
                  </Select>
                </div>

                <div className="formInput VTUInput">
                  <label htmlFor="name">VTU Line</label>
                  <Input
                    type="number"
                    placeholder="080********"
                    name="vtu_line"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="adminFormBtn">
              <div className="btngroup">
                <Button
                  onClick={handleVTUSubmit}
                  loading={!loading ? false : true}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default RetailerList

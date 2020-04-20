import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
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
  Tooltip,
  Popconfirm,
  message,
  Spin,
} from "antd"
import "../../scss/Table.scss"
import "../../scss/Admin.scss"
import "../../scss/Export.scss"
import { TableTwo } from "../../components/Constants/Tableone"
import "../../scss/Retailer.scss"
import Green from "../../../assets/green.svg"
import Red from "../../../assets/red.svg"
import { Base64 } from "js-base64"
import { CSVLink, CSVDownload } from "react-csv"
import { openTokenForm } from "../../Actions/ActionsType"
import Instance from "../../Api/Instance"
// import { useSelector, useDispatch } from "react-redux"
import DealerLayout from "../../components/Layout/DealerLayout"
import { RetailIcon } from "../../components/CustomIcons"
import { Link, navigate } from "gatsby"
import { retailerDetails } from "../../Actions/Actions"
import AdminInstance from "../../Api/AdminInstance"
const Dash_retail_icon = props => <Icon component={RetailIcon} {...props} />

const { TabPane } = Tabs

const { Option } = Select

const RetailerList = () => {
  const [openToken, setOpenToken] = useState(false)
  const [openToken2, setOpenToken2] = useState(false)
  const [spinning, setSpinning] = useState(true)
  const [retailer, setRetailer] = useState([])
  const [vtu, setVtu] = useState([])
  const [message, setMessage] = useState("")
  const [messageAct, setMessageAct] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState([])
  const [name, setName] = useState("")
  const [sorted, setSorted] = useState([])
  const [filterText, setFilterText] = useState("")
  const [type, setType] = useState("")
  const [SelectSub, setSelectSub] = useState([])
  const [activateRetailer, setActivateRetailer] = useState({
    serviceCode: "ACT",
  })
  const [deactivateRetailer, setDeactivateRetailer] = useState({
    serviceCode: "DEA",
  })
  const [fund, setFund] = useState({
    serviceCode: "FUD",
  })
  const [inputChange, setInput] = useState({ serviceCode: "ACR" })
  const [inputRetailChange, setInputRetail] = useState({ serviceCode: "ADR" })
  const [Assign, setAssign] = useState({ serviceCode: "ARL" })

  const dispatch = useDispatch()

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

    let data2 = sessionStorage.getItem("topup2")
      ? JSON.parse(sessionStorage.getItem("topup2"))
      : []
    const usernameA = Base64.decode(data2.TOKEN_ONE_ADMIN)
    const passwordA = Base64.decode(data2.TOKEN_TWO_ADMIN)
    const req = {
      serviceCode: "RTL",
      username,
      password,
      user_id,
    }
    const req2 = {
      serviceCode: "RTL",
      username: usernameA,
      password: passwordA,
      user_id,
    }

    let UserData = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : []

    setAssign({
      ...Assign,
      username,
      password,
    })
    // inputs for adding vtu line
    setInput({
      ...inputChange,
      username,
      password,
      user_id,
      type: "REGULAR",
    })
    // inputs for adding retailers
    setInputRetail({
      ...inputRetailChange,
      username,
      password,
      user_id,
      type: "REGULAR",
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

    setTimeout(() => {
      setSpinning(false)
    }, 60000)

    if (UserData.type === "Admin") {
      setType("Admin")
      // request for retailer list
      const request = new Promise(res => {
        res(AdminInstance.post("", req2))
      })
      request.then(({ data }) => {
        if (data.status === "200") {
          setRetailer(data.retailer)
        }
      })
    } else {
      // request for retailer list
      const request = new Promise(res => {
        res(Instance.post("", req))
      })
      request.then(({ data }) => {
        if (data.status === "200") {
          setSpinning(false)
          setRetailer(data.retailer)
        }
      })
    }

    // sub dealers list
    const reqSubDealer = {
      serviceCode: "SSDL",
      username,
      password,
      user_id,
    }
    // request for sub dealer list
    const request = new Promise(res => {
      res(Instance.post("", reqSubDealer))
    })
    request.then(({ data }) => {
      if (data.status === "200") {
        let allRetailers = data.sub_dealers
        setSelectSub(allRetailers)
        // to query sub dealers only
      }
    })
    // request for Vtu list
    const reqVTU = {
      username,
      password,
      serviceCode: "VTULS",
    }
    const requestVtu = new Promise(res => {
      res(Instance.post("", reqVTU))
    })
    requestVtu.then(({ data }) => {
      if (data.status === "200") {
        setVtu(data.vtus)
      }
    })
  }, [])
  const ColumnsTwo = [
    {
      title: "POS Username",
      dataIndex: "username",
      key: "username",

      // render: text => <a>{text}</a>,
    },
    {
      title: "Retailer Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Retailer Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Assigned Wallet",
      dataIndex: "vtu_name",
      key: "vtu_name",
    },

    {
      title: "Assigned Sub Dealer",
      dataIndex: "sub_dealer_name",
      key: "sub_dealer_name",
    },
    {
      title: "Wallet Balance",
      dataIndex: "balance",
      key: "balance",
      render: (text, record) => (
        <div>{`₦ ${parseInt(record.balance).toLocaleString()}`}</div>
      ),
    },

    {
      title: "Retail Code",
      dataIndex: "code",
      key: "code",
      render: (text, record) => (
        <div>
          {record.tp_no}
          {record.code}
        </div>
      ),

      // align: "right",
    },
    {
      title: "POS Status",
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
      title: "USSD Status",
      dataIndex: "ussd_status",
      key: "ussd_status",

      render: text =>
        text === 1 ? (
          <p className="enabled">
            <Green className="dotPosition" />
            Active
          </p>
        ) : (
          <p className="disabled">
            <Red className="dotPosition" />
            Inactive
          </p>
        ),
    },
    // {
    //   title: "Dealer",
    //   dataIndex: "d_id",
    //   key: "d_id",
    //   // align: "right",
    // },
    {
      title: "Date Created/Time",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) => a.created_at - b.created_at,
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
                  setFund({ ...fund, id: record.id, vtu_id: record.vtu_id })
                  setName(e.currentTarget.title)
                }}
              >
                Send Fund
              </p>
              {/* <p>Edit</p> */}
              <p id={record.id} title={record.type} onClick={ActivateRetailer}>
                {record.status === 1 ? "Deactivate POS" : "Activate POS"}
              </p>
              <p
                id={record.id}
                title={record.tp_id}
                onClick={ActivateUSSD}
                style={
                  record.code === null
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                {record.ussd_status === 1 ? "Deactivate USSD" : "Activate USSD"}
              </p>
              <p
                id={record.id}
                title={record.name}
                onClick={e => {
                  let details = {
                    user_id: e.currentTarget.id,
                    name: e.currentTarget.title,
                  }
                  dispatch(retailerDetails(details))
                  navigate(`/Dealer_Dashboard/RetailerHistory`)
                }}
              >
                Retailer's history
              </p>
              <p
                id={record.username}
                title={record.name}
                onClick={e => {
                  let id = e.target.id
                  setOpenToken2(!openToken2)
                  setAssign({ ...Assign, rt_id: record.id })
                  setName(e.currentTarget.title)
                }}
              >
                Assign Sub-Dealer
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

  // handle retail tab click{}
  const handleRetailTab = () => {
    setOpenToken(false)
  }

  // select user type
  function handleType(value) {
    setInput({
      ...inputChange,
      type: value,
    })
  }

  // handle vtu select
  function handleVTUSelect(value) {
    setFund({
      ...fund,
      vtu_id: value,
    })
  }
  const handleChange = e => {
    setInput({
      ...inputChange,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  // handle ussd activation Submit
  const handleVTUSubmit = () => {
    setLoading(true)
    const submitRequest = new Promise(res => {
      res(Instance.post("", inputChange))
    })
    submitRequest.then(({ data }) => {
      console.log(data, inputChange)
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
        setMessageAct(m)
      } else if (data.statusCode === "300" || data.status === "300") {
        setLoading(false)
        setMessageAct(m)
        setTimeout(() => {
          setMessageAct("")
        }, 3000)
      } else {
        setLoading(false)
        setMessageAct(m)
        setTimeout(() => {
          setMessageAct("")
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
    setRetailer({
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
          window.location.reload(false)
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
    if (status === "Activate POS") {
      e.target.innerHTML = "Activating..."
      const submitRequest = new Promise(res => {
        res(Instance.post("", Data))
      })
      submitRequest.then(({ data }) => {
        let fields = data.required_fields
        let m = data.message
        if (data.status === "301") {
          setLoading(false)
          setError(fields)
          e.target.innerHTML = "Activate"
          setTimeout(() => {
            setError([])
          }, 3000)
        } else if (data.status === "200") {
          setLoading(false)
          setMessage(m)
          setTimeout(() => {
            setMessage("")
            window.location.reload(false)
          }, 3000)
        } else {
          setLoading(false)
          setMessage(m)
          e.target.innerHTML = "Activate"
          setTimeout(() => {
            setMessage("")
          }, 3000)
        }
      })
    } else if (status === "Deactivate POS") {
      e.target.innerHTML = "Deactivating..."
      const submitRequest = new Promise(res => {
        res(Instance.post("", DataTwo))
      })
      submitRequest.then(({ data }) => {
        let fields = data.required_fields
        let m = data.message
        if (data.status === "301") {
          setLoading(false)
          setError(fields)
          e.target.innerHTML = "Deactivate"
          setTimeout(() => {
            setError([])
          }, 3000)
        } else if (data.status === "200") {
          setLoading(false)
          setMessage(m)
          setTimeout(() => {
            setMessage("")
            window.location.reload(false)
          }, 3000)
        } else {
          setLoading(false)
          setMessage(m)
          e.target.innerHTML = "Deactivate"
          setTimeout(() => {
            setMessage("")
          }, 3000)
        }
      })
    }
  }
  ////////////////////ACTIVTE RETAILER END////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////ACTIVTE USSD//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const ActivateUSSD = async e => {
    let tp_id = e.currentTarget.title
    let rt_id = e.target.id
    let status = e.target.innerHTML
    let { username } = activateRetailer
    let { password } = activateRetailer
    const Data = {
      serviceCode: "RTAD",
      username,
      password,
      rt_id,
      type: "ACTIVATE",
    }
    const DataTwo = {
      serviceCode: "RTAD",
      username,
      password,
      rt_id,
      type: "DEACTIVATE",
    }
    if (status === "Activate USSD") {
      e.target.innerHTML = "Activating..."
      const submitRequest = new Promise(res => {
        res(Instance.post("", Data))
      })
      submitRequest.then(({ data }) => {
        let m = data.message
        if (data.status === "301") {
          setLoading(false)
          e.target.innerHTML = "Activate"
          setTimeout(() => {
            setError([])
          }, 3000)
        } else if (data.status === "200") {
          setLoading(false)
          setMessage(m)
          setTimeout(() => {
            setMessage("")
            window.location.reload(false)
          }, 3000)
        } else {
          setLoading(false)
          setMessage(m)
          e.target.innerHTML = "Activate"
          setTimeout(() => {
            setMessage("")
          }, 3000)
        }
      })
    } else if (status === "Deactivate USSD") {
      e.target.innerHTML = "Deactivating..."
      const submitRequest = new Promise(res => {
        res(Instance.post("", DataTwo))
      })
      submitRequest.then(({ data }) => {
        let fields = data.required_fields
        let m = data.message
        if (data.status === "301") {
          setLoading(false)
          setError(fields)
          e.target.innerHTML = "Deactivate"
          setTimeout(() => {
            setError([])
          }, 3000)
        } else if (data.status === "200") {
          setLoading(false)
          setMessage(m)
          setTimeout(() => {
            setMessage("")
            window.location.reload(false)
          }, 3000)
        } else {
          setLoading(false)
          setMessage(m)
          e.target.innerHTML = "Deactivate"
          setTimeout(() => {
            setMessage("")
          }, 3000)
        }
      })
    }
  }
  ////////////////////ACTIVTE USSD END////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
          window.location.reload()
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
  ////////////////////retailer search////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const filteredItems = retailer
    .slice()
    .reverse()
    .filter(
      item =>
        item.name
          .toLocaleLowerCase()
          .includes(filterText.toLocaleLowerCase()) ||
        item.username
          .toLocaleLowerCase()
          .includes(filterText.toLocaleLowerCase())
    )

  const title = (
    <h4>
      <Dash_retail_icon style={{ marginRight: "10px" }} />
      Retailers
    </h4>
  )

  /////////////////////aassign Retailer////////////////////////////////////////

  function handleAssign(value) {
    setAssign({
      ...Assign,
      d_id: value,
    })
  }

  const SubmitAssign = () => {
    setLoading(true)
    const sendRequest = new Promise(res => {
      res(Instance.post("", Assign))
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

  ///////////export to csv///////////////////////////////////////////////////
  const headers = [
    { label: "Username", key: "username" },
    { label: "Full Name", key: "name" },
    { label: "Type", key: "type" },
    { label: "Retailer Number", key: "phone" },
    { label: "USSD Code", key: "code" },
    { label: "Status", key: "status" },
    { label: "Date Created/Time", key: "created_at" },
  ]

  // ///////////////////////confirmations ///////////////////////////////
  function confirm(e) {
    handleFundTransfer()
  }

  function cancel(e) {
    console.log(e)
    // message.error("Click on No")
  }

  return (
    <DealerLayout title={title} position={["2"]}>
      <div>
        <Tabs defaultActiveKey="1" onTabClick={handleRetailTab}>
          <TabPane tab="Retailer List" key="1">
            <div
              className={openToken || openToken2 ? "hide" : "table_container"}
              style={
                TableTwo.length <= 9 ? { height: "100vh" } : { height: "auto" }
              }
            >
              <div className="table_Group">
                <div className="table_header">
                  <div className="rowShow">
                    <Button>
                      <CSVLink
                        data={retailer}
                        filename={"Retailers.csv"}
                        headers={headers}
                        style={{ color: "white" }}
                      >
                        Export to CSV
                      </CSVLink>
                    </Button>
                  </div>
                  <div className="msg">{message}</div>
                  <div className="searchTable">
                    <Input
                      placeholder="Search Retailer…"
                      value={filterText}
                      onChange={e => {
                        setFilterText(e.target.value)
                      }}
                      prefix={
                        <Icon type="search" style={{ color: "#D8D8D8" }} />
                      }
                    />
                  </div>
                </div>
                <Spin spinning={spinning} size="large" delay={0}>
                  <Table
                    columns={ColumnsTwo}
                    dataSource={filteredItems}
                    bordered
                    size="small"
                  />
                </Spin>
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
                    <Form.Item label="Select VTU">
                      <Select
                        style={{ width: "100%" }}
                        defaultValue="Select VTU name"
                        onChange={handleVTUSelect}
                      >
                        {vtu.map(data => {
                          return (
                            <Option key={data.id} value={data.id}>
                              {data.name}
                            </Option>
                          )
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item label="AMOUNT">
                      <Input
                        name="amount"
                        type="number"
                        placeholder="N 1000"
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
                  <Popconfirm
                    title={`You are about to send the sum of ₦ ${parseInt(
                      fund.amount
                    ).toLocaleString()} to ${name}, please press "Yes" to confirm`}
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      // onClick={handleFundTransfer}
                      loading={!loading ? false : true}
                    >
                      Send Fund
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
            {/***************************************** * Assign Retailer to sub dealer******************************************** */}
            <div className={openToken2 ? "sendTokenContainer" : "hide"}>
              <div className="sendTokenGroup">
                <div className="tokenTitle">
                  <h4>
                    Assign Sub-Dealer to{" "}
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

                    <Form.Item label="Select Sub-Dealer">
                      <Select
                        style={{ width: "100%" }}
                        defaultValue="Select Sub-Dealer"
                        onChange={handleAssign}
                      >
                        {SelectSub.map(data => {
                          return (
                            <Option key={data.id} value={data.id}>
                              {data.name}
                            </Option>
                          )
                        })}
                      </Select>
                    </Form.Item>
                  </Form>
                </div>
                <div className="btnTokenGroup"></div>
                <div className="tokenBtn">
                  <Button
                    onClick={SubmitAssign}
                    loading={!loading ? false : true}
                  >
                    Assign
                  </Button>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane
            tab="Add Retailer"
            key="2"
            disabled={type === "Admin" ? true : false}
          >
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
                    <label htmlFor="name">Dealer Pin</label>
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
          <TabPane
            tab="Activate USSD"
            key="3"
            disabled={type === "Admin" ? true : false}
          >
            <div className="formContainer">
              <div className="formTitle">{/* <p>Activate USSD</p> */}</div>
              <div className="formGroup">
                <div className="adminForm">
                  {error.map(data => (
                    <div key={data} className="errors">
                      {data}
                    </div>
                  ))}
                  <div
                    className={
                      messageAct === "Invalid Secret Key...Try again later!" ||
                      messageAct === "Unauthencitacted!"
                        ? "errors"
                        : "msg"
                    }
                  >
                    {messageAct}
                  </div>
                  <div className="formInput VTUInput">
                    <label htmlFor="name">POS Username</label>
                    <Input
                      name="retailer"
                      placeholder="Enter Username e.g. 123434"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="formInput VTUInput">
                    <label htmlFor="name">Number</label>
                    <Tooltip placement="topLeft" title="please start with 234">
                      <Input
                        maxLength={13}
                        minLength={13}
                        placeholder="23480********"
                        name="phone"
                        onChange={handleChange}
                        type="tel"
                      />
                    </Tooltip>
                  </div>
                  <div className="formInput VTUInput">
                    <label htmlFor="name">Name</label>
                    <Input
                      placeholder="Enter User's Name"
                      name="name"
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div className="formInput VTUInput">
                    <label htmlFor="name">Type</label>
                    <Select
                      style={{ width: "100%" }}
                      defaultValue="Select Type"
                      onChange={handleType}
                    >
                      <Option value="REGULAR">RETAILER</Option>
                      <Option value="SUB DEALER">SUB DEALER</Option>
                    </Select>
                  </div> */}
                  <div className="formInput VTUInput">
                    <label htmlFor="pin">Dealer Pin</label>
                    <Input
                      placeholder="****"
                      type="password"
                      name="pin"
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
    </DealerLayout>
  )
}

export default RetailerList

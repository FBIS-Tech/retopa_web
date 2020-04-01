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
  Modal,
  Form,
} from "antd"
import "../../scss/Table.scss"
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
import { Link, navigateTo } from "gatsby"
import { retailerDetails } from "../../Actions/Actions"
const Dash_retail_icon = props => <Icon component={RetailIcon} {...props} />

const { TabPane } = Tabs

const { Option } = Select

const SubDealer = () => {
  const [openToken, setOpenToken] = useState(false)
  const [retailer, setRetailer] = useState([])
  const [walletData, setWalletData] = useState([])
  const [SelectRetailer, setSelectRetailer] = useState([])
  const [message, setMessage] = useState("")
  const [messageAct, setMessageAct] = useState("")
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState([])
  const [name, setName] = useState("")
  const [activate, setActivate] = useState("Activate")
  const [filterText, setFilterText] = useState("")
  const [activateRetailer, setActivateRetailer] = useState({
    serviceCode: "ACT",
  })
  const [deactivateRetailer, setDeactivateRetailer] = useState({
    serviceCode: "DEA",
  })
  const [assign, setAssign] = useState({
    serviceCode: "FUD",
  })
  const [inputChange, setInput] = useState({
    serviceCode: "ACR",
  })
  const [inputRetailChange, setInputRetail] = useState({
    serviceCode: "AMSD",
  })
  const [wallet, setWallet] = useState({
    serviceCode: "DDB",
  })
  const [fund, setFund] = useState({
    serviceCode: "FSDF",
  })

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
    const req = {
      serviceCode: "SSDL",
      username,
      password,
      user_id,
    }

    // inputs for adding vtu line
    setWallet({
      ...wallet,
      username,
      password,
    })
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
    setAssign({
      ...assign,
      username,
      password,
      user_id,
    })
    // inputs for funding retailers
    setFund({
      ...fund,
      username,
      password,
      user_id,
    })

    // request for sub dealer list
    const request = new Promise(res => {
      res(Instance.post("", req))
    })
    request.then(({ data }) => {
      if (data.status === "200") {
        let allRetailers = data.sub_dealers
        setRetailer(allRetailers)
        // to query sub dealers only
      }
    })
  }, [])
  const ColumnsTwo = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",

      // render: text => <a>{text}</a>,
    },
    {
      title: "Sub-Dealer Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Counter",
      dataIndex: "counter",
      key: "counter",
    },
    {
      title: "Retailer number",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "USSD Code",
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
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",

    //   render: text =>
    //     text === 1 ? (
    //       <p className="enabled">
    //         <Green className="dotPosition" />
    //         Enable
    //       </p>
    //     ) : (
    //       <p className="disabled">
    //         <Red className="dotPosition" />
    //         Disabled
    //       </p>
    //     ),
    // },
    {
      title: "Date/Time",
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
                id={record.id}
                title={record.name}
                onClick={e => {
                  let id = e.target.id
                  setOpenToken(!openToken)
                  setFund({ ...fund, id: record.id, vtu_id: record.vtu_id })
                  setName(e.currentTarget.title)
                  walletBalance2(id)
                }}
              >
                Fund Sub-Dealer
              </p>
              <p
                id={record.id}
                title={record.name}
                onClick={e => {
                  let id = e.currentTarget.id

                  setName(record.name)
                  // setWallet({ ...wallet, id: e.currentTarget.id })
                  walletBalance(id)
                }}
              >
                {!loading ? "Check Balance" : "Checking..."}
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
                  navigateTo(`/Dealer_Dashboard/SubDealer_List`)
                }}
              >
                Retailer List
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
        // setTimeout(() => {
        //   setMessage("")
        // }, 3000)
      } else if (data.status === "300") {
        setLoading(false)
        setMessageAct(m)
        setTimeout(() => {
          setMessageAct("")
        }, 3000)
      }
    })
  }
  //////////////////////////////////////////////add Subdealer//////////////////////////////////////////////////////////////////////////////////////////
  const handleSubDealerAdd = e => {
    setInputRetail({
      ...inputRetailChange,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  function handleRetailer(value) {
    setInputRetail({
      ...inputRetailChange,
      rt_id: value,
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
    const Data = {
      serviceCode,
      username,
      password,
      type,
      user_id,
    }
    const DataTwo = {
      serviceCode: "DEA",
      username,
      password,
      type,
      user_id,
    }
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

  ////////////////////SEND FUNDS TO RETAILER//////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////SEND FUNDS TO RETAILER//////////////////////////////////////////////////////////////////////////////////////////////////////////

  function handleAssign(value) {
    setFund({
      ...fund,
      vtu_id: value,
    })
  }

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

  const walletBalance = e => {
    setLoading(true)
    let data = { ...wallet, id: e }
    const sendRequest = new Promise(res => {
      res(Instance.post("", data))
    })
    sendRequest.then(({ data }) => {
      let fields = data.wallets
      if (data.status === "200") {
        setVisible(true)
        setWalletData(fields)
        setLoading(false)
      }
    })
  }
  const walletBalance2 = e => {
    let data = { ...wallet, id: e }
    const sendRequest = new Promise(res => {
      res(Instance.post("", data))
    })
    sendRequest.then(({ data }) => {
      let fields = data.wallets
      if (data.status === "200") {
        setWalletData(fields)
        setLoading(false)
      }
    })
  }
  ////////////////////retailer search////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const filteredItems = retailer.filter(
    item =>
      item.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) ||
      item.username.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
  )

  const title = (
    <h4>
      <Dash_retail_icon style={{ marginRight: "10px" }} />
      Sub Dealers
    </h4>
  )
  ///////////export to csv///////////////////////////////////////////////////
  const headers = [
    { label: "Username", key: "username" },
    { label: "Full Name", key: "name" },
    { label: "Type", key: "type" },
    { label: "Retailer Number", key: "phone" },
    { label: "USSD Code", key: "code" },
    { label: "Status", key: "status" },
    { label: "Date/Time", key: "created_at" },
  ]

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
    },
  ]

  return (
    <DealerLayout title={title} position={["9"]}>
      <div>
        <Tabs defaultActiveKey="1" onTabClick={handleRetailTab}>
          <TabPane tab="Sub Dealer List" key="1">
            <div
              className={openToken ? "hide" : "table_container"}
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
                <Table
                  columns={ColumnsTwo}
                  dataSource={filteredItems}
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
                    <Form.Item label="AMOUNT">
                      <Input
                        name="amount"
                        type="number"
                        placeholder="N 1000"
                        onChange={handleFund}
                      />
                    </Form.Item>
                    <Form.Item label="Select Sub-Dealer">
                      <Select
                        style={{ width: "100%" }}
                        defaultValue="Select Sub-Dealer"
                        onChange={handleAssign}
                      >
                        {walletData.map(data => {
                          return (
                            <Option key={data.id} value={data.vtu_id}>
                              {data.vtu_name}
                            </Option>
                          )
                        })}
                      </Select>
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
          <TabPane tab="Add Sub-Dealer" key="2">
            <div className="formContainer">
              <div className="formTitle">
                <p>Add Sub-Dealer</p>
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
                      placeholder="Enter Name"
                      name="name"
                      onChange={handleSubDealerAdd}
                    />
                  </div>

                  <div className="formInput VTUInput">
                    <label htmlFor="name">Dealer Pin</label>
                    <Input
                      type="password"
                      placeholder="****"
                      name="pin"
                      onChange={handleSubDealerAdd}
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
        </Tabs>
      </div>
      <Modal
        title={`${name}'s Wallet`}
        visible={visible}
        onOk={() => {
          setVisible(false)
        }}
        onCancel={() => {
          setVisible(false)
          setWalletData([])
        }}
      >
        <Table
          columns={WalletColums}
          dataSource={walletData}
          bordered
          size="small"
        />
      </Modal>
    </DealerLayout>
  )
}

export default SubDealer

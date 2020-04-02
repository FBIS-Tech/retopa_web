import React, { useEffect } from "react"
import Green from "../../../assets/green.svg"
import Red from "../../../assets/red.svg"
import { Popover, Button } from "antd"
import "../../scss/Table.scss"
import { useDispatch } from "react-redux"
import { openTokenForm } from "../../Actions/Actions"

export const TableOne = [
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
  {
    name: "Emmanuel",
    number: "2349090326673",
    balance: "120",
    network: "MTN",
    date: "2019-10-11   11:54:01",
  },
]

export const TableTwo = [
  {
    type: "retailer",
    fullname: "Edward",
    retailerNumber: "2349090326673",
    token: "756478",
    status: "enable",
    date: "2019-10-11   11:54:01",
  },
  {
    type: "retailer",
    fullname: "Edward",
    retailerNumber: "2349090326673",
    token: "756478",
    status: "enable",
    date: "2019-10-11   11:54:01",
  },
  {
    type: "retailer",
    fullname: "Edward",
    retailerNumber: "2349090326673",
    token: "756478",
    status: "enable",
    date: "2019-10-11   11:54:01",
  },
  {
    type: "retailer",
    fullname: "Edward",
    retailerNumber: "2349090326673",
    token: "756478",
    status: "disabled",
    date: "2019-10-11   11:54:01",
  },
  {
    type: "retailer",
    fullname: "Edward",
    retailerNumber: "2349090326673",
    token: "756478",
    status: "enable",
    date: "2019-10-11   11:54:01",
  },
  {
    type: "retailer",
    fullname: "Edward",
    retailerNumber: "2349090326673",
    token: "756478",
    status: "enable",
    date: "2019-10-11   11:54:01",
  },
  {
    type: "retailer",
    fullname: "Edward",
    retailerNumber: "2349090326673",
    token: "756478",
    status: "enable",
    date: "2019-10-11   11:54:01t",
  },
  {
    type: "retailer",
    fullname: "Edward",
    retailerNumber: "2349090326673",
    token: "756478",
    status: "enable",
    date: "2019-10-11   11:54:01",
  },
  {
    type: "retailer",
    fullname: "Edward",
    retailerNumber: "2349090326673",
    token: "756478",
    status: "enable",
    date: "2019-10-11   11:54:01",
  },
  {
    type: "retailer",
    fullname: "Edward",
    retailerNumber: "2349090326673",
    token: "756478",
    status: "disabled",
    date: "2019-10-11   11:54:01",
  },
  {
    type: "retailer",
    fullname: "Edward",
    retailerNumber: "2349090326673",
    token: "756478",
    status: "enable",
    date: "2019-10-11   11:54:01",
  },
]

export const Columns = [
  {
    title: "Retailer name",
    dataIndex: "name",
    key: "name",

    // render: text => <a>{text}</a>,
  },
  {
    title: "Retailer number",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Wallet balance",
    dataIndex: "balance",
    key: "balance",
  },

  {
    title: "Network",
    dataIndex: "network",
    key: "network",
  },
  {
    title: "Date Created/Time",
    dataIndex: "date",
    key: "date",
  },
]
export const ColumnsTwo = [
  {
    title: "Type",
    dataIndex: "type",
    key: "type",

    // render: text => <a>{text}</a>,
  },
  {
    title: "Full name",
    dataIndex: "fullname",
    key: "fullname",
  },
  {
    title: "Retailer number",
    dataIndex: "retailerNumber",
    key: "retailerNumber",
  },

  {
    title: "Token",
    dataIndex: "token",
    key: "token",

    // align: "right",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",

    render: text =>
      text === "enable" ? (
        <p
          style={{
            color: "#00AA00",
            backgroundColor: "#D8F2DB",
            borderRadius: "3px",
            padding: "2px 13px",
            display: "inline",
            width: "72px !important",
          }}
        >
          <Green
            style={{
              marginRight: "5px",
              position: "relative",
              top: "-2px",
            }}
          />
          {text}
        </p>
      ) : (
        <p
          style={{
            color: "#FF4848",
            backgroundColor: " #FFD8D8",
            borderRadius: "3px",
            padding: "2px 13px",
            display: "inline",
            width: "72px !important",
          }}
        >
          <Red
            style={{
              marginRight: "5px",
              position: "relative",
              top: "-2px",
            }}
          />
          {text}
        </p>
      ),
  },
  {
    title: "Date Created/Time",
    dataIndex: "date",
    key: "date",

    // align: "right",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Popover
        content={
          <div className="pop_content">
            <p onClick={openTokenForm()}>Send Token</p>
            <p>Edit</p>
          </div>
        }
        placement="bottom"
        //  title="Title"
        trigger="click"
      >
        <span
          style={{
            color: "#9A9DB4",
            fontSize: "30px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ...
        </span>
      </Popover>
    ),
  },
]

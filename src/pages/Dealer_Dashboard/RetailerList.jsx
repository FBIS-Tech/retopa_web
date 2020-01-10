import React from "react"
import { Table, Icon, Input, Select, Pagination, Button } from "antd"
import { ColumnsTwo, TableTwo } from "../../components/Constants/Tableone"
import "../../scss/Retailer.scss"

const { Option } = Select

const RetailerList = () => {
  return (
    <div>
      <div
        className="table_container"
        style={TableTwo.length <= 9 ? { height: "100vh" } : { height: "auto" }}
      >
        <div className="table_Group">
          <div className="table_header">
            <div className="rowShow">
              <Button>Fund Wallet</Button>
            </div>
            <div className="searchTable">
              <Input
                placeholder="Search Retailer…"
                prefix={<Icon type="search" style={{ color: "#D8D8D8" }} />}
              />
            </div>
          </div>
          <Table
            columns={ColumnsTwo}
            dataSource={TableTwo}
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
      </div>
    </div>
  )
}

export default RetailerList

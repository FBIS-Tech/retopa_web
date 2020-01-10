import React from "react"
import { Table, Icon, Input, Select, Pagination, Button } from "antd"
import { Columns, TableOne } from "../../components/Constants/Tableone"
import "../../scss/Retailer.scss"

const { Option } = Select

const Retailer = () => {
  return (
    <div>
      <div
        className="table_container"
        style={TableOne.length <= 9 ? { height: "100vh" } : { height: "auto" }}
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
          <Table columns={Columns} dataSource={TableOne} size="small" />
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

export default Retailer

import React from "react"
import { Collapse, Icon } from "antd"
const { Panel } = Collapse

const customPanelStyle = {
  background: "#FFFFFF",
  border: "1px solid #D7E2E4",
  boxSizing: "border-box",
  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.08)",
  borderRadius: "5px",
  marginBottom: "15px",
}
const text = `
 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inidunt ut labore et dolore Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inidunt ut labore et dolore Lorem ipsum dolor sit 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
`

const Accordion = () => {
  return (
    <Collapse
      accordion
      bordered={false}
      defaultActiveKey={["1"]}
      expandIcon={({ isActive }) => (
        <Icon type="down" rotate={isActive ? 0 : -90} />
      )}
      expandIconPosition="right"
    >
      <Panel header="What is Merchant/Dealer?" key="1" style={customPanelStyle}>
        <p>{text}</p>
      </Panel>
      <Panel
        header="How does Merchant/Dealer works?"
        key="2"
        style={customPanelStyle}
      >
        <p>{text}</p>
      </Panel>
      <Panel
        header="How do get started with Merchant/Dealer?"
        key="3"
        style={customPanelStyle}
      >
        <p>{text}</p>
      </Panel>
    </Collapse>
  )
}

export default Accordion

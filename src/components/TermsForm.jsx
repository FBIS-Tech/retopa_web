import React from "react"
import "../scss/LoginCard.scss"
import { Input, Button } from "antd"
const { TextArea } = Input

const TermsForm = () => {
  return (
    <div className="Login_card">
      <div className="content">
        <form>
          <h4 className="form_title">Please send below your request</h4>
          <div className="input input_terms">
            <label>Email</label>
            <Input placeholder="Password" />
          </div>
          <div className="input input_terms">
            <label>Phone number</label>
            <Input placeholder="Password" />
          </div>
          <div className="input input_terms">
            <label>Complaints</label>
            <TextArea rows={4} />
          </div>
          <div class className="form_bottom_terms">
            <Button>Send</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TermsForm

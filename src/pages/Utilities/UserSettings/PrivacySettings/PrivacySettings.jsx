import React from 'react'
import './PrivacySettings.scss'
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const PrivacySettings = () => {
  return (
    <div className="privacy-settings">
      <div className="text-settings">
        <div className="description-setting">
          <span>Set progress charts visible:</span>
        </div>
        <div className="controls-setting">
          <Form.Control
            type="text"
            placeholder="Enter progress charts visible"
          />
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </div>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Set social links visible:</span>
        </div>
        <div className="controls-setting">
          <Form.Control type="text" placeholder="Enter social links visible" />
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </div>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Set contact info visible:</span>
        </div>
        <div className="controls-setting">
          <Form.Control type="text" placeholder="Entercontact info visible" />
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PrivacySettings
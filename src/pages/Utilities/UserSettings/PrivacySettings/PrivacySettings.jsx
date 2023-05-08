import React from 'react'
import './PrivacySettings.scss'
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const PrivacySettings = () => {
  return (
    <div className="privacy-settings">
      <div className="text-settings">
        <div className="description-setting">
          <span>Set time for session expiration:</span>
        </div>
        <div className="controls-setting">
          <Form.Control
            type="text"
            placeholder="Enter new time for session expiration"
          />
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </div>
      </div>
      <div className="ratings">progress charts visible</div>
      <div className="social-links-privacy">social links visible</div>
      <div className="contact-privacy">contact info visible</div>
    </div>
  );
}

export default PrivacySettings
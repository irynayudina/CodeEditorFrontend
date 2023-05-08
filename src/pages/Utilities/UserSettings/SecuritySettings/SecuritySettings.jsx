import React from 'react'
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import  './SecuritySettings.scss'
const SecuritySettings = () => {
  return (
    <div className="security-settings">
      <div className="text-settings">
        <div className="description-setting">
          <span>Login phone:</span>
        </div>
        <div className="controls-setting">
          <Form.Control type="text" placeholder="Enter new login phone" />
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </div>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Login email:</span>
        </div>
        <div className="controls-setting">
          <Form.Control type="text" placeholder="Enter new login email" />
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </div>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Second email:</span>
        </div>
        <div className="controls-setting">
          <Form.Control type="text" placeholder="Enter new second email" />
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </div>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Change password:</span>
        </div>
        <div className="controls-setting">
          <Form.Control type="text" placeholder="Enter new password" />
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </div>
      </div>
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
    </div>
  );
}

export default SecuritySettings
import React from "react";
import "./InfoSettings.scss";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import CropImageForm from "../../../../elements/CroppingImageElement/CpropImageForm";
const InfoSettings = () => {
  return (
    <div className="info-settings">
      <CropImageForm />
      <div className="text-settings">
        <div className="description-setting">
          <span>Username: old_username</span>
        </div>
        <div className="controls-setting">
          <Form.Control type="text" placeholder="Enter new username" />
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </div>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Name: old name</span>
        </div>
        <div className="controls-setting">
          <Form.Control type="text" placeholder="Enter new name" />
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </div>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Public Phone:</span>
        </div>
        <div className="controls-setting">
          <Form.Control type="text" placeholder="Enter new public phone" />
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </div>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Public Email:</span>
        </div>
        <div className="controls-setting">
          <Form.Control type="email" placeholder="Enter new public email" />
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </div>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Social Links:</span>
        </div>
        <div className="controls-setting">
          <Form.Control type="text" placeholder="Enter new social links" />
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoSettings;

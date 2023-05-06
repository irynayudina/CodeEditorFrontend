import React from "react";
import "./InfoSettings.scss";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import CropImageForm from "../../../../elements/CroppingImageElement/CpropImageForm";
const InfoSettings = () => {
  return (
    <div className="info-settings">
      <CropImageForm />
      {/* <div className="picture-setting">
        <div className="picture-editor">
          <div className="side-functions-picture">
            crop button, resize button, reset button
          </div>
          <div className="picture-dispay-edit">
            picture that is being edited
          </div>
        </div>
        <Form.Control type="file" size="sm" />
        <Button variant="primary" size="sm">
          Save changes
        </Button>
      </div> */}
      <div className="username-setting">
        <span className="me-2">Username:</span>
        <Form.Control type="text" placeholder="Enter new username" size="sm" />
        <Button variant="primary" className="mt-2" size="sm">
          Save changes
        </Button>
      </div>
      <div className="name-setting">
        <span className="me-2">Name:</span>
        <Form.Control type="text" placeholder="Enter new name" />
        <Button variant="primary" className="mt-2" size="sm">
          Save changes
        </Button>
      </div>
      <div className="public-phone-setting">
        <span className="me-2">Public Phone:</span>
        <Form.Control type="text" placeholder="Enter new public phone" />
        <Button variant="primary" className="mt-2" size="sm">
          Save changes
        </Button>
      </div>
      <div className="public-email-setting">
        <span className="me-2">Public Email:</span>
        <Form.Control type="email" placeholder="Enter new public email" />
        <Button variant="primary" className="mt-2" size="sm">
          Save changes
        </Button>
      </div>
      <div className="social-links-setting">
        <span className="me-2">Social Links:</span>
        <Form.Control type="text" placeholder="Enter new social links" />
        <Button variant="primary" className="mt-2" size="sm">
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default InfoSettings;

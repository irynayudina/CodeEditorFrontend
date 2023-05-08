import React from 'react'
import { Container, Form, Button } from "react-bootstrap";
import './Register.scss'
const Register = () => {
  return (
    <div>
      <div className="register-form">
        <h5 className='text-center'>Sign Up</h5>
        <Form className='form-content-styled'>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Enter phone number" />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="socialLinks">
            <Form.Label>Social Links</Form.Label>
            <Form.Control type="text" placeholder="Enter social links" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register


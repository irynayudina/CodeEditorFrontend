import React from 'react'
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import './UserPeople.scss'
const UserPeople = () => {
  return (
    <div className="peopleContainer">
      <div className="title-people">
        <h5>People</h5>
      </div>
      <div className="people-topsection">
        <Form.Select
        // value={sortProjects}
        // onChange={(e) => setSortProjects(e.target.value)}
        >
          <option value="0">All</option>
          <option value="1">Following</option>
          <option value="2">Followers</option>
        </Form.Select>
      </div>
    </div>
  );
}

export default UserPeople
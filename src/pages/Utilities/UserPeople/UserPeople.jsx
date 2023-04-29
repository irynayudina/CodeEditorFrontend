import React, {useState} from 'react'
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import './UserPeople.scss'
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BsFillTrashFill,
} from "react-icons/bs";
const UserPeople = () => {
  const [people, setPeople] = useState([
    { name: "person 111111111111", role: "follower" },
    { name: "person 2", role: "follower" },
    { name: "person3", role: "follower" },
    { name: "person4", role: "following" },
    { name: "person5", role: "follower" },
    { name: "person6", role: "following" },
    { name: "person7", role: "follower" },
  ]);
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
      <div className="people-display">
        {people.map((p, i) => (
          <div className="person-item" key={i}>
            <div className="person-info-group">
              <Link to="/editor">
                <div className="person-img"></div>
              </Link>
              <Link to="/editor">
                <div className="person-name">{p.name}</div>
                <Badge bg="secondary">{p.role}</Badge>
              </Link>
            </div>
            <Button variant="outline-danger" size="sm" className="btn-center">
              <BsFillTrashFill />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPeople
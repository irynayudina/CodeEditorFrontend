import React, {useState} from 'react'
import './UserProjects.scss'
import { Container, Row, Col, Form, Badge } from "react-bootstrap";

const UserProjects = () => {
  const [sortProjects, setSortProjects] = useState("0");
  return (
    <div className="projects-container">
      <h5 className="title-projects">Created projects & Collaborations</h5>
      <div className="topsection-projects">
        <Form.Select
          value={sortProjects}
          onChange={(e) => setSortProjects(e.target.value)}
        >
          <option value="0">Trending</option>
          <option value="1">Recent</option>
          <option value="2">Popular</option>
        </Form.Select>
        <div>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Only my prodjects"
          />
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Only collaborations"
          />
        </div>
      </div>
      <div className="projects-display">
        <div className="project-item">
          <p className="project-name">
            Project
          </p>
          <div className="likes">Likes</div>
          <div className="tags">tags</div>
          <div className="dateCreated">19.04.2023</div>
        </div>
        <div className="project-item">Project</div>
        <div className="project-item">Project</div>
        <div className="project-item">Project</div>
        <div className="project-item">Project</div>
        <div className="project-item">Project</div>
        <div className="project-item">Project</div>
        <div className="project-item">Project</div>
      </div>
    </div>
  );
}

export default UserProjects


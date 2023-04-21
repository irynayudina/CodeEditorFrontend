import React, {useState} from 'react'
import './Projects.scss'
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import { languages } from '../Editor/Syntax/EditorData.ts';
import { Button } from "react-bootstrap";
import Topic from '../Challenges/Topics/Topic';

const Projects = () => {
  const [sortProjects, setSortProjects] = useState('0')

  return (
    <div className="projects-container">
      <h5 className="title-projects">Open projects of community</h5>
      <div className="topsection-projects">
        <Form.Select
          value={sortProjects}
          onChange={(e) => setSortProjects(e.target.value)}
        >
          <option value="0">Trending</option>
          <option value="1">Recent</option>
          <option value="2">Popular</option>
        </Form.Select>
        <Form.Control type="text" placeholder="Search" />
        <Button size="md">Search</Button>
      </div>
      <Topic title="Select languages" className="languages-select">
        <div className="languages">
          {Object.keys(languages).map((key) => (
            <Form.Check
              key={key}
              type="checkbox"
              label={languages[key]}
              value={languages[key]}
            />
          ))}
        </div>
      </Topic>
      <div className="projects-display">
        <div className="project-item">
          <p className="project-name">Project</p>
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

export default Projects
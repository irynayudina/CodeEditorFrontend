import React, {useState} from 'react'
import './UserProjects.scss'
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import Project from './Project';
const UserProjects = () => {
  const projects = [
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "999k",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
  ];
  const [sortProjects, setSortProjects] = useState("0");
  const [actionsShow, setActionsShow] = useState(false)
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
            label="Only my prodjects"
          />
          <Form.Check
            type="switch"
            label="Only collaborations"
          />
        </div>
      </div>
      <div className="projects-display">
        {projects.map((project, i) => (
          <Project project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

export default UserProjects


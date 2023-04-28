import React, {useState} from 'react'
import './Projects.scss'
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import { languages } from '../Editor/Syntax/EditorData.ts';
import { Button } from "react-bootstrap";
import Topic from '../Challenges/Topics/Topic';
import Project from '../Project/Project'

const Projects = () => {
   const [projects, setProjects] = useState([
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
   ]);
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
      <div className="projects-display-open">
        {projects.map((project, i) => (
          <Project
            project={project}
            key={i}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects
import React, {useEffect, useState} from 'react'
import './UserProjects.scss'
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import Project from './Project';
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const UserProjects = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id
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
  const [sortProjects, setSortProjects] = useState("1");
  const deleteProjectHandler = (i) => {
    let newList = [...projects];
    newList.splice(i, 1);
    setProjects(newList);
    console.log(projects)
  }
  const loadProjectsList = async () => {
    try {
      const projects = await axios.get(`/api/projects?authorId=${userId}`);
      if (projects?.data) {
        console.log(projects.data);
        toast.success("got projects");
        setProjects(projects.data.projects);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
  }
  useEffect(() => {
    loadProjectsList();
    }, []);
  return (
    <div className="projects-container">
      <h5 className="title-projects">Created projects & Collaborations</h5>
      <div className="topsection-projects">
        <Form.Select
          value={sortProjects}
          onChange={(e) => setSortProjects(e.target.value)}
        >
          <option value="1">Recent</option>
          <option value="2">Popular</option>
        </Form.Select>
        <div>
          <Form.Check type="switch" label="Only my prodjects" />
          <Form.Check type="switch" label="Only collaborations" />
        </div>
      </div>
      <div className="projects-display">
        {projects.map((project, i) => (
          <Project project={project} index={i} key={i} deleteProjectHandler={deleteProjectHandler} />
        ))}
      </div>
    </div>
  );
}

export default UserProjects


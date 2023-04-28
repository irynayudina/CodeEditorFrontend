import React from 'react'
import { Form, Badge } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BsFillGearFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsCodeSlash,
  BsFillHandThumbsUpFill,
  BsClock,
} from "react-icons/bs";
const Project = ({project, index}) => {
  return (
    <div className="project-item" key={index}>
      <div className="open-file-button">
        <Link to="/editor">
          <Button variant="outline-primary" size="sm">
            <BsCodeSlash /> Edit code
          </Button>
        </Link>
      </div>
      <h6 className="project-name">{project.name + index}</h6>
      <div className="project-language">
        <Badge bg="secondary">{project.language}</Badge>
      </div>
      <div className="numbers">
        <div className="likes">
          <BsFillHandThumbsUpFill /> {project.likes}
        </div>
        <div className="text-muted">
          <BsClock /> 1 minute ago
        </div>
      </div>
    </div>
  );
}

export default Project
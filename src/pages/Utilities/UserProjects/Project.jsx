import React from 'react'
import { Form, Badge } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import {
  BsFillGearFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsCodeSlash,
  BsFillHandThumbsUpFill,
  BsClock,
} from "react-icons/bs";
import PopUp from "../../../elements/PopUp/PopUp";
const Project = ({ project, index }) => {
    const handleProjectDelete = () => {
        //here modal
        alert('deleted the project')
    }
    const handleCollaboratorDelete = () => {
      //here modal
      alert("deleted a person from collaboration list. he will no longer have an access to editing the project code");
    };
    const collaborators = [
        'username 1',
        'username collab 2',
        '3rd person'
    ]
  return (
    <PopUp>
      <div className="project-item" key={index}>
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
      <div className="actions">
        <div className="settings-project">
          <BsFillGearFill /> {project.name + index}
        </div>
        <div className="tags">
          <Badge bg="secondary">{project.language}</Badge>
          <div className="dateCreated">created {project.createdAt}</div>
        </div>
        <div className="numbers">
          <div className="likes">
            <BsFillHandThumbsUpFill /> {project.likes}
          </div>
          <div className="text-muted">
            <BsClock /> 1 minute ago
          </div>
        </div>
        <div className="collaborators">
          Collaborations:
          {collaborators.map((person, i) => (
            <div>
              {person}{" "}
              <Button size="sm" variant="outline-dark" onClick={handleCollaboratorDelete}>
                <BsFillTrashFill />
              </Button>
            </div>
          ))}
        </div>
        <Form.Check type="switch" label="make public/private" />
        <div className="rename ">
          <BsPencilSquare />{" "}
          <Form.Control type="text" size="sm" placeholder="Rename" />
        </div>
        <div className="bottom-options">
          <div>
            <Button variant="outline-primary" size="sm">
              <BsCodeSlash /> Edit code
            </Button>
          </div>
          <div>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={handleProjectDelete}
            >
              <BsFillTrashFill /> Delete
            </Button>
          </div>
        </div>
      </div>
    </PopUp>
  );
}

export default Project
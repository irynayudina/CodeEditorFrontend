import React, {useState} from 'react'
import { Form, Badge } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import {
  BsFillGearFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsCodeSlash,
  BsFillHandThumbsUpFill,
  BsClock,
} from "react-icons/bs";
import PopUp from "../../../elements/PopUp/PopUp";
const Project = ({ project, index, deleteProjectHandler }) => {
  const [closePopup, setClosePopup] = useState()
    const handleProjectDelete = async () => {
      let deleteProject = window.confirm('Delete the project?');
      if (deleteProject) {
        setClosePopup("closePopup");
        deleteProjectHandler(index);
      }
    }
  const handleCollaboratorDelete = (i) => {
      console.log(i)
      let deleteCollab = window.confirm(
        "Delete a person from collaboration list? He will no longer have an access to editing the project code"
      );
      if (deleteCollab) {
        let newList = [...collaborators]; 
        newList.splice(i, 1); 
        setCollaborators(newList);
      }
    };
    const [collaborators, setCollaborators] = useState([
      "username 1",
      "username collab 2",
      "3rd person",
    ]);
  return (
    <PopUp className={closePopup}>
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
            <div key={i}>
              {person}{" "}
              <Button
                size="sm"
                variant="outline-dark"
                onClick={() => handleCollaboratorDelete(i)}
              >
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
            <Link to="/editor">
              <Button variant="outline-primary" size="sm">
                <BsCodeSlash /> Edit code
              </Button>
            </Link>
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
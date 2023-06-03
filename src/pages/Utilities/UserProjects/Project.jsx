import React, {useState, useEffect} from 'react'
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

const Project = ({ project, index, deleteProjectHandler, fromPublicPage }) => {

  const [projectDate, setProjectDate] = useState(project.createdAt)
  const [dateUpdateString, setDateUpdateString] = useState("1 minute ago")
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
  
  useEffect(() => {
    const date = new Date(project.createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    setProjectDate(formattedDate);
  }, [project]);

  function calculateTimeDifference() {
    const currentTime = new Date();
    const lastTime = project.updatedAt || project.createdAt;
    const updatedTime = new Date(lastTime);

    const timeDifference = currentTime.getTime() - updatedTime.getTime();
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return minutes + " minutes ago";
    } else if (hours < 24) {
      return hours + " hours ago";
    } else if (days < 7) {
      return days + " days ago";
    } else {
      return updatedTime.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  }

  useEffect(() => {
    const updDate = calculateTimeDifference();
    setDateUpdateString(updDate);
  }, [project]);
  

  
  return (
    <PopUp className={closePopup}>
      <div className="project-item" key={index}>
        <h6 className="project-name">{project.projectName}</h6>
        <div className="project-language">
          <Badge bg="secondary">{project.language}</Badge>
        </div>
        <div className="numbers">
          <div className="likes">
            <BsFillHandThumbsUpFill /> {project.likes}
          </div>
          <div className="text-muted">
            <BsClock /> {dateUpdateString}
          </div>
        </div>
      </div>

      <div className="actions">
        <div className="settings-project">
          <BsFillGearFill />{" "}
          <span className="fw-bold">{project.projectName}</span>
        </div>
        <div className="tags">
          <Badge bg="secondary">{project.language}</Badge>
          <div className="dateCreated">
            <strong>created</strong> {projectDate}
          </div>
        </div>
        <div className="numbers">
          <div className="likes">
            <BsFillHandThumbsUpFill /> {project.likes}
          </div>
          <div className="text-muted">
            <BsClock /> {dateUpdateString}
          </div>
        </div>
        {/* <div className="collaborators">
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
        </div> */}
        {!fromPublicPage ? (
          <>
            <Form.Check type="switch" label="make public" />
            <div className="rename ">
              <BsPencilSquare />{" "}
              <Form.Control type="text" size="sm" placeholder="Rename" />
            </div>
          </>
        ) : (
          ""
        )}
        <div className="bottom-options">
          <div>
            <Link to={`/editor/${project._id}`}>
              <Button variant="outline-primary" size="sm">
                <BsCodeSlash /> {!fromPublicPage ? "Edit" : "View"} code
              </Button>
            </Link>
          </div>
          {!fromPublicPage ? <div>
            <Button
              size="sm"
              variant="outline-danger"
              onClick={handleProjectDelete}
            >
              <BsFillTrashFill /> Delete
            </Button>
          </div> : ""}
        </div>
      </div>
    </PopUp>
  );
}

export default Project
import React, {useState} from 'react'
import './TopNav.scss'
import { Button } from "react-bootstrap";
import PopUp from "../../../elements/PopUp/PopUp";
import { Form, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BsFillGearFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsCodeSlash,
  BsFillHandThumbsUpFill,
  BsClock,
} from "react-icons/bs";
const TopNav = () => {
  const [closePopup, setClosePopup] = useState();
  return (
    <div className="topnav">
      <div className="activeusers">
        <div className="actvusr owner">
          <div className="userpic"></div>
          <p className="username">Owner User</p>
        </div>
        <div className="actvusr">
          <div className="userpic"></div>
          <p className="username">User 1</p>
        </div>
        <div className="actvusr">
          <div className="userpic"></div>
          <p className="username">User 2</p>
        </div>
        <div className="actvusr">
          <div className="userpic"></div>
          <p className="username">User 3</p>
        </div>
      </div>
      <div className="buttons">
        <Button size="sm">Save</Button>
        <Button size="sm" variant="danger">
          Leave
        </Button>
        <PopUp className={closePopup}>
          <Button size="sm" variant="warning">
            Invite
          </Button>
          <div className="invite-popup">
            <h5 className='invite-header'>Invite user to collaboration</h5>
            <Form.Control
              type="text"
              placeholder="username"
              // value={searchText}
              // onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="text-muted">OR</div>
            <Form.Select
            // value={sortChallenges}
            // onChange={(e) => setSortchallenges(e.target.value)}
            >
              <option value="0">User1</option>
              <option value="1">User2</option>
              <option value="2">User3</option>
            </Form.Select>
            <Button
              // variant={`${props.theme === "darktheme" ? "secondary" : "primary"}`}
              size="md"
              // onClick={filterDiscussions}
            >
              Invite
            </Button>
          </div>
        </PopUp>
      </div>
    </div>
  );
}

export default TopNav
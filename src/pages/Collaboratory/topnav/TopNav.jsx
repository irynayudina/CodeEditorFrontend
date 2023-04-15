import React from 'react'
import './TopNav.scss'
import { Button } from "react-bootstrap";
const TopNav = () => {
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
        <Button size='sm' variant="danger">Leave</Button>
        <Button size="sm" variant="warning">Invite</Button>
      </div>
    </div>
  );
}

export default TopNav
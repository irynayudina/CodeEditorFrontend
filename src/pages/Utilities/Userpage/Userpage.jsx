import React from 'react'
import "./Userpage.scss";
import UserInfo from './UserInfo';
import UserProjects from '../UserProjects/UserProjects'
const Userpage = () => {
  return (
    <div className="userpage">
      <div>
        <UserInfo />
        <div className="usernav">
          <div className="user-nav-item">Projects</div>
          <div className="user-nav-item">Challenges</div>
          <div className="user-nav-item">Discussions</div>
          <div className="user-nav-item">Chart</div>
          <div className="user-nav-item"></div>
          <div className="user-nav-item"></div>
          <div className="user-nav-item"></div>
          <div className="user-nav-item"></div>
        </div>
      </div>
      <div className="userpage-content">
        <UserProjects />
      </div>
    </div>
  );
}

export default Userpage




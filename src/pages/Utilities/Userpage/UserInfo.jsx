import React from 'react'
import { BsTrophyFill, BsFillHandThumbsUpFill } from "react-icons/bs";
import {Button} from 'react-bootstrap'
const UserInfo = () => {
  return (
    <div className="userpage-header">
      <div className="circle-img"></div>
      <h5 className="username">User Name</h5>
      <div className="ratings">
        <div className="rating">
          <BsTrophyFill className="type" />
          <div>20</div>
        </div>
        <div className="rating">
          <BsFillHandThumbsUpFill className="amount" />
          <div>30</div>
        </div>
      </div>
      <div className="social">
        <div className="social-item">
          <div>Followers</div> <div>33333</div>
        </div>
        <div className="social-item">
          <div>Following</div> <div>300</div>
        </div>
      </div>
      <Button size="sm" className="follow-btn">
        Follow
      </Button>
      <hr />
      <div className="contacts">
        <div className="contact">
          <span className="title-contact">LinkedIn </span>
          <a href="#">Linl</a>
        </div>{" "}
        <div className="contact">
          <span className="title-contact">GitHub </span>
          <a href="#">Linl</a>
        </div>{" "}
        <div className="contact">
          <span className="title-contact">FaceBook </span>
          <a href="#">Linl</a>
        </div>{" "}
        <div className="contact">
          <span className="title-contact ">Twitter </span>
          <a href="#">Linl</a>
        </div>
        <div className="info">
          <div className="email text-muted">useremail@gmail.com</div>
          <div className="email text-muted">+38**********</div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo
import React from 'react'
import {
  BsTrophyFill,
  BsFillHandThumbsUpFill,
  BsBarChartLineFill,
} from "react-icons/bs";
import { Button } from 'react-bootstrap'
import { useSelector } from "react-redux";

const UserInfo = ({ isPublic }) => {
  const { userInfo } = useSelector((state) => state.auth);
  
  return (
    <div className="userpage-header">
      <div
        className="circle-img"
        style={{
          backgroundImage: `url(${
            userInfo.pic || "blank-profile-picture.png"
          })`,
        }}
      ></div>
      <h5 className="username">{userInfo.name}</h5>
      <p className="text-muted text-center">{userInfo.username}</p>
      <div className="ratings">
        <div className="rating">
          <BsTrophyFill className="type" />
          <div>20</div>
        </div>
        <div className="rating">
          <BsBarChartLineFill className="amount" />
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
      {isPublic ? (
        <Button size="sm" className="follow-btn">
          Follow
        </Button>
      ) : (
        ""
      )}
      <hr />
      <div className="contacts">
        <div className="contact">
          <span className="title-contact">LinkedIn </span>
          <a href={userInfo.socialMedia.linkedin} target="blank">
            {userInfo.socialMedia.linkedin}
          </a>
        </div>{" "}
        <div className="contact">
          <span className="title-contact">GitHub </span>
          <a href={userInfo.socialMedia.github} target="blank">
            {userInfo.socialMedia.github}
          </a>
        </div>{" "}
        <div className="contact">
          <span className="title-contact">FaceBook </span>
          <a href={userInfo.socialMedia.facebook} target="blank">
            {userInfo.socialMedia.facebook}
          </a>
        </div>{" "}
        <div className="contact">
          <span className="title-contact ">Twitter </span>
          <a href={userInfo.socialMedia.twitter} target="blank">
            {userInfo.socialMedia.twitter}
          </a>
        </div>
        <div className="info">
          <div className="email text-muted">{userInfo.publicEmail}</div>
          <div className="email text-muted">{userInfo.publicPhone}</div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo
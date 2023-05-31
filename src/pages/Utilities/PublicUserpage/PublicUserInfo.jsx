import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  BsTrophyFill,
  BsFillHandThumbsUpFill,
  BsBarChartLineFill,
  BsFillPersonPlusFill,
  BsFillPersonDashFill,
} from "react-icons/bs";
import { Button } from "react-bootstrap";

const PublicUserInfo = ({ userId, me }) => {
    const [mainUser, setMainUser] = useState(me);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfoResponse = await axios.get(
          `/api/users/profile?userId=${userId}`
        );
        setUserInfo(userInfoResponse.data);
      } catch (err) {
        toast.error(err?.response?.data?.message || err.error);
      }
    };
    loadUserInfo();
  }, [userId]);
    
    const followUserHandler = async () => {
        if (userInfo?._id) {
            try {
              const response = await axios.post(`/api/users/follow`, {
                userId: userInfo?._id,
              });
                if (response?.data?.updatedUser) {
                    me = response?.data?.updatedUser;
                // setDiscussionData(discussion.data);
                    toast.success("user added to following list");
                    setMainUser(response?.data?.updatedUser);
                    console.log(me?.following.includes(userInfo?._id));
              }
              console.log(response);
            } catch (err) {
              toast.error(err?.response?.data?.message || err.error);
            }
        } else {
            console.log("failed attempt")
        }     
    };
    const unfollowUserHandler = async () => {
      //   axios.post(`/api/users/${userId}/unfollow`);/unfollow
        if (userInfo?._id) {
            try {
              const response = await axios.post(`/api/users/unfollow`, {
                userId: userInfo?._id,
              });
                if (response?.data?.updatedUser) {
                    me = response?.data?.updatedUser;
                // setDiscussionData(discussion.data);
                    toast.success("user removed from following");
                    setMainUser(response?.data?.updatedUser);
                    console.log(me?.following.includes(userInfo?._id));
              }
              console.log(response);
            } catch (err) {
              toast.error(err?.response?.data?.message || err.error);
            }
        } else {
            console.log("failed attempt")
        }     
    };

  return (
    <div>
      <div className="userpage-header">
        <div
          className="circle-img"
          style={{
            backgroundImage: `url(${
              userInfo?.pic || "blank-profile-picture.png"
            })`,
          }}
        ></div>
        <h5 className="username">{userInfo?.name}</h5>
        <p className="text-muted text-center">{userInfo?.username}</p>
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
        {mainUser?.following.includes(userInfo?._id) ? (
          <Button
            size="sm"
            className="follow-btn"
            variant="danger"
            onClick={unfollowUserHandler}
          >
            <BsFillPersonDashFill /> Unfollow
          </Button>
        ) : (
          <Button size="sm" className="follow-btn" onClick={followUserHandler}>
            <BsFillPersonPlusFill /> Follow
          </Button>
        )}
        <hr />
        <div className="contacts">
          <div className="contact">
            <span className="title-contact">LinkedIn </span>
            <a href={userInfo?.socialMedia?.linkedin} target="blank">
              {userInfo?.socialMedia?.linkedin}
            </a>
          </div>{" "}
          <div className="contact">
            <span className="title-contact">GitHub </span>
            <a href={userInfo?.socialMedia?.github} target="blank">
              {userInfo?.socialMedia?.github}
            </a>
          </div>{" "}
          <div className="contact">
            <span className="title-contact">FaceBook </span>
            <a href={userInfo?.socialMedia?.facebook} target="blank">
              {userInfo?.socialMedia?.facebook}
            </a>
          </div>{" "}
          <div className="contact">
            <span className="title-contact ">Twitter </span>
            <a href={userInfo?.socialMedia?.twitter} target="blank">
              {userInfo?.socialMedia?.twitter}
            </a>
          </div>
          <div className="info">
            <div className="email text-muted">{userInfo?.publicEmail}</div>
            <div className="email text-muted">{userInfo?.publicPhone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicUserInfo;
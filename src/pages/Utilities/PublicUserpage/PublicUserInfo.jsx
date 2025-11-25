import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  BsTrophyFill,
  BsBarChartLineFill,
  BsFillPersonPlusFill,
  BsFillPersonDashFill,
} from "react-icons/bs";
import { Button } from "react-bootstrap";
import {
  useGetUserProfileQuery,
  useGetFollowingFollowersQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../../slices/usersApiSlice";

const PublicUserInfo = ({ userId, me }) => {
  const { data: mainUserData, refetch: refetchFollowing } = useGetFollowingFollowersQuery();
  const { data: userInfo, isLoading: isLoadingProfile } = useGetUserProfileQuery(userId);
  const [followUser, { isLoading: isFollowing }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowing }] = useUnfollowUserMutation();
  
  const mainUser = mainUserData || me;
  const isFollowingUser = mainUser?.following?.includes(userInfo?._id);

  const followUserHandler = async () => {
    if (!userInfo?._id) {
      toast.error("User information not available");
      return;
    }
    try {
      const result = await followUser({ userId: userInfo._id }).unwrap();
      if (result?.updatedUser) {
        toast.success("User added to following list");
        refetchFollowing();
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Failed to follow user");
    }
  };

  const unfollowUserHandler = async () => {
    if (!userInfo?._id) {
      toast.error("User information not available");
      return;
    }
    try {
      const result = await unfollowUser({ userId: userInfo._id }).unwrap();
      if (result?.updatedUser) {
        toast.success("User removed from following");
        refetchFollowing();
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Failed to unfollow user");
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
            <div>{userInfo?.followers?.length}</div>
          </div>
          <div className="rating">
            <BsBarChartLineFill className="amount" />
            <div>{userInfo?.following?.length}</div>
          </div>
        </div>
        <div className="social">
          <div className="social-item">
            <div>Followers</div>
          </div>
          <div className="social-item">
            <div>Following</div>
          </div>
        </div>
        {isFollowingUser ? (
          <Button
            size="sm"
            className="follow-btn"
            variant="danger"
            onClick={unfollowUserHandler}
            disabled={isUnfollowing}
          >
            <BsFillPersonDashFill /> {isUnfollowing ? "Unfollowing..." : "Unfollow"}
          </Button>
        ) : (
          <Button 
            size="sm" 
            className="follow-btn" 
            onClick={followUserHandler}
            disabled={isFollowing}
          >
            <BsFillPersonPlusFill /> {isFollowing ? "Following..." : "Follow"}
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

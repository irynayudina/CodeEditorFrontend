import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import {
  BsFillCheckCircleFill,
  BsFillCircleFill,
  BsFillDashCircleFill,
} from "react-icons/bs";
import './UserChallengeList.scss'
const UserChallengeList = ({ challenges }) => {
  return (
    <div className="challenges-user-list">
      {challenges.map((challenge, index) => (
        <div key={index} className={`status-${challenge.status.toLowerCase()}`}>
          <div className="challenge-user-item">
            {/* <div className="challenge-user-item">
              <BsFillCheckCircleFill className="mr-2" />
              {challenge.name}
              {challenge.difficulty}
            </div> */}
            <div className="left">
              <div className="left-top">
                <div className="status-challenge">status</div>
                <div className="challenge-name">challenge name</div>
              </div>
              <div className="left-bottom text-muted">
                <div className="cases-passed">8 of 8</div>
                <div className="points-earned">points earned</div>
                <div className="time-taken">time taken</div>
              </div>
            </div>
            <div className="right">
              <div className="top-right">
                <div>{challenge.difficulty}</div>
                <div>{challenge.topic}</div>
              </div>
              <div className="date-challenge text-muted">date</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserChallengeList
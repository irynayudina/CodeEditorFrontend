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
          <div className="d-flex justify-content-between align-items-center">
            <div className="challenge-user-item">
              <BsFillCheckCircleFill className="mr-2" />
              {challenge.name}
              {challenge.difficulty}
            </div>
            <div>{challenge.difficulty}</div>
            <div>{challenge.topic}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserChallengeList
import React, {useState} from 'react'
import './UserChallenges.scss'
import UserChallengeList from './UserChallengeList/UserChallengeList';
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserChallenges = () => {
  //status - passed, not, failed
  const allChallenges = [
    {
      name: "challenge 1",
      difficulty: "medium",
      topic: "algorithms",
      createdAt: "17.04.2023",
      status: "passed",
      casesPassed: 8,
      casesAll: 8,
      timeTaken: "1min",
      pointsEarned: 10,
    },
    {
      name: "challenge 2",
      difficulty: "medium",
      topic: "algorithms",
      createdAt: "17.04.2023",
      status: "attempted",
      casesPassed: 7,
      casesAll: 8,
      timeTaken: "40s",
      pointsEarned: 3,
    },
    {
      name: "challenge 3",
      difficulty: "medium",
      topic: "algorithms",
      createdAt: "17.04.2023",
      status: "failed",
      casesPassed: 0,
      casesAll: 8,
      timeTaken: "20s",
      pointsEarned: 0,
    },
  ];
  const [challengesShow, setChallengesShow] = useState(allChallenges);
  return (
    <div className="user-challenges">
      <h5 className="user-header-challenges">Challenges</h5>
      <div className="challenges-menu">
        <Form.Select
        // value={sortDiscussions}
        // onChange={(e) => setSortDiscussions(e.target.value)}
        >
          <option value="0">Any difficulty</option>
          <option value="1">Easy</option>
          <option value="2">Medium</option>
          <option value="3">Hard</option>
        </Form.Select>
        <Form.Select
        // value={sortDiscussions}
        // onChange={(e) => setSortDiscussions(e.target.value)}
        >
          <option value="0">Any topic</option>
          <option value="1">Algorithms</option>
          <option value="2">Web</option>
          <option value="3">Custom</option>
        </Form.Select>
        <div className="group-bottom">
          <div className="custom-form-check">
            <Form.Check type="switch" label="Created by me" />
          </div>
          <Link to="/editor">
            <Button variant="primary" size="sm">
              Create new
            </Button>
          </Link>
        </div>
      </div>
      <UserChallengeList challenges={challengesShow} />
    </div>
  );
}

export default UserChallenges
import React, {useState} from 'react'
import './UserChallenges.scss'
import UserChallengeList from './UserChallengeList/UserChallengeList';
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
      <div className="user-header-challenges">
        <h5>All</h5>
      </div>
      <UserChallengeList challenges={challengesShow} />
    </div>
  );
}

export default UserChallenges
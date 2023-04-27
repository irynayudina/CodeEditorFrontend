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
      text: "solve this challenge",
      createdAt: "17.04.2023",
      author: "Code-Network",
      status: "passed",
    },
    {
      name: "challenge 2",
      difficulty: "medium",
      topic: "algorithms",
      text: "solve this challenge",
      createdAt: "17.04.2023",
      author: "Code-Network",
      status: "attempted",
    },
    {
      name: "challenge 3",
      difficulty: "medium",
      topic: "algorithms",
      text: "solve this challenge",
      createdAt: "17.04.2023",
      author: "Code-Network",
      status: "failed",
    },
  ];
  const [challengesShow, setChallengesShow] = useState(allChallenges);
  return (
    <div className="user-challenges">
      <div className="user-header-challenges">All</div>
      <UserChallengeList challenges={challengesShow} />
    </div>
  );
}

export default UserChallenges
import React, {useState} from 'react'
import './UserChallenges.scss'
const UserChallenges = () => {
  const allChallenges = [
    {
      name: "challenge 1",
      difficulty: "medium",
      topic: "algorithms",
      text: "solve this challenge",
      createdAt: "17.04.2023",
      author: "Code-Network",
    },
    {
      name: "challenge 2",
      difficulty: "medium",
      topic: "algorithms",
      text: "solve this challenge",
      createdAt: "17.04.2023",
      author: "Code-Network",
    },
  ];
  const [challengesShow, setChallengesShow] = useState(allChallenges);
  return (
    <div className='user-challenges'>
      <div className="usser-header-challenges">All</div>
      <div className="challenges-user-list">
        {challengesShow.map((challenge, index) => (
          <div className={`challenge-user-item ${challenge.status}`} key={index}>{challenge.name}</div>
        ))}
      </div>
    </div>
  )
}

export default UserChallenges
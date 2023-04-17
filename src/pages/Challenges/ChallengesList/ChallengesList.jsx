import React, { useState } from 'react'
import './ChallengeList.scss'
const ChallengesList = () => {
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
    <div className="challenges-list">
      <p className="challenge-title">Challenges List</p>
      {challengesShow.map((c, index) => (
        <div key={index} className="challenge-item">
          <div className="challenge-topsection">
            <div>
              <p>{c.name}</p>
              <p className="topic-name text-secondary">{c.topic}</p>
            </div>
            <div className="metadata-challenge text-secondary">
              <p>{c.difficulty}</p>
              <p>{c.createdAt}</p>
              <p className="text-wrap">{c.author}</p>
            </div>
          </div>
          <p>{c.text}</p>
        </div>
      ))}
    </div>
  );
}

export default ChallengesList
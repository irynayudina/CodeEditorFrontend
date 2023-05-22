import React, {useEffect} from 'react'
import { Link } from "react-router-dom";
import "./Discussions.scss";
import { Button } from "react-bootstrap";
import { Form, Badge } from "react-bootstrap";
import { BsFillChatLeftFill, BsHandThumbsUpFill } from "react-icons/bs";

const DiscussionDisplay = ({ discussion }) => {
    useEffect(() => {
      const date = new Date(discussion.createdAt);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      discussion.createdAt = formattedDate;
    }, [])
    
  return (
    <Link
      to={{ pathname: "/discussion", state:{discussion}}}
      key={discussion?._id}
      className="text-decoration-none black-link"
    >
      <div className="discussion-item">
        <div className="top-section">
          <h5>{discussion.title}</h5>
          <div className="tags">
            <Badge bg="secondary">{discussion.topic}</Badge>
            {discussion.tags?.map((tag, index) => (
              <Badge bg="secondary" key={index}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <p>{discussion.text}</p>
        <div className="down-section">
          <div className="response-statistics">
            <div className="discussion-likes">
              Likes <BsHandThumbsUpFill /> {discussion.likes || 0}
            </div>
            <div className="discussion-answers">
              Answers <BsFillChatLeftFill /> {discussion.answers?.length || 0}
            </div>
          </div>
          <div className="metadata-discussions text-secondary">
            <p>{discussion.createdAt}</p>
            <p>{discussion.author.name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DiscussionDisplay
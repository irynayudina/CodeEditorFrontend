import React, {useState} from 'react'
import './UserDiscussions.scss'
import { BsFillChatLeftFill, BsHandThumbsUpFill } from "react-icons/bs";
import { Container, Row, Col, Form, Badge } from "react-bootstrap";

const UserDiscussions = () => {
  const discussionsArray = [
    {
      name: "name of discussion or string representing response to which discussion  or user it is",
      likes: 10,
      comments: 10,
      createdAt: "01.05.2023",
      text: "text of a discussion or a comment",
    },
    {
      name: "name of discussion or string representing response to which discussion  or user it is",
      likes: 10,
      comments: 10,
      createdAt: "01.05.2023",
      text: "text of a discussion or a comment",
    },
    {
      name: "name of discussion or string representing response to which discussion  or user it is",
      likes: 10,
      comments: 10,
      createdAt: "01.05.2023",
      text: "text of a discussion or a comment",
    },
  ];
  const [discussions, setDiscussions] = useState(discussionsArray);
  return (
    <div className="class-discussions">
      <h5 className="title">Discussions and Comments</h5>
      <Form.Select 
      // value={sortDiscussions}
      // onChange={(e) => setSortDiscussions(e.target.value)}
      >
        <option value="0">All</option>
        <option value="1">Created discussions</option>
        <option value="2">Comments</option>
      </Form.Select>
      {discussions.map((discussion, index) => (
        <div className="discussion-item" key={index}>
          <div className="topsection">
            <div className="discussion-title">{discussion.name}</div>
            <div className="discussion-date text-muted">
              {discussion.createdAt}
            </div>
          </div>
          <div className="discussion-text">{discussion.text}</div>
          <div className="numbers text-muted">
            <div className="discussion-likes">
              <BsHandThumbsUpFill />
              {discussion.likes}
            </div>
            <div className="discussion-comments">
              <BsFillChatLeftFill />
              {discussion.comments}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserDiscussions
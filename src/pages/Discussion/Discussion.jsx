import React, { useState, useEffect } from "react";
import "./Discussion.scss";
import { Card, Badge, Button, ListGroup } from "react-bootstrap";
import DiscussionSection from "./DiscussionSection";
import {
  BsFillHandThumbsUpFill,
  BsFillChatLeftFill,
} from "react-icons/bs";
import ReplyDiscussion from "./ReplyDiscussion";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../elements/Loader";

const Discussion = ({ discussionId }) => {
  let dataExample = {
    title: "String Reversal",
    author: { name: "John Smith" },
    createdAt: "May 1, 2023",
    text: "Given a string, write a function to reverse it. For example, the input string 'hello' should return 'olleh'.",
    topic: "Challenge",
    tags: ["reverse", "string manipulation"],
    comments: [
      {
        author: "John",
        date: "2022-03-15",
        likes: 10,
        text: "Reversing a string in JavaScript is easy. You can use the built-in `split`, `reverse`, and `join` methods like this: ",
        answers: [
          {
            author: "Jane",
            date: "2022-03-16",
            likes: 3,
            text: "You can also use a `for` loop to iterate over the string characters and build a new reversed string.",
          },
          {
            author: "Bob",
            date: "2022-03-17",
            likes: 3,
            text: "Another option is to use the `reduce` method to create a new string by appending each character from the original string in reverse order.",
          },
          {
            author: "Alice",
            date: "2022-03-18",
            likes: 3,
            text: "Don't forget about the `substring` method, which can also be used to reverse a string in JavaScript.",
          },
        ],
      },
      {
        author: "Sarah",
        date: "2022-03-20",
        likes: 6,
        text: "In C++, you can reverse a string using the `reverse` method from the `algorithm` library like this: ",
        answers: [
          {
            author: "Tom",
            date: "2022-03-21",
            text: "You can also use a `for` loop to swap characters in the string from the beginning and end, until you reach the middle.",
          },
          {
            author: "Karen",
            date: "2022-03-22",
            likes: 2,
            text: "Another option is to create a new string and copy the characters from the original string in reverse order using a `for` loop.",
          },
          {
            author: "David",
            date: "2022-03-23",
            likes: 1,
            text: "Don't forget about the `rbegin` and `rend` methods from the `std::string` class, which allow you to iterate over a string in reverse order.",
          },
        ],
      },
      {
        author: "Mark",
        date: "2022-03-25",
        likes: 8,
        text: "In C#, you can reverse a string using the `Reverse` method from the `System.Linq` namespace like this: ",
        answers: [
          {
            author: "Lisa",
            date: "2022-03-26",
            likes: 0,
            text: "You can also use a `for` loop to swap characters in the string from the beginning and end, until you reach the middle.",
          },
          {
            author: "Mike",
            date: "2022-03-27",
            likes: 2,
            text: "Another option is to create a new string and copy the characters from the original string in reverse order using a `for` loop.",
          },
          {
            author: "Emily",
            date: "2022-03-28",
            likes: 1,
            text: "Don't forget about the `Substring` method, which can also be used to reverse a string in C#.",
          },
        ],
      },
    ],
    likes: 10,
  };
  const [data, setData] = useState(dataExample)
  const location = useLocation();
  const { state } = location;

  const handleDiscussionLoad = async () => {
    try {
      const discussion = await axios.get("/api/discussions", {
        discussionID: discussionId,
      });
      if (discussion?.data) {
        setData(discussion.data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
  };
  
  useEffect(() => {
    if (!state) {
      handleDiscussionLoad();
    } else {
      setData(state);
    }
    const date = new Date(data.createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const dataCopy = { ...data };
    dataCopy.createdAt = formattedDate;
    setData(dataCopy);
  }, [location, state, discussionId]);

  const [expandedComments, setExpandedComments] = useState(true);
  const [showReplyFormDiscussion, setShowReplyFormDiscussion] = useState(false);
  return (
    <div className="discussion-page">
      <div className="discussion-header">
        <h4 className="d-flex justify-content-between align-items-center flex-wrap">
          <div>{data?.title} </div>
          <small>
            <Badge bg="secondary" className="float-right mt-2">
              {data?.topic} {" discussion"}
            </Badge>
          </small>
        </h4>
        {data?.tags?.map((tag, index) => (
          <Badge variant="success" key={index}>
            {tag}
          </Badge>
        ))}
      </div>
      <Card>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            {data?.author?.name} • {data?.createdAt}
          </Card.Subtitle>
          <Card.Text>{data?.text}</Card.Text>
        </Card.Body>
        <Card.Footer className="gap-3">
          <Card.Subtitle className="discussion-footer">
            <div className="d-flex align-items-center">
              {" "}
              <BsFillHandThumbsUpFill /> {data?.likes}
            </div>
            <div onClick={() => setExpandedComments(!expandedComments)}>
              <BsFillChatLeftFill /> {data?.comments?.length}
            </div>
            <div
              className="reply-button"
              onClick={() => setShowReplyFormDiscussion((value) => !value)}
            >
              reply
            </div>
          </Card.Subtitle>
          <Card.Subtitle className="d-flex align-items-center"></Card.Subtitle>
        </Card.Footer>
      </Card>
      {showReplyFormDiscussion ? <ReplyDiscussion /> : ""}
      <div className="comment-section">
        {expandedComments
          ? data?.comments?.map((c, i) => <DiscussionSection c={c} key={i} />)
          : ""}
      </div>
    </div>
  );
};

export default Discussion;

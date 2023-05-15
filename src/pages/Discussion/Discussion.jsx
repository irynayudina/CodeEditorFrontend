import React, {useState} from 'react'
import './Discussion.scss'
import { Card, Badge, Button, ListGroup } from "react-bootstrap";
import DiscussionSection from './DiscussionSection';
import {
  BsFillGearFill,
  BsFillTrashFill,
  BsPencilSquare,
  BsCodeSlash,
  BsFillHandThumbsUpFill,
  BsClock,
  BsFillChatLeftFill,
} from "react-icons/bs";
const Discussion = ({  }) => {
  const data = {
    name: "String Reversal",
    author: "John Smith",
    creationDate: "May 1, 2023",
    description:
      "Given a string, write a function to reverse it. For example, the input string 'hello' should return 'olleh'.",
    topic: "Challenge",
    tags: ["reverse", "string manipulation"],
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
    likes: 10,
  };
  const comments = [
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
    ];
  const [expandedComments, setExpandedComments] = useState(true);
  return (
    <Card>
      <Card.Header>
        <h3 className="d-flex justify-content-between align-items-start flex-wrap">
          <div>{data.name} </div>
          <Badge bg="secondary" className="float-right mt-2">
            {data.topic} {" discussion"}
          </Badge>
        </h3>
        {data.tags.map((tag, index) => (
          <Badge variant="success" key={index}>
            {tag}
          </Badge>
        ))}
      </Card.Header>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          {data.author} • {data.creationDate}
        </Card.Subtitle>
        <Card.Text>{data.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="gap-3">
        <Card.Subtitle className="d-flex align-items-center justify-content-around">
          <div className="d-flex align-items-center">
            {" "}
            <BsFillHandThumbsUpFill /> {data.likes}
          </div>
          <div onClick={() => setExpandedComments(!expandedComments)}>
            <BsFillChatLeftFill /> {data.answers.length}
          </div>
        </Card.Subtitle>
        <Card.Subtitle className="d-flex align-items-center"></Card.Subtitle>
      </Card.Footer>
      {/* {expandedComments ?  : ""} */}
      {expandedComments
        ? comments.map((c, i) => <DiscussionSection c={c} key={i} />)
        : ""}
    </Card>
  );
}

export default Discussion
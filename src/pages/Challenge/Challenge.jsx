import React, { useState } from "react";
import './Challenge.scss'
import ResizingWrapper from "./ResizingWrapper";
import { Card, Badge, Button, ListGroup } from "react-bootstrap";
const Challenge = () => {
  const data = {
    name: "String Reversal",
    difficulty: "Easy",
    author: "John Smith",
    creationDate: "May 1, 2023",
    description:
      "Given a string, write a function to reverse it. For example, the input string 'hello' should return 'olleh'.",
    topic: "Strings",
    tags: ["reverse", "string manipulation"],
    examples: [
      { input: "hello", output: "olleh" },
      { input: "coding is fun", output: "nuf si gnidoc" },
      { input: "", output: "" },
    ],
    points: 10,
    discussionCount: 5,
  };

  return (
    <ResizingWrapper>
      <div>
        <Card>
          <Card.Header>
            <h3>{data.name}</h3>
            <Badge variant="success">{data.difficulty}</Badge>
          </Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              {data.author} • {data.creationDate}
            </Card.Subtitle>
            <Card.Text>{data.description}</Card.Text>
            <Card.Subtitle className="mb-2">Topic: {data.topic}</Card.Subtitle>
            <Card.Subtitle className="mb-2">Tags:</Card.Subtitle>
            <ListGroup horizontal>
              {data.tags.map((tag, index) => (
                <ListGroup.Item key={index}>{tag}</ListGroup.Item>
              ))}
            </ListGroup>
            <hr />
            <Card.Title>Examples:</Card.Title>
            {data.examples.map((example, index) => (
              <div key={index}>
                <h5>Example {index + 1}:</h5>
                <Card.Text>
                  Input: {example.input}
                  <br />
                  Expected output: {example.output}
                </Card.Text>
              </div>
            ))}
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Points: {data.points} • Discussion: {data.discussionCount}
            </small>
            <Button variant="primary">Start Challenge</Button>
          </Card.Footer>
        </Card>
      </div>
      <div>Code Editor</div>
      <div>Test Cases</div>
    </ResizingWrapper>
  );
};

export default Challenge;


import React, { useState, useEffect } from "react";
import './Challenge.scss'
import ResizingWrapper from "./ResizingWrapper";
import { Card, Badge, Button, ListGroup } from "react-bootstrap";
import {Container, Col, Row } from "react-bootstrap";
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
    <div>
      <ResizingWrapper>
        <div>
          <Card>
            <Card.Header>
              <h3 className="d-flex justify-content-between align-items-start">
                <div>{data.name} </div>
                <Badge bg="secondary" className="float-right">
                  0:51
                </Badge>
              </h3>
              <Badge variant="success">{data.difficulty}</Badge>
            </Card.Header>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                {data.author} • {data.creationDate}
              </Card.Subtitle>
              <Card.Text>{data.description}</Card.Text>
              <Card.Subtitle className="mb-2">
                Topic: {data.topic}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2">Tags:</Card.Subtitle>
              <ListGroup horizontal>
                {data.tags.map((tag, index) => (
                  <ListGroup.Item size="sm" key={index}>
                    {tag}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <hr />
              <Card.Title className="text-center">Test examples</Card.Title>
              {data.examples.map((example, index) => (
                <div key={index}>
                  <h5>example {index + 1}:</h5>
                  <Card.Text>
                    Input: {example.input}
                    <br />
                    Expected output: {example.output}
                  </Card.Text>
                </div>
              ))}
            </Card.Body>
            <Card.Footer className="gap-3">
              <small className="text-muted">
                Points: 0/{data.points} • Discussion: {data.discussionCount}{" "}
              </small>
              <Button variant="primary" size="sm">
                Start Challenge
              </Button>
            </Card.Footer>
          </Card>
        </div>
        <div>Code Editor</div>
        <div>
          <Card>
            {/* <Card.Body> */}
            <ListGroup as="ol" numbered>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Cras justo odio
                </div>
                <Badge bg="primary" pill>
                  10
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Cras justo odio
                </div>
                <Badge bg="primary" pill>
                  10
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Subheading</div>
                  Cras justo odio
                </div>
                <Badge bg="primary" pill>
                  10
                </Badge>
              </ListGroup.Item>
            </ListGroup>
            {/* </Card.Body> */}
          </Card>
        </div>
      </ResizingWrapper>
    </div>
  );
};

export default Challenge;


import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";

const CreateDiscussionForm = () => {
  // State for form input values
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);

  // Options for topic select input
  const topicOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  // Function to handle tag input change
  const handleTagInputChange = (e) => {
    // Load dynamic tags here based on user input
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data here
  };

  return (
    <div>
        <h5>Create a new discussion</h5>
      <Form onSubmit={handleSubmit} className="form-discussion-create">
        <Form.Group controlId="formTopic">
          <Form.Label>Select Topic</Form.Label>
          <Form.Control
            as="select"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="">Select Topic</option>
            {topicOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formTags">
          <Form.Label>Tags</Form.Label>
          <Col>
            <Form.Check type="checkbox" label="Tag 1" />
            <Form.Check type="checkbox" label="Tag 2" />
            <Form.Check type="checkbox" label="Tag 3" />
            {/* Dynamically loaded tags based on user input */}
          </Col>
          <Form.Control
            type="text"
            placeholder="Enter tag name"
            onChange={handleTagInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Discussion
        </Button>
      </Form>
    </div>
  );
};

export default CreateDiscussionForm;

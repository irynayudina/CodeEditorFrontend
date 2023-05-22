import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../elements/Loader";

const ReplyDiscussion = () => {
    const [commentText, setCommentText] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      // Send the comment to the server or perform any desired action
      console.log("Comment:", commentText);
      // Reset the input field
      setCommentText("");
    };
  return (
    <div className='reply-form'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="commentText">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write your reply..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" size='md'>
          Reply
        </Button>
      </Form>
    </div>
  );
}

export default ReplyDiscussion;
import React, {useState, useEffect} from 'react'
import './UserDiscussions.scss'
import { Form } from "react-bootstrap";
import InfiniteLoaderForUserDiscussions from '../../../elements/InfiniteLoader/InfiniteLoaderForUserDiscussions';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InfiniteLoaderForUserComments from '../../../elements/InfiniteLoader/InfiniteLoaderForUserComments';

const UserDiscussions = () => {
  const [discussions, setDiscussions] = useState();
  const { userInfo } = useSelector((state) => state.auth);
  const { id: viewedUserId } = useParams();
  const userId = viewedUserId || userInfo._id;
  const [filterObj, setFilterObj] = useState({ authorId: userId });
  const [selectedType, setSelectedType] = useState("discussions");
  
  return (
    <div className="class-discussions">
      <h5 className="title">Discussions and Comments</h5>
      <Form.Select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="discussions">Created discussions</option>
        <option value="comments">Comments</option>
      </Form.Select>
      {selectedType === "discussions" ? (
        <InfiniteLoaderForUserDiscussions filerObj={filterObj} />
      ) : (
        <InfiniteLoaderForUserComments filerObj={filterObj} />
      )}
    </div>
  );
}

export default UserDiscussions
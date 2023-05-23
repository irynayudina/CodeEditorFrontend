import React, {useState, useEffect} from 'react'
import {
  BsFillHandThumbsUpFill,
  BsClock,
  BsFillChatLeftFill,
} from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../elements/Loader";
const DiscussionSection = ({ comment, i }) => {
  const [c, setC] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const loadComment = async () => {
      console.log(comment);
      try {
        const commentData = await axios.get(
          `/api/comments/id?commentId=${comment}`
        );
        let resData = commentData?.data?.comment;
        const date = new Date(resData?.createdAt);
        const formattedDate = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        resData.createdAt = formattedDate;
        setC(resData);
        console.log(commentData);
      } catch (err) {
        toast.error(err?.response?.data?.message || err.error);
      } finally {
      }
    };

    loadComment();
  }, []); // Empty dependency array ensures the function is called only once 

  const [showReply, setShowReply] = useState(false);
  return (
    <div key={i} className="challenge-comment-container mb-3">
      {isLoading && <Loader />}
      <div className="top d-flex justify-content-between mb-1">
        <div>{c?.author?.name}</div>
        <div>{c?.createdAt}</div>
      </div>
      <div className="mb-1">{c?.text}</div>
      <div className="bottom d-flex gap-3">
        <div onClick={() => setShowReply(!showReply)} className="show-reply">
          <BsFillChatLeftFill /> {c?.answers?.length}
        </div>
        <div className="d-flex align-items-center">
          <BsFillHandThumbsUpFill />
          {c?.likes}
        </div>
      </div>
      <div>
        {showReply
          ? c?.answers?.map((reply, j) => (
              <div key={j} className="challenge-reply-container mb-3">
                <div className="top d-flex justify-content-between mb-1">
                  <div>{reply?.author}</div>
                  <div>{reply?.createdAt}</div>
                </div>
                <div className="mb-1">{reply?.text}</div>
                <div className="d-flex align-items-center">
                  <BsFillHandThumbsUpFill />
                  {reply?.likes}
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default DiscussionSection
import React, {useState, useEffect} from 'react'
import {
  BsFillHandThumbsUpFill,
  BsFillChatLeftFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import Loader from "../../elements/Loader";
const DiscussionSection = ({ comment, commentData }) => {
  const [c, setC] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    let resData = commentData;
    const date = new Date(resData?.createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    resData.createdAt = formattedDate;
    setC(resData);
  }, [commentData]);

  const [showReply, setShowReply] = useState(false);
  return (
    <div className="challenge-comment-container mb-3">
      {isLoading && <Loader />}
      <div className="top d-flex justify-content-between mb-1">
        <Link
          to={`/public/user/${c?.author?._id}`}
          state={{ userId: c?.author?._id }}
          key={c?.author?._id}
          className="text-decoration-none black-link"
        >
          <div>{c?.author?.name}</div>
        </Link>
        <div>{c?.createdAt}</div>
      </div>
      <div className="mb-1">{c?.text}</div>
      <div className="bottom d-flex gap-3">
        <div onClick={() => setShowReply(!showReply)} className="show-reply">
          <BsFillChatLeftFill /> {c?.answers?.length}
        </div>
        <div className="d-flex align-items-center">
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
};

export default DiscussionSection
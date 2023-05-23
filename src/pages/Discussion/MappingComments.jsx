import React, {useState} from "react";
import DiscussionSection from "./DiscussionSection";

const MappingComments = ({ data}) => {
  return (
    <div>
      {data?.comments?.map((c, i) => (
        <DiscussionSection comment={c} key={c} />
      ))}
    </div>
  );
};

export default MappingComments;

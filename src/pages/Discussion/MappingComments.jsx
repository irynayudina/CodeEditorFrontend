import React, {useState} from "react";
import DiscussionSection from "./DiscussionSection";

const MappingComments = ({ data, reload }) => {
    // const [reloadArr, setReloadArr] = useState(reload);
    // let reloadArr = (reload?.reverse());
    // reloadArr.sort((a, b) => a - b);
    // const arr = ['a', 'b','c']
    const reloadArr = reload
      .slice(0)
      .reverse()
      .map((element) => {
        return element;
      });
  return (
    <div>
      {reloadArr?.map((c, i) => (
        <DiscussionSection comment={c} key={c} />
        //   <p>{ c}</p>
      ))}
          <p>"real</p>
      {data?.comments?.map((c, i) => (
        <DiscussionSection comment={c} key={c} />
      ))}
    </div>
  );
};

export default MappingComments;

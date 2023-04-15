import React, { useState, useRef, useEffect } from "react";
import "./Collaboratory.scss";
import TopNav from "./topnav/TopNav";
import ResizePannelCollab from "./resizePannelsCollab/ResizePannelCollab";
import CodeEditor from "./CollaborationEditor/CodeEditor";
import CodeOutput from "./CollaborationEditor/CodeOutput";
const Collaboratory = () => {
  const [newLinesFromUsers, setNewLinesFromUsers] = useState([]);

  return (
    <div className="collaboratory">
      <TopNav />
      <ResizePannelCollab>
        <CodeEditor theme="lighttheme" />
        <CodeOutput theme="lighttheme" />
      </ResizePannelCollab>
    </div>
  );
};

export default Collaboratory;

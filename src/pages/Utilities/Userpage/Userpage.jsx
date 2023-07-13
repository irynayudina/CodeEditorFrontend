import React, {useState, useEffect, useRef} from 'react'
import "./Userpage.scss";
import UserInfo from './UserInfo';
import UserNav from "./UserNav";
import UserProjects from '../UserProjects/UserProjects'
import UserSettings from "../UserSettings/UserSettings";
import UserPeople from "../UserPeople/UserPeople";
import UserDiscussions from "../UserDiscussions/UserDiscussions";
const Userpage = () => {
  const [subpage, setSubpage] = useState();
  const [pageContent, setPageContent] = useState();
  
  useEffect(() => {
    switch (subpage) {
      case "#projects":
        setPageContent(<UserProjects />);
        break;
      case "#discussions":
        setPageContent(<UserDiscussions />);
        break;
      case "#people":
        setPageContent(<UserPeople />);
        break;
      case "#settings":
        setPageContent(<UserSettings />);
        break;
    }
  }, [subpage]);
  return (
    <div className="userpage">
      <div>
        <UserInfo />
        <UserNav subpage={subpage} setSubpage={setSubpage} />
      </div>
      <div className="userpage-content" >
        {pageContent}
      </div>
    </div>
  );
}

export default Userpage




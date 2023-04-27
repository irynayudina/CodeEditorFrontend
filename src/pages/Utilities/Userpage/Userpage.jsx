import React, {useState, useEffect} from 'react'
import "./Userpage.scss";
import UserInfo from './UserInfo';
import UserNav from "./UserNav";
import UserProjects from '../UserProjects/UserProjects'
import UserNotifications from "../UserNotifications/UserNotifications";
import UserSettings from "../UserSettings/UserSettings";
import UserCharts from "../UserCharts/UserCharts";
import UserPeople from "../UserPeople/UserPeople";
import UserChallenges from "../UserChallenges/UserChallenges";
import UserDiscussions from "../UserDiscussions/UserDiscussions";
const Userpage = () => {
  const [subpage, setSubpage] = useState();
  const [pageContent, setPageContent] = useState();
  useEffect(() => {
    switch (subpage) {
      case "#projects":
        setPageContent(<UserProjects />);
        break;
      case "#challenges":
        setPageContent(<UserChallenges />);
        break;
      case "#discussions":
        setPageContent(<UserDiscussions />);
        break;
      case "#charts":
        setPageContent(<UserCharts />);
        break;
      case "#notifications":
        setPageContent(<UserNotifications />);
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
      <div className="userpage-content">{pageContent}</div>
    </div>
  );
}

export default Userpage




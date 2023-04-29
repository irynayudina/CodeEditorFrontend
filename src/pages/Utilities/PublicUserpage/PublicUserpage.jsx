import React, {useState, useEffect} from 'react'
import UserInfo from '../Userpage/UserInfo'
import UserNav from '../Userpage/UserNav';
import UserCharts from '../UserCharts/UserCharts';
import UserProjects from '../UserProjects/UserProjects';
import UserPeople from '../UserPeople/UserPeople';
import UserDiscussions from '../UserDiscussions/UserDiscussions';
import './PublicUserpage.scss';
const PublicUserpage = () => {
    const [subpage, setSubpage] = useState();
    const [pageContent, setPageContent] = useState();
    useEffect(() => {
      switch (subpage) {
        case "#projects":
          setPageContent(<UserProjects />);
          break;
        case "#charts":
          setPageContent(<UserCharts />);
          break;
        case "#people":
          setPageContent(<UserPeople />);
          break;
        case "#discussions":
          setPageContent(<UserDiscussions />);
          break;
      }
    }, [subpage]);
  return (
    <div className="public-userpage">
      <div>
        <UserInfo isPublic={true} />
        <UserNav subpage={subpage} setSubpage={setSubpage} isPublic={true} />
      </div>
      <div className="userpage-content">{pageContent}</div>
    </div>
  );
}

export default PublicUserpage
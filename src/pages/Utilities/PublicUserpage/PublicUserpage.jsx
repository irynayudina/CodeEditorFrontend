import React, {useState, useEffect} from 'react'
import UserNav from '../Userpage/UserNav';
import UserCharts from '../UserCharts/UserCharts';
import UserProjects from '../UserProjects/UserProjects';
import UserPeople from '../UserPeople/UserPeople';
import UserDiscussions from '../UserDiscussions/UserDiscussions';
import { useLocation } from "react-router-dom";
import PublicUserInfo from './PublicUserInfo';
import './PublicUserpage.scss';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'

const PublicUserpage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [actingUser, setActingUser] = useState(userInfo);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
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
  useEffect(() => {
    if (state?.userId == userInfo?._id) {
      navigate("/user");
    }
  }, [state])
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfoResponse = await axios.get(
          `/api/users/profile?userId=${userInfo?._id}`
        );
        console.log(userInfoResponse.data);
        setActingUser(userInfoResponse.data);
      } catch (err) {
        toast.error(err?.response?.data?.message || err.error);
      }
    };
    loadUserInfo();
  }, []);
  
  return (
    <div className="public-userpage">
      <div>
        <PublicUserInfo userId={state?.userId} me={actingUser} />
        {/* <UserNav subpage={subpage} setSubpage={setSubpage} isPublic={true} /> */}
      </div>
      <div className="userpage-content">{pageContent}</div>
    </div>
  );
}

export default PublicUserpage
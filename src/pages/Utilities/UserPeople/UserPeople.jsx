import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import "./UserPeople.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";


const UserPeople = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: viewedUserId } = useParams();
  const userId = viewedUserId || userInfo._id;
  const [fromPublicPage, setFromPublicPage] = useState(viewedUserId);
  const peopleArray = [
    { name: "person 11111111111111111111 222222222", role: ["follower"] },
    { name: "person 2", role: ["follower", "following"] },
    { name: "person3", role: ["follower"] },
    { name: "person4", role: ["following"] },
    { name: "person5", role: ["follower"] },
    { name: "person6", role: ["following"] },
    { name: "person7", role: ["follower"] },
  ];
  const [people, setPeople] = useState(peopleArray);
  const [filterParam, setFilter] = useState("0");
  const deletePersonHandler = (i) => {
    let newList = [...people];
    newList.splice(i, 1);
    setPeople(newList);
    console.log(people);
  };
  const sortPeople = () => {
    let filtered = peopleArray;

    if (filterParam !== "0") {
      filtered = filtered.filter((person) => person.role === filterParam);
    }
    setPeople(filtered);
  };
  React.useEffect(() => {
    sortPeople();
  }, [filterParam]);
  const loadPeopleOfUSer = async () => {
    //people followed by user - user's following
    //people following user - user's followers
    // /users/people?user_id=64675225f2c93ca7aae57562
    try {
      const responsePeople = await axios.get(
        `/api//users/people?user_id=${userId}`
      );
      setPeople(responsePeople?.data);
      // console.log(responsePeople?.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    loadPeopleOfUSer();
  }, []);

  return (
    <div className="peopleContainer">
      <div className="title-people">
        <h5>People</h5>
      </div>
      <div className="people-topsection">
        <Form.Select
          value={filterParam}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="0">All</option>
          <option value="following">Following</option>
          <option value="follower">Followers</option>
        </Form.Select>
      </div>
      <div className="people-display">
        {people.map((p, i) => (
          <div className="person-item" key={i}>
            <div className="person-info-group">
              <Link
                to={`/public/user/${p?.userID}#projects`}
                // state={{ userId: data?.author?._id }}
                // key={data?.author?._id}
                className="text-decoration-none black-link"
              >
                <div className="person-img"></div>
              </Link>
              <Link
                to={`/public/user/${p?.userID}#projects`}
                // state={{ userId: data?.author?._id }}
                // key={data?.author?._id}
                className="text-decoration-none black-link"
              >
                <div className="person-name">{p.name}</div>
                {p.role.map((r) => (
                  <Badge bg="secondary" className="bage-role" key={r}>
                    {r}
                  </Badge>
                ))}
              </Link>
            </div>
            {!fromPublicPage ?
              <Button
                variant="outline-danger"
                size="sm"
                className="btn-center"
                onClick={() => deletePersonHandler(i)}
              >
                <BsFillTrashFill />
              </Button> : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPeople;

import React, {useState} from 'react'
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import './UserPeople.scss'
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BsFillTrashFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";

const UserPeople = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // userInfo has following followers - arrays of User ObjectId type fields
  // for following: peopleArray push ( {name, _id, role: 'following'} where name and _id fields of User found by the id specified in elements of following array
  // same for followers
  const peopleArray = [
    { name: "person 11111111111111111111 222222222", role: "follower" },
    { name: "person 2", role: "follower" },
    { name: "person3", role: "follower" },
    { name: "person4", role: "following" },
    { name: "person5", role: "follower" },
    { name: "person6", role: "following" },
    { name: "person7", role: "follower" },
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
        following:
        {userInfo?.following?.map((f, i) => (
          <div key={i}>{f}</div>
        ))}
        followers:
        {userInfo?.followers?.map((f, i) => (
          <div key={i}>{f}</div>
        ))}
        {people.map((p, i) => (
          <div className="person-item" key={i}>
            <div className="person-info-group">
              <Link to="/public/user#charts">
                <div className="person-img"></div>
              </Link>
              <Link to="/public/user#charts">
                <div className="person-name">{p.name}</div>
                <Badge bg="secondary" className="bage-role">
                  {p.role}
                </Badge>
              </Link>
            </div>
            <Button
              variant="outline-danger"
              size="sm"
              className="btn-center"
              onClick={() => deletePersonHandler(i)}
            >
              <BsFillTrashFill />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPeople
import React, {useState} from 'react'
import './Challenges.scss'
import { Container, Row, Col, Form } from "react-bootstrap";
import Difficulty from './Difficulty/Difficulty';
import Topics from './Topics/Topics';

const Challenges = (props) => {
  const [difficultyLevelsSelected, setDifficultyLevelsSelected] = useState([]);
  const [topicsSelected, setTopicsSelected] = useState([]);
 
  return (
    <div>
      <Container fluid className="challenges-container">
        <Row>
          <Col sm={4} md={3} lg={3} xl={3} xxl={3} className="challenges-left">
            <Difficulty
              difficultyLevelsSelected={difficultyLevelsSelected}
              setDifficultyLevelsSelected={setDifficultyLevelsSelected}
            />
            <Topics topicsSelected={topicsSelected} setTopicsSelected={setTopicsSelected} />
          </Col>
          <Col sm={4} md={6} lg={6} xl={6} xxl={6} className="challenges-center">
            <div className="challenges-list">Challenges List</div>
          </Col>
          <Col sm={4} md={3} lg={3} xl={3} xxl={3} className="challenges-right">
            <div className="challenges-top-users">Top Users</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Challenges
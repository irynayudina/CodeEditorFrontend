import React, {useState} from 'react'
import './Challenges.scss'
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaStar, FaCircle, FaSquare, FaExclamationTriangle } from "react-icons/fa";
const Challenges = (props) => {
  const [difficultyLevelsSelected, setDifficultyLevelsSelected] = useState([]);
  const handleDifficultyLevelChange = (level) => {
    if (difficultyLevelsSelected.includes(level)) {
      setDifficultyLevelsSelected(
        difficultyLevelsSelected.filter((l) => l !== level)
      );
    } else {
      setDifficultyLevelsSelected([...difficultyLevelsSelected, level]);
    }
  };
  const renderDifficultyLevel = (level) => {
    const isSelected = difficultyLevelsSelected.includes(level);
    return (
      <Form.Check
        type="checkbox"
        id={`difficulty-${level}`}
        key={level}
        label={
          <>
            {level === "easy" && <FaStar />}
            {level === "medium" && (
              <>
                <FaStar />
                <FaStar />
              </>
            )}
            {level === "hard" && (
              <>
                <FaStar />
                <FaStar />
                <FaStar />
              </>
            )}
            <span className="label">{" "+level}</span>
          </>
        }
        checked={isSelected}
        onChange={() => handleDifficultyLevelChange(level)}
      />
    );
  };
  return (
    <div>
      <Container fluid className="challenges-container">
        <Row>
          <Col sm={4} md={3} lg={3} xl={3} xxl={3} className="challenges-left">
            <div className="challenges-difficulty">
              Difficulty Level
              <div className="difficulty-levels">
                {renderDifficultyLevel("easy")}
                {renderDifficultyLevel("medium")}
                {renderDifficultyLevel("hard")}
              </div>
            </div>
            <div className="challenges-topics">
              <p>Challenge Topics</p>
              <p>Algorithms and Data Structures</p>
              <p>Web Developmen</p>
              <p>Competitive Programming</p>
            </div>
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
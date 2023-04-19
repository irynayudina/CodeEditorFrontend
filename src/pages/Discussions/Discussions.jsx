import React, {useState} from 'react'
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import './Discussions.scss'
import { Button } from "react-bootstrap";
import { BsFillChatLeftFill, BsHandThumbsUpFill } from "react-icons/bs";

const Discussions = (props) => {
  const discussions = [
    {
      name: "name1",
      description: "desc1",
      createdAt: "18.04.2023",
      author: "Code-Network",
      topic: "Algorithms",
    },
    {
      name: "name2",
      description: "desc2",
      createdAt: "18.04.2023",
      author: "Code-Network",
      topic: "Web",
    },
    {
      name: "name3",
      description: "desc3",
      createdAt: "18.04.2023",
      author: "Code-Network",
      topic: "Custom",
    },
    {
      name: "name4",
      description: "desc4",
      createdAt: "18.04.2023",
      author: "Code-Network",
      topic: "Custom",
      tags: ['hashtag', 'another'],
    },
  ];
  const [selectedDiscussionTopic, setSelectedDiscussionTopic] = useState("0");
  const [sortDiscussions, setSortDiscussions] = useState(0)
  const [searchText, setSearchText] = useState("");
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);


  // Filter the discussions based on the selected topic and search text
  const filterDiscussions = () => {
    let filtered = discussions;

    if (selectedDiscussionTopic !== "0") {
      filtered = filtered.filter(
        (discussion) => discussion.topic === selectedDiscussionTopic
      );
    }

    if (searchText !== "") {
      filtered = filtered.filter(
        (discussion) =>
          discussion.name.toLowerCase().includes(searchText.toLowerCase()) ||
          discussion.description
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );
    }

    setFilteredDiscussions(filtered.slice(0, 10));
  };
  // Update the filtered discussions whenever the selected topic or search text changes
  React.useEffect(() => {
    filterDiscussions();
  }, [selectedDiscussionTopic]);

  return (
    <div className="discussions">
      <div className="discussions-topsection">
        <div className="select-discussion-topic">
          <Form.Select
            value={selectedDiscussionTopic}
            onChange={(e) => setSelectedDiscussionTopic(e.target.value)}
          >
            <option value="0">All</option>
            <option value="Algorithms">Algorithms</option>
            <option value="Web">Web</option>
            <option value="Custom">Custom</option>
          </Form.Select>
          <Form.Select
            value={sortDiscussions}
            onChange={(e) => setSortDiscussions(e.target.value)}
          >
            <option value="0">Trending</option>
            <option value="1">Recent</option>
            <option value="2">Popular</option>
          </Form.Select>
        </div>

        <div className="sesrch-discussion">
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant={`${props.theme === "darktheme" ? "secondary" : "primary"}`}
            size="md"
            onClick={filterDiscussions}
          >
            Search
          </Button>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => {}}>
            New Discussion
          </button>
        </div>
      </div>
      <div className="filtered-discussions">
        {filteredDiscussions.map((discussion, index) => (
          <div key={index} className="discussion-item">
            <div className="top-section">
              <h5>{discussion.name}</h5>
              <div className="tags">
                <Badge bg="secondary">{discussion.topic}</Badge>
                {discussion.tags?.map((tag, index) => (
                  <Badge bg="secondary" key={index}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <p>{discussion.description}</p>
            <div className="down-section">
              <div className="response-statistics">
                <div className="discussion-likes">Likes <BsHandThumbsUpFill /> </div>
                <div className="discussion-answers">Answers <BsFillChatLeftFill /> </div>
              </div>
              <div className="metadata-discussions text-secondary">
                <p>{discussion.createdAt}</p>
                <p>{discussion.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discussions
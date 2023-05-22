import React, {useState} from 'react'
import { Form, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Discussions.scss'
import { Button } from "react-bootstrap";
import PopUp from '../../elements/PopUp/PopUp';
import AddNewDiscussion from './AddNewDiscussion'
  import axios from "axios";
import { toast } from "react-toastify";
import InfiniteListWithVerticalScroll from '../../elements/InfiniteLoader/InfiniteListWithVerticalScroll';
import DiscussionDisplay from './DiscussionDisplay';
const Discussions = (props) => {
  const [closePopup, setClosePopup] = useState();
  const discussionsExample = [
    {
      title: "name1",
      text: "desc1",
      createdAt: "18.04.2023",
      author: { name: "Code-Network" },
      topic: "Algorithms",
    },
    {
      title: "name2",
      text: "desc2",
      createdAt: "18.04.2023",
      author: { name: "Code-Network" },
      topic: "Web",
    },
    {
      title: "name3",
      text: "desc3",
      createdAt: "18.04.2023",
      author: { name: "Code-Network" },
      topic: "Custom",
    },
    {
      title: "name4",
      text: "desc4",
      createdAt: "18.04.2023",
      author: { name: "Code-Network" },
      topic: "Custom",
      tags: ["hashtag", "another"],
    },
  ];
  const [selectedDiscussionTopic, setSelectedDiscussionTopic] = useState("0");
  const [sortDiscussions, setSortDiscussions] = useState(0)
  const [searchText, setSearchText] = useState("");
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [discussions, setDiscussions] = useState(discussionsExample);
  const handleDiscussionsLoad = async () => {
    try {
      const discussions = await axios.get("/api/discussions/all", {
      });
      if (discussions?.data) {
        setDiscussions(discussions.data);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
  };
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
      <InfiniteListWithVerticalScroll />
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
          <PopUp className={closePopup}>
            <button className="btn btn-primary" >
              New Discussion
            </button>
            <div className="add-new-discussion-form">
              <AddNewDiscussion />
            </div>
          </PopUp>
        </div>
      </div>
      <div className="filtered-discussions">
        {discussionsExample.map((discussion, index) => (
          <DiscussionDisplay discussion={discussion} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Discussions
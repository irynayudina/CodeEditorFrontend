import React, {useEffect, useState} from 'react'
import './UserProjects.scss'
import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import Project from './Project';
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loader from '../../../elements/Loader';
import { ListGroup } from "react-bootstrap";
import useInfiniteScroll from "react-infinite-scroll-hook";

function useLoadItems(userId) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [resetCompleted, setResetCompleted] = useState(false);
  const loadMore = async () => {
    if (!loading && hasNextPage) {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/projects?page=${page}&authorId=${userId}`
        );
        setItems((prevItems) => {
          // Filter out duplicate items
          const uniqueItems = response.data.projects.filter((item) => {
            // Check if the item's _id is not present in any of the previous items
            return !prevItems.some((prevItem) => prevItem._id === item._id);
          });
          // Concatenate the unique items with the previous items
          return [...prevItems, ...uniqueItems];
        });
        setPage((prevPage) => {
          const nextPage = prevPage + 1;
          setHasNextPage(nextPage <= response.data.totalPages);
          return nextPage;
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    console.log(page + " inside loadmore");
  };
  useEffect(() => {
    if (resetCompleted) {
      loadMore();
    }
  }, [resetCompleted]);

  return { loading, items, hasNextPage, error, loadMore };
}

const UserProjects = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: viewedUserId } = useParams();
  const userId = viewedUserId || userInfo._id
  const [fromPublicPage, setFromPublicPage] = useState(viewedUserId);
  const [projects, setProjects] = useState([
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "999k",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
    {
      name: "project1",
      language: "c++",
      createdAt: "26.04.2023",
      codeFile: "...",
      likes: "10",
    },
  ]);
  const [sortProjects, setSortProjects] = useState("1");
  const deleteProjectHandler = (i) => {
    let newList = [...projects];
    newList.splice(i, 1);
    setProjects(newList);
    console.log(projects)
  }

  // const loadProjectsList = async () => {
  //   try {
  //     const projects = await axios.get(`/api/projects?authorId=${userId}`);
  //     if (projects?.data) {
  //       console.log(projects.data);
  //       toast.success("got projects");
  //       setProjects(projects.data.projects);
  //     }
  //   } catch (err) {
  //     toast.error(err?.response?.data?.message || err.error);
  //   }
  // }
  // useEffect(() => {
  //   loadProjectsList();
  // }, []);
  
  let { loading, items, hasNextPage, error, loadMore } = useLoadItems(userId);
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
  });

  useEffect(() => {
    setProjects(items);
  }, [items]);

  return (
    <div className="projects-container">
      <h5 className="title-projects">Created projects & Collaborations</h5>
      <div className="topsection-projects">
        <Form.Select
          value={sortProjects}
          onChange={(e) => setSortProjects(e.target.value)}
        >
          <option value="1">Recent</option>
          <option value="2">Popular</option>
        </Form.Select>
        <div>
          <Form.Check type="switch" label="Only my prodjects" />
          <Form.Check type="switch" label="Only collaborations" />
        </div>
      </div>
      <div className="projects-display">
        {projects.map((project, i) => (
          <Project
            project={project}
            index={i}
            key={i}
            deleteProjectHandler={deleteProjectHandler}
            fromPublicPage={fromPublicPage}
          />
        ))}
      </div>
      {(loading || hasNextPage) && (
        <ListGroup className="loader-container-list-item">
          <ListGroup.Item ref={sentryRef}>
            <Loader />
          </ListGroup.Item>
        </ListGroup>
      )}
    </div>
  );
}

export default UserProjects


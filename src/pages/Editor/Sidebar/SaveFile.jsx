import React, { useState, useEffect } from "react";
import PopUp from "../../../elements/PopUp/PopUp";
import { FaCopy } from "react-icons/fa";
import Loader from "../../../elements/Loader";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const SaveFile = (props) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = !!props.userInfo;

  const handleSubmit = async (event) => {
    if (!isLoggedIn) {
      event.preventDefault();
      toast.error("Please log in to save your project");
      return;
    }
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("project-name");
    try {
      setIsLoading(true);
      const project = await axios.post(
        "https://codeeditorbackend-production.up.railway.app/api/projects",
        {
          projectName: name,
          codeFile: props.code,
          language: props.language,
        },
        { withCredentials: true }
      );
      if (project?.data) {
        props.setFilename(project.data.projectName);
        props.setNewProject(false);
        navigate(`/editor/${project.data._id}`);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
    setIsLoading(false);
  };
  const handleEdit = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to save your project");
      return;
    }
    try {
      setIsLoading(true);
      const project = await axios.post(
        "https://codeeditorbackend-production.up.railway.app/api/projects/id",
        {
          projectId: props.projectId,
          codeFile: props.code,
          language: props.language,
        },
        { withCredentials: true }
      );
      if (project?.data) {
        toast.success("edited");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
  };
  const [content, setContent] = useState(
    <span>Save</span>
  );
  useEffect(() => {
    if (props.newProject) {
      setContent(
        <PopUp>
          <span style={{ cursor: isLoggedIn ? 'pointer' : 'not-allowed', opacity: isLoggedIn ? 1 : 0.5 }}>Save</span>
          <div>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="project-name"
                    label="Project Name"
                    name="project-name"
                    autoComplete="project-name"
                    autoFocus
                  />
                  {isLoading && <Loader />}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!isLoggedIn}
                  >
                    Save new project
                  </Button>
                </Box>
              </Container>
            </ThemeProvider>
          </div>
        </PopUp>
      );
    } else {
      setContent(
        <span 
          onClick={(e) => { 
            e.stopPropagation(); 
            if (isLoggedIn) {
              handleEdit(); 
            }
          }} 
          style={{ cursor: isLoggedIn ? 'pointer' : 'not-allowed', opacity: isLoggedIn ? 1 : 0.5 }}
        >
          Save
        </span>
      );
    }
  }, [props.newProject, props.code, isLoggedIn]);

  return <>{content}</>;
};

export default SaveFile;

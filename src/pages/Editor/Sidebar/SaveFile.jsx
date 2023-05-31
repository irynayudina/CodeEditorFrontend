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

const theme = createTheme();

const SaveFile = (props) => {
  // {
  //   code, language, langVersion, cmd, params, newProject;
  // }
  useEffect(() => {
    console.log(props.code)
  }, [props.code])
  
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const name = data.get("project-name");
    console.log("name - " + name);
    console.log("code - " + props.code);
    console.log("language - " + props.language);
    props.setFilename(name);
    props.setNewProject(false);

    // try {
    //   const res = await login({ email, password }).unwrap();
    //   dispatch(setCredentials({ ...res }));
    //   navigate("/");
    // } catch (err) {
    //   toast.error(err?.data?.message || err.error);
    // }
    // setIsLoading(false);
  };
  const handleEdit = () => {
    console.log("edited")
  }
  const [content, setContent] = useState(
    <div>
      <FaCopy className="me-3" />
      <span>Save</span>
    </div>
  );
  useEffect(() => {
    if (props.newProject) {
      setContent(
        <PopUp>
          <div>
            <FaCopy className="me-3" />
            <span>Save</span>
          </div>
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
        <div onClick={handleEdit}>
          <FaCopy className="me-3" />
          <span>Save</span>
        </div>
      );
    }
  }, [props.newProject, props.code]);

  return (
    <>
      {props.newProject ? "hes" : "no"}
      {content}
    </>
  );
};

export default SaveFile;

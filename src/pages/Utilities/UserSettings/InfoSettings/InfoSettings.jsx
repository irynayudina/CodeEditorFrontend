import React, { useEffect, useState } from "react";
import "./InfoSettings.scss";
import { Button } from "react-bootstrap";
import CropImageForm from "../../../../elements/CroppingImageElement/CpropImageForm";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import {toast } from 'react-toastify'
import Loader from "../../../../elements/Loader";
import { setCredentials } from "../../../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../../../slices/usersApiSlice";

const InfoSettings = () => {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const dispatch = useDispatch();
  
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, {isLoading}] = useUpdateUserMutation();
  useEffect(() => {
    setName(userInfo.name);
  }, [userInfo.setName]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { firstName, lastName, username, phone, email, twitter, linkedin, facebook, github } =
      Object.fromEntries(data);
    const name = firstName + lastName;
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
  };
  return (
    <div className="info-settings">
      <CropImageForm />
      <div className="text-center">{isLoading && <Loader />}</div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Username: old_username</span>
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className="controls-setting"
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                label="Enter new username"
              />
            </Grid>
          </Grid>
          <Button variant="primary" size="sm" type="submit">
            Save changes
          </Button>
        </Box>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Name: old name</span>
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className="controls-setting"
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
          </Grid>
          <Button variant="primary" size="sm" type="submit">
            Save changes
          </Button>
        </Box>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Public Phone:</span>
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className="controls-setting"
        >
          <TextField
            fullWidth
            required
            id="phone"
            label="Enter new public phone"
            name="phone"
            autoComplete="phone"
          />
          <Button variant="primary" size="sm" type="submit">
            Save changes
          </Button>
        </Box>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Public Email:</span>
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className="controls-setting"
        >
          <TextField
            required
            fullWidth
            id="email"
            label="Enter new public email"
            name="email"
            autoComplete="email"
          />
          <Button variant="primary" size="sm" type="submit">
            Save changes
          </Button>
        </Box>
      </div>
      <div className="text-settings">
        <div className="description-setting">
          <span>Outer Links:</span>
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className="controls-setting"
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="linkedin"
                name="linkedin"
                required
                fullWidth
                id="linkedin"
                label="LinkedIn"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="github"
                name="github"
                required
                fullWidth
                id="github"
                label="GitHub"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="facebook"
                name="facebook"
                required
                fullWidth
                id="facebook"
                label="FaceBook"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="twitter"
                name="twitter"
                required
                fullWidth
                id="twitter"
                label="Twitter"
              />
            </Grid>
          </Grid>
          <Button variant="primary" size="sm" type="submit">
            Save changes
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default InfoSettings;

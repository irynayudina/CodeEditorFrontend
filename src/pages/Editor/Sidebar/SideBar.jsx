import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import "./SideBar.scss";
import {
  FaUsers,
  FaFolderOpen,
  FaTrashAlt,
  FaEdit,
  FaDownload,
  FaPalette,
  FaSave,
  FaFileUpload,
  FaChevronRight,
} from "react-icons/fa";

import SaveFile from "./SaveFile";
import ThemesHandler from "./ThemesHandler";
import { Link } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SideBar = (props) => {
  const [themesPick, setThemesPick] = useState("");
  
  // Check if user is logged in
  const isLoggedIn = !!props.userInfo;
  
  // Check if user is the owner of the project
  const isOwner = props.projectInfo?.author?._id === props.userInfo?._id;
  
  const [filename, setFilename] = useState("project=/filename");
  const [wasChanged, setChanged] = useState(false);
  
  // Memoize SaveFile component to prevent unnecessary re-renders
  const fileSaveElement = useMemo(() => (
    <SaveFile
      newProject={props.newProject}
      code={props.code}
      language={props.language}
      langVersion={props.langVersion}
      cmd={props.cmd}
      params={props.params}
      setFilename={setFilename}
      setNewProject={props.setNewProject}
      projectId={props.projectId}
      userInfo={props.userInfo}
    />
  ), [
    props.newProject,
    props.code,
    props.language,
    props.langVersion,
    props.cmd,
    props.params,
    props.projectId,
    props.userInfo,
    props.setNewProject,
  ]);

  const navigate = useNavigate();
  const [renameStr, setRenameStr] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  
  const deleteProjectHandler = useCallback(async () => {
    try {
      const projectUpdated = await axios.post(
        "https://codeeditorbackend-production.up.railway.app/api/projects/delete",
        {
          projectId: props.projectId,
        },
        { withCredentials: true }
      );
      if (projectUpdated?.data) {
        toast.success("project is deleted");
        setChanged(true);
        navigate("/editor");
        window.location.reload();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
  }, [props.projectId, navigate]);
  
  const renameProjectHandler = useCallback(async () => {
    if (!renameStr.trim()) {
      toast.error("Please enter a project name");
      return;
    }
    try {
      const projectUpdated = await axios.post(
        "https://codeeditorbackend-production.up.railway.app/api/projects/id",
        {
          projectId: props.projectId,
          projectName: renameStr,
        },
        { withCredentials: true }
      );
      if (projectUpdated?.data) {
        navigate(`/editor/${props.projectId}`);
        toast.success("renamed");
        setIsRenaming(false);
        setRenameStr("");
        window.location.reload();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.error);
    }
  }, [renameStr, props.projectId, navigate]);

  // Modern sidebar content component - memoized to prevent re-renders
  const SidebarContent = useMemo(() => (
    <div className="modern-sidebar-content">
      {/* Project Info Section */}
      {props.projectId && props.children && (
        <div className="sidebar-section project-info-section">
          {props.children}
        </div>
      )}

      {/* File Operations Section */}
      <div className="sidebar-section">
        <div className="section-header">
          <span className="section-title">File Operations</span>
        </div>
        <div className="section-actions">
          <div style={{ width: '100%', position: 'relative' }}>
            {!isLoggedIn && <div className="restriction-label">Logged in users only</div>}
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="save-tooltip">
                  {isLoggedIn ? "Save your project to the cloud" : "Log in to save your project"}
                </Tooltip>
              }
            >
              <div 
                className={`modern-sidebar-btn ${!isLoggedIn ? 'disabled' : ''}`}
                style={{ cursor: isLoggedIn ? 'pointer' : 'not-allowed' }}
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >
                <FaSave className="btn-icon" />
                <span className="btn-text">{fileSaveElement}</span>
              </div>
            </OverlayTrigger>
          </div>

          <button
            className="modern-sidebar-btn"
            onClick={() => {
              props.handleDownloadClick();
            }}
            type="button"
            title="Download your code as a file to your computer"
          >
            <FaDownload className="btn-icon" />
            <span className="btn-text">Download</span>
          </button>

          <div style={{ width: '100%', position: 'relative' }}>
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="open-drive-tooltip">
                  Upload a code file from your computer
                </Tooltip>
              }
            >
              <label className="modern-sidebar-btn file-upload-btn">
                <FaFileUpload className="btn-icon" />
                <span className="btn-text">Upload File</span>
                <Form.Control
                  type="file"
                  className="file-input-hidden"
                  onChange={(event) => {
                    props.handleFileUpload(
                      event,
                      props.setCode,
                      props.setLangauge,
                      props.languageExtensions
                    );
                  }}
                />
              </label>
            </OverlayTrigger>
          </div>

          <div style={{ width: '100%', position: 'relative' }}>
            {!isLoggedIn && <div className="restriction-label">Logged in users only</div>}
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="open-project-tooltip">
                  {isLoggedIn ? "Open an existing project from your saved projects" : "Log in to open your saved projects"}
                </Tooltip>
              }
            >
              {isLoggedIn ? (
                <Link
                  to={`/user#projects`}
                  className="modern-sidebar-btn link-btn"
                >
                  <FaFolderOpen className="btn-icon" />
                  <span className="btn-text">Open Project</span>
                  <FaChevronRight className="btn-chevron" />
                </Link>
              ) : (
                <div className="modern-sidebar-btn link-btn disabled">
                  <FaFolderOpen className="btn-icon" />
                  <span className="btn-text">Open Project</span>
                  <FaChevronRight className="btn-chevron" />
                </div>
              )}
            </OverlayTrigger>
          </div>
        </div>
      </div>

      {/* Collaboration Section */}
      {props.projectId && (
        <div className="sidebar-section">
          <div className="section-header">
            <span className="section-title">Collaboration</span>
          </div>
          <div className="section-actions">
            <div style={{ width: '100%', position: 'relative' }}>
              {!isLoggedIn && <div className="restriction-label">Logged in users only</div>}
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="collab-tooltip">
                    {isLoggedIn ? "Collaborate with others in real-time" : "Log in to use collaboration features"}
                  </Tooltip>
                }
              >
                {isLoggedIn ? (
                  <Link
                    to={props.collabId}
                    state={{ associatedProject_id: props.projectId }}
                    className="modern-sidebar-btn link-btn collab-btn"
                  >
                    <FaUsers className="btn-icon" />
                    <span className="btn-text">Collaboration Mode</span>
                    <FaChevronRight className="btn-chevron" />
                  </Link>
                ) : (
                  <div className="modern-sidebar-btn link-btn collab-btn disabled">
                    <FaUsers className="btn-icon" />
                    <span className="btn-text">Collaboration Mode</span>
                    <FaChevronRight className="btn-chevron" />
                  </div>
                )}
              </OverlayTrigger>
            </div>
          </div>
        </div>
      )}

      {/* Project Management Section */}
      {props.projectId && (
        <div className="sidebar-section">
          <div className="section-header">
            <span className="section-title">Project Management</span>
          </div>
          {!isOwner && <div className="restriction-label">Code owners only</div>}
          <div className="section-actions">
            {!isRenaming ? (
              <button
                className={`modern-sidebar-btn ${!isOwner ? 'disabled' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isOwner) {
                    setIsRenaming(true);
                  }
                }}
                type="button"
                disabled={!isOwner}
              >
                <FaEdit className="btn-icon" />
                <span className="btn-text">Rename Project</span>
              </button>
            ) : (
              <div className="rename-input-group">
                <Form.Control
                  type="text"
                  placeholder="Enter new name"
                  value={renameStr}
                  onChange={(e) => setRenameStr(e.target.value)}
                  className="rename-input"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      renameProjectHandler();
                    } else if (e.key === "Escape") {
                      setIsRenaming(false);
                      setRenameStr("");
                    }
                  }}
                />
                <div className="rename-actions">
                  <button
                    className="rename-btn confirm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      renameProjectHandler();
                    }}
                    type="button"
                  >
                    Save
                  </button>
                  <button
                    className="rename-btn cancel"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsRenaming(false);
                      setRenameStr("");
                    }}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip id="delete-tooltip">
                  {isOwner ? "Permanently delete this project" : "Only the project owner can delete this project"}
                </Tooltip>
              }
            >
              <button
                className={`modern-sidebar-btn danger-btn ${!isOwner ? 'disabled' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isOwner) {
                    deleteProjectHandler();
                  }
                }}
                type="button"
                disabled={!isOwner}
              >
                <FaTrashAlt className="btn-icon" />
                <span className="btn-text">Delete Project</span>
              </button>
            </OverlayTrigger>
          </div>
        </div>
      )}

      {/* Settings Section */}
      <div className="sidebar-section settings-section">
        <div className="section-header">
          <span className="section-title">Appearance</span>
        </div>
        <div className="section-actions">
          <ThemesHandler
            setExpanded={props.setExpanded}
            setEditorTheme={props.setEditorTheme}
            theme={props.theme}
            setThemesPick={setThemesPick}
          />
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="configure-view-tooltip">
                Customize editor theme and appearance
              </Tooltip>
            }
          >
            <div className="theme-selector-wrapper">
              <Dropdown className="theme-dropdown" drop="end">
                <Dropdown.Toggle className="theme-selector-trigger" as="div">
                  <FaPalette className="btn-icon" />
                  <span className="btn-text">Editor Theme</span>
                  <FaChevronRight className="btn-chevron" />
                </Dropdown.Toggle>
                {themesPick}
              </Dropdown>
            </div>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  ), [
    props.projectId,
    props.children,
    props.collabId,
    isLoggedIn,
    isOwner,
    isRenaming,
    renameStr,
    fileSaveElement,
    themesPick,
    props.theme,
    props.handleDownloadClick,
    props.handleFileUpload,
    props.setCode,
    props.setLangauge,
    props.languageExtensions,
    props.setEditorTheme,
    props.setExpanded,
    deleteProjectHandler,
    renameProjectHandler,
  ]);

  return (
    <div className={`modern-sidebar ${props.theme}`}>
      {SidebarContent}
    </div>
  );
};

export default SideBar;

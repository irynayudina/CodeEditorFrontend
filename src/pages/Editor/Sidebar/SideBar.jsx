import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./SideBar.scss";
import {
  FaArrowLeft,
  FaFileCode,
  FaUsers,
  FaSdCard,
  FaFolderOpen,
  FaTrashAlt,
  FaEdit,
  FaLockOpen,
  FaDownload,
  FaWhmcs,
} from "react-icons/fa";

import SaveFile from "./SaveFile";
import ThemesHandler from "./ThemesHandler";

const SideBar = (props) => {
  const [visibleDropdown, setVisibleDropdown] = useState("hiddenDropdown");
  const [visibleSidebar, setVisibleSidebar] = useState("");
  const [themesPick, setThemesPick] = useState("");
  const [newProject, setNewProject] = useState(true);
  const showSidebar = () => {
    setVisibleDropdown("hiddenDropdown");
    setVisibleSidebar("");
    props.setExpanded("expandedCustom-pannel");
  };
  const hideSidebar = () => {
    setVisibleDropdown("");
    setVisibleSidebar("hiddenSidebar");
    props.setExpanded("hiddenPannel");
  };
  const [filename, setFilename] = useState("project=/filename");
  const handleSaveClick = (e) => {
    e.stopPropagation();
  };

  const [fileSaveElement, setFileSaveElement] = useState("small");
  const [sidebarCode, setSidebarCode] = useState("");
  const [sidebarLanguage, setSidebarLanguage] = useState("");
  const [sidebarCmd, setSidebarCmd] = useState("");
  const [sidebarParam, setSidebarParam] = useState("");
  const [sidebarLangVersion, setSidebarLangVersion] = useState("");
  useEffect(() => {
    //setting
    setSidebarCode(props.code);
    setSidebarLanguage(props.language);
    setSidebarCmd(props.cmd);
    setSidebarParam(props.param);
    setSidebarLangVersion(props.langVersion);
  }, [
    props,
    props.code,
    props.language,
    props.langVersion,
    props.cmd,
    props.params,
  ]);

  useEffect(() => {
    setFileSaveElement(
      <SaveFile
        newProject={newProject}
        code={sidebarCode}
        language={sidebarLanguage}
        langVersion={sidebarLangVersion}
        cmd={sidebarCmd}
        params={sidebarParam}
        setFilename={setFilename}
        setNewProject={setNewProject}
        projectId={props.projectId}
      />
    );
  }, [
    sidebarCode,
    sidebarLanguage,
    sidebarCmd,
    sidebarLangVersion,
    sidebarParam,
    filename,
    newProject,
  ]);

  return (
    <div className={`side ${props.theme} ${props.editorSize}`}>
      <div>
        <ThemesHandler
          setExpanded={props.setExpanded}
          setEditorTheme={props.setEditorTheme}
          theme={props.theme}
          setThemesPick={setThemesPick}
        />
      </div>
      {/* {sidebarLayout} */}
      {props.editorSize == "sm" ? (
        <Dropdown className={`list-group list-group-flush`}>
          <Dropdown.Toggle
            variant={`${props.theme == "lighttheme" ? "primary" : "dark"}`}
            id="dropdown-basic"
          >
            <p className="sidebar-dropdown-name">File menu</p>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#1">
              <FaFileCode className="me-3" />
              <span>Editor ({filename})</span>
            </Dropdown.Item>
            {props.children}
            <Dropdown.Divider />
            <Dropdown.Item href="#11" onClick={handleSaveClick}>
              {fileSaveElement}
            </Dropdown.Item>
            <Dropdown.Item
              href="#3"
              onClick={() => props.handleDownloadClick()}
            >
              <FaDownload className="me-3" />
              <span>Save locally</span>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#7">
              <FaSdCard className="me-3" />
              <span>
                Open from drive{" "}
                <Form.Control
                  type="file"
                  className="open-drive-editor"
                  onChange={(event) => {
                    props.handleFileUpload(
                      event,
                      props.setCode,
                      props.setLangauge,
                      props.languageExtensions
                    );
                  }}
                />
              </span>
            </Dropdown.Item>
            <Dropdown.Item href="#8">
              <FaFolderOpen className="me-3" />
              <span>Open from project</span>
            </Dropdown.Item>
            <Dropdown.Item href="#10">
              <FaUsers className="me-3" />
              <span>Collaboration mode</span>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#12">
              <FaLockOpen className="me-3" />
              <span>Make public</span>
            </Dropdown.Item>
            <Dropdown.Item href="#13">
              <FaEdit className="me-3" />
              <span>Rename</span>
            </Dropdown.Item>
            <Dropdown.Item href="#14">
              <FaTrashAlt className="me-3" />
              <span>Delete</span>
            </Dropdown.Item>
            <Dropdown.Item>
              <Dropdown
                className={`list-group list-group-flush `}
                onClick={(e) => e.stopPropagation()}
              >
                <Dropdown.Toggle
                  className={`${
                    props.theme == "lighttheme"
                      ? "configure-view-editor-toggle-light-sm"
                      : "configure-view-editor-toggle-sm"
                  }`}
                >
                  <FaWhmcs className="me-3" />
                  <span>Configure view</span>
                </Dropdown.Toggle>
                {themesPick}
              </Dropdown>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <>
          <Dropdown
            className={`list-group list-group-flush ${visibleDropdown}`}
            onClick={showSidebar}
          >
            <Dropdown.Toggle
              variant={`${props.theme == "lighttheme" ? "primary" : "dark"}`}
              id="dropdown-basic"
              className="dropdown-turned"
            >
              <p className="sidebar-dropdown-name">File menu</p>
            </Dropdown.Toggle>
          </Dropdown>{" "}
          <Button
            className={`hide-btn ${visibleSidebar}`}
            onClick={hideSidebar}
          >
            <FaArrowLeft className="me-3" />
            <span>Hide the Sidebar</span>
          </Button>
          <Nav className={`list-group list-group-flush ${visibleSidebar}`}>
            <Nav.Link
              href="#1"
              exact
              className="list-group-item list-group-item-action py-2 ripple active"
              aria-current="true"
            >
              <FaFileCode className="me-3" />
              <span>Editor ({filename})</span>
            </Nav.Link>
            {props.children}
            <Nav.Link
              href="#11"
              className="list-group-item list-group-item-action py-2 ripple"
              onClick={handleSaveClick}
            >
              {fileSaveElement}
            </Nav.Link>
            <Nav.Link
              href="#3"
              className="list-group-item list-group-item-action py-2 ripple"
              onClick={() => props.handleDownloadClick()}
            >
              <FaDownload className="me-3" />
              <span>Save locally</span>
            </Nav.Link>
            <Nav.Link
              href="#7"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <FaSdCard className="me-3" />
              <span>
                Open from drive
                <Form.Control
                  type="file"
                  className={`${props.theme}-opndrv open-drive-editor-side`}
                  onChange={(event) => {
                    props.handleFileUpload(
                      event,
                      props.setCode,
                      props.setLangauge,
                      props.languageExtensions
                    );
                  }}
                />
              </span>
            </Nav.Link>
            <Nav.Link
              href="#8"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <FaFolderOpen className="me-3" />
              <span>Open from project</span>
            </Nav.Link>
            <Nav.Link
              href="#10"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <FaUsers className="me-3" />
              <span>Collaboration mode</span>
            </Nav.Link>
            <Nav.Link
              href="#12"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <FaLockOpen className="me-3" />
              <span>Make public</span>
            </Nav.Link>
            <Nav.Link
              href="#13"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <FaEdit className="me-3" />
              <span>Rename</span>
            </Nav.Link>
            <Nav.Link
              href="#14"
              className="list-group-item list-group-item-action py-2 ripple"
            >
              <FaTrashAlt className="me-3" />
              <span>Delete</span>
            </Nav.Link>
            <Dropdown className={`list-group list-group-flush `} drop="end">
              <Dropdown.Toggle
                className={`${
                  props.theme == "lighttheme"
                    ? "configure-view-editor-toggle-light"
                    : "configure-view-editor-toggle"
                }`}
              >
                <FaWhmcs className="me-3" />
                <span>Configure view</span>
              </Dropdown.Toggle>
              {themesPick}
            </Dropdown>
          </Nav>
        </>
      )}
    </div>
  );
};

export default SideBar;

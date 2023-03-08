import React from 'react'
import { Nav } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Dropdown } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import './SideBar.scss'

import {
    FaTachometerAlt, FaFileCode, 
    FaGlobe, FaBuilding, FaCalendar, FaUsers, FaMoneyBill,
    FaBloggerB, FaCloudUploadAlt, FaCloudDownloadAlt, FaCopy, FaBriefcase, FaSdCard, FaFolderOpen,
    FaTrashAlt, FaEdit, FaGithub, FaGoogleDrive, FaLockOpen, FaDownload, FaGithubSquare, FaLock,
} from 'react-icons/fa';

const SideBar = (props) => {
  return (
      <div className={`side ${props.theme}`}>
          {props.editorSize == "sm" ?
              (<Dropdown className="list-group list-group-flush">
                  <Dropdown.Toggle variant={`${props.theme == "lighttheme" ? "primary" : "dark"}`} id="dropdown-basic">
                <p className='sidebar-dropdown-name'>File menu</p>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#1">
                  <FaFileCode className="me-3" />
                  <span>Editor (project/filename)</span>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#11">
                  <FaCopy className="me-3" />
                  <span>Save</span>
                </Dropdown.Item>
                <Dropdown.Item href="#2">
                  <FaGoogleDrive className="me-3" />
                  <span>Save in Google</span>
                </Dropdown.Item>
                <Dropdown.Item href="#3">
                  <FaDownload className="me-3" />
                  <span>Save locally</span>
                </Dropdown.Item>
                <Dropdown.Item href="#4">
                  <FaBloggerB className="me-3" />
                  <span>Save in project</span>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#5">
                  <FaGithub className="me-3" />
                  <span>Upload to GitHub</span>
                </Dropdown.Item>
                <Dropdown.Item href="#6">
                  <FaCloudDownloadAlt className="me-3" />
                  <span>Open from Google</span>
                </Dropdown.Item>
                <Dropdown.Item href="#7">
                  <FaSdCard className="me-3" />
                  <span>Open from drive</span>
                </Dropdown.Item>
                <Dropdown.Item href="#8">
                  <FaFolderOpen className="me-3" />
                  <span>Open from project</span>
                </Dropdown.Item>
                <Dropdown.Item href="#9">
                  <FaGithubSquare className="me-3" />
                  <span>Copy from GitHub</span>
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
              </Dropdown.Menu>
            </Dropdown>
          )
              :
              <Nav className="list-group list-group-flush " > 
                      <Nav.Link href="#1" exact className="list-group-item list-group-item-action py-2 ripple active" aria-current="true">
                          <FaFileCode className="me-3" /><span>Editor (project/filename)</span>
                      </Nav.Link>                      
                      <Nav.Link href="#11" className="list-group-item list-group-item-action py-2 ripple">
                          <FaCopy className="me-3" /><span>Save</span>
                      </Nav.Link>
                      <Nav.Link href="#2" className="list-group-item list-group-item-action py-2 ripple ">
                          <FaGoogleDrive className="me-3" /><span>Save in Google</span>
                      </Nav.Link>
                      <Nav.Link href="#3" className="list-group-item list-group-item-action py-2 ripple">
                          <FaDownload className="me-3" /><span>Save locally</span>
                      </Nav.Link>
                      <Nav.Link href="#4" className="list-group-item list-group-item-action py-2 ripple">
                          <FaBloggerB className="me-3" /><span>Save in project</span>
                      </Nav.Link>
                      <Nav.Link href="#5" className="list-group-item list-group-item-action py-2 ripple">
                          <FaGithub className="me-3" /><span>Upload to GitHub</span>
                      </Nav.Link>
                      <Nav.Link href="#6" className="list-group-item list-group-item-action py-2 ripple">
                          <FaCloudDownloadAlt className="me-3" /><span>Open from Google</span>
                      </Nav.Link>
                      <Nav.Link href="#7" className="list-group-item list-group-item-action py-2 ripple">
                          <FaSdCard className="me-3" /><span>Open from drive</span>
                      </Nav.Link>
                      <Nav.Link href="#8" className="list-group-item list-group-item-action py-2 ripple">
                          <FaFolderOpen className="me-3" /><span>Open from project</span>
                      </Nav.Link>
                      <Nav.Link href="#9" className="list-group-item list-group-item-action py-2 ripple">
                          <FaGithubSquare className="me-3" /><span>Copy from GitHub</span>
                      </Nav.Link>
                      <Nav.Link href="#10" className="list-group-item list-group-item-action py-2 ripple">
                          <FaUsers className="me-3" /><span>Collaboration mode</span>
                      </Nav.Link>
                      <Nav.Link href="#12" className="list-group-item list-group-item-action py-2 ripple">
                          <FaLockOpen className="me-3" /><span>Make public</span>
                      </Nav.Link>
                      <Nav.Link href="#13" className="list-group-item list-group-item-action py-2 ripple">
                          <FaEdit className="me-3" /><span>Rename</span>
                      </Nav.Link>
                      <Nav.Link href="#14" className="list-group-item list-group-item-action py-2 ripple">
                          <FaTrashAlt className="me-3" /><span>Delete</span>
                      </Nav.Link>
              </Nav>
          }
                  
      </div>  
    )
}

export default SideBar

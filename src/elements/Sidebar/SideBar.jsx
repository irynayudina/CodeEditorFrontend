import React from 'react'
import { Nav } from 'react-bootstrap';
import './SideBar.scss'

import {
    FaTachometerAlt, FaFileCode, 
    FaGlobe, FaBuilding, FaCalendar, FaUsers, FaMoneyBill,
    FaBloggerB, FaCloudUploadAlt, FaCloudDownloadAlt, FaCopy, FaBriefcase, FaSdCard, FaFolderOpen,
    FaTrashAlt, FaEdit, FaGithub, FaGoogleDrive, FaLockOpen, FaDownload, FaGithubSquare, FaLock,
} from 'react-icons/fa';

const SideBar = () => {
  return (
      <div className="side">
          {/* <Nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white"> mx-3 mt-4*/}
                  <Nav className="list-group list-group-flush "> 
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
          {/* </Nav> */}
      </div>  
    )
}

export default SideBar

import React from 'react'
import { Nav } from 'react-bootstrap';
import './SideBar.scss'

import { FaTachometerAlt, FaChartArea, FaLock, FaChartLine, FaChartPie, FaChartBar, FaGlobe, FaBuilding, FaCalendar, FaUsers, FaMoneyBill } from 'react-icons/fa';

const SideBar = () => {
  return (
      <div className="side">
          <Nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
              <div className="position-sticky">
                  <Nav className="list-group list-group-flush mx-3 mt-4">
                      <Nav.Link href="#" className="list-group-item list-group-item-action py-2 ripple active" aria-current="true">
                          <FaTachometerAlt className="me-3" /><span>Editor</span>
                      </Nav.Link>
                      <Nav.Link href="#" className="list-group-item list-group-item-action py-2 ripple ">
                          <FaChartArea className="me-3" /><span>Webiste traffic</span>
                      </Nav.Link>
                      <Nav.Link href="#" className="list-group-item list-group-item-action py-2 ripple">
                          <FaLock className="me-3" /><span>Password</span>
                      </Nav.Link>
                      <Nav.Link href="#" className="list-group-item list-group-item-action py-2 ripple">
                          <FaChartLine className="me-3" /><span>Analytics</span>
                      </Nav.Link>
                      <Nav.Link href="#" className="list-group-item list-group-item-action py-2 ripple">
                          <FaChartPie className="me-3" /><span>SEO</span>
                      </Nav.Link>
                      <Nav.Link href="#" className="list-group-item list-group-item-action py-2 ripple">
                          <FaChartBar className="me-3" /><span>Orders</span>
                      </Nav.Link>
                      <Nav.Link href="#" className="list-group-item list-group-item-action py-2 ripple">
                          <FaGlobe className="me-3" /><span>International</span>
                      </Nav.Link>
                      <Nav.Link href="#" className="list-group-item list-group-item-action py-2 ripple">
                          <FaBuilding className="me-3" /><span>Partners</span>
                      </Nav.Link>
                      <Nav.Link href="#" className="list-group-item list-group-item-action py-2 ripple">
                          <FaCalendar className="me-3" /><span>Calendar</span>
                      </Nav.Link>
                      <Nav.Link href="#" className="list-group-item list-group-item-action py-2 ripple">
                          <FaUsers className="me-3" /><span>Users</span>
                      </Nav.Link>
                      <Nav.Link href="#" className="list-group-item list-group-item-action py-2 ripple">
                          <FaMoneyBill className="me-3" /><span>Sales</span>
                      </Nav.Link>
                  </Nav>
              </div>
          </Nav>
      </div>  
    )
}

export default SideBar

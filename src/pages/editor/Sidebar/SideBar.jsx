import React, {useState, useEffect} from 'react'
import { Nav } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import './SideBar.scss'
import {
    FaArrowLeft, FaFileCode, 
    FaGlobe, FaBuilding, FaCalendar, FaUsers, FaMoneyBill,
    FaBloggerB, FaCloudUploadAlt, FaCloudDownloadAlt, FaCopy, FaBriefcase, FaSdCard, FaFolderOpen,
    FaTrashAlt, FaEdit, FaGithub, FaGoogleDrive, FaLockOpen, FaDownload, FaGithubSquare, FaLock, FaWhmcs,
} from 'react-icons/fa';

import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { githubLight, githubLightInit, githubDark, githubDarkInit } from '@uiw/codemirror-theme-github';
import { noctisLilac, noctisLilacInit } from '@uiw/codemirror-theme-noctis-lilac';
import { abcdef } from '@uiw/codemirror-theme-abcdef';
import { androidstudio } from '@uiw/codemirror-theme-androidstudio';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { aura } from '@uiw/codemirror-theme-aura';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { bespin } from '@uiw/codemirror-theme-bespin';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { duotoneLight, duotoneDark } from '@uiw/codemirror-theme-duotone';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { gruvboxDark, gruvboxLight } from '@uiw/codemirror-theme-gruvbox-dark';
import { materialDark, materialDarkInit, materialLight, materialLightInit } from '@uiw/codemirror-theme-material';
import { nord, nordInit } from '@uiw/codemirror-theme-nord';
import { solarizedLight, solarizedLightInit, solarizedDark, solarizedDarkInit } from '@uiw/codemirror-theme-solarized';
import { sublime, sublimeInit } from '@uiw/codemirror-theme-sublime';
import { tokyoNight, tokyoNightInit } from '@uiw/codemirror-theme-tokyo-night';
import { vscodeDark, vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { xcodeLight, xcodeLightInit, xcodeDark, xcodeDarkInit } from '@uiw/codemirror-theme-xcode';

import { handleDownloadClick } from '../WorkWithCodeFile';
const SideBar = (props) => {
  const [visibleDropdown, setVisibleDropdown] = useState("hiddenDropdown")
  const [visibleSidebar, setVisibleSidebar] = useState("")
  const [themesPick, setThemesPick] = useState("")
  const showSidebar = () => {
    setVisibleDropdown("hiddenDropdown")
    setVisibleSidebar("")
    props.setExpanded("expandedCustom-pannel")
  }
  const hideSidebar = () => {
    setVisibleDropdown("")
    setVisibleSidebar("hiddenSidebar")
    props.setExpanded("hiddenPannel")
  }
  const changeEditorTheme = (t) => {
    props.setEditorTheme(t)
  }
  useEffect(() => {
    const handleHashChange = () => {
      const hashValue = window.location.hash.substring(1);
      let lightThemes = ['githubLight', 'noctisLilac', 'bbedit', 'duotoneLight',
        'eclipse', 'gruvboxLight', 'materialLight', 'solarizedLight', 'xcodeLight']
      let darkThemes = ['okaidia', 'abcdef', 'androidstudio', 'atomone', 'aura', 'bespin', 'darcula', 'dracula',
        'duotoneDark', 'githubDark', 'gruvboxDark', 'materialDark', 'nord', 'solarizedDark', 'sublime',
        'tokyoNight', 'vscodeDark', 'xcodeDark']
      if (lightThemes.includes(hashValue)) {
        localStorage.setItem('editorThemeStoredLight', hashValue)
      } else if(darkThemes.includes(hashValue)){
        localStorage.setItem('editorThemeStoredDark', hashValue)
      }
    };  
    window.addEventListener("hashchange", handleHashChange);  
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  
  useEffect(() => {
    if (props.theme == 'lighttheme') {
      setThemesPick(
        <Dropdown.Menu >
          <Dropdown.Item href="#githubLight" onClick={()=>changeEditorTheme(githubLight)}>
            <span>Github Light</span>
          </Dropdown.Item>
          <Dropdown.Item href="#noctisLilac" onClick={()=>changeEditorTheme(noctisLilac)}>
            <span>Noctis Lilac</span>
          </Dropdown.Item>
          <Dropdown.Item href="#bbedit" onClick={()=>{props.setEditorTheme(bbedit)}}>
            <span>Bbedit</span>
          </Dropdown.Item>
          <Dropdown.Item href="#duotoneLight" onClick={()=>changeEditorTheme(duotoneLight)}>
            <span>Duotone Light</span>
          </Dropdown.Item>
          <Dropdown.Item href="#eclipse" onClick={()=>changeEditorTheme(eclipse)}>
            <span>Eclipse</span>
          </Dropdown.Item>
          <Dropdown.Item href="#gruvboxLight" onClick={()=>changeEditorTheme(gruvboxLight)}>
            <span>Gruvbox Light</span>
          </Dropdown.Item>
          <Dropdown.Item href="#materialLight" onClick={()=>changeEditorTheme(materialLight)}>
            <span>Material Light</span>
          </Dropdown.Item>
          <Dropdown.Item href="#solarizedLight" onClick={()=>changeEditorTheme(solarizedLight)}>
            <span>Solarized Light</span>
          </Dropdown.Item>
          <Dropdown.Item href="#xcodeLight" onClick={()=>changeEditorTheme(xcodeLight)}>
            <span>Xcode Light</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      )
    } else {
      setThemesPick(
        <Dropdown.Menu >
          <Dropdown.Item href="#okaidia" onClick={()=>changeEditorTheme(okaidia)}>
            <span>Okaida</span>
          </Dropdown.Item>
          <Dropdown.Item href="#abcdef" onClick={()=>changeEditorTheme(abcdef)}>
            <span>Abcdef</span>
          </Dropdown.Item>
          <Dropdown.Item href="#androidstudio" onClick={()=>changeEditorTheme(androidstudio)}>
            <span>Androidstudio</span>
          </Dropdown.Item>
          <Dropdown.Item href="#atomone" onClick={()=>changeEditorTheme(atomone)}>
            <span>Atomone</span>
          </Dropdown.Item>
          <Dropdown.Item href="#aura" onClick={()=>changeEditorTheme(aura)}>
            <span>Aura</span>
          </Dropdown.Item>
          <Dropdown.Item href="#bespin" onClick={()=>changeEditorTheme(bespin)}>
            <span>Bespin</span>
          </Dropdown.Item>
          <Dropdown.Item href="#darcula" onClick={()=>changeEditorTheme(darcula)}>
            <span>Darcula</span>
          </Dropdown.Item>
          <Dropdown.Item href="#dracula" onClick={()=>changeEditorTheme(dracula)}>
            <span>Dracula</span>
          </Dropdown.Item>
          <Dropdown.Item href="#duotoneDark" onClick={()=>changeEditorTheme(duotoneDark)}>
            <span>Duotone Dark</span>
          </Dropdown.Item>
          <Dropdown.Item href="#githubDark" onClick={()=>changeEditorTheme(githubDark)}>
            <span>Github Dark</span>
          </Dropdown.Item>
          <Dropdown.Item href="#gruvboxDark" onClick={()=>changeEditorTheme(gruvboxDark)}>
            <span>Gruvbox Dark</span>
          </Dropdown.Item>
          <Dropdown.Item href="#materialDark" onClick={()=>changeEditorTheme(materialDark)}>
            <span>Material Dark</span>
          </Dropdown.Item>
          <Dropdown.Item href="#nord" onClick={()=>changeEditorTheme(nord)}>
            <span>Nord</span>
          </Dropdown.Item>
          <Dropdown.Item href="#solarizedDark" onClick={()=>changeEditorTheme(solarizedDark)}>
            <span>Solarized Dark</span>
          </Dropdown.Item>
          <Dropdown.Item href="#sublime" onClick={()=>changeEditorTheme(sublime)}>
            <span>Sublime</span>
          </Dropdown.Item>
          <Dropdown.Item href="#tokyoNight" onClick={()=>changeEditorTheme(tokyoNight)}>
            <span>Tokyo Night</span>
          </Dropdown.Item>
          <Dropdown.Item href="#vscodeDark" onClick={()=>changeEditorTheme(vscodeDark)}>
            <span>Vscode Dark</span>
          </Dropdown.Item>
          <Dropdown.Item href="#xcodeDark" onClick={()=>changeEditorTheme(xcodeDark)}>
            <span>Xcode Dark</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      )
    }
  }, [props.theme])
  
  return (
      <div className={`side ${props.theme} ${props.editorSize}`}>
          {props.editorSize == "sm" ?
        (<Dropdown className={`list-group list-group-flush`}>
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
                <Dropdown.Item href="#3" onClick={()=>props.handleDownloadClick()}>
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
              <span>Open from drive <Form.Control type="file" className='open-drive-editor'
                onChange={(event) => {
                  props.handleFileUpload(event, props.setCode);
                }}
              /></span>
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
                <Dropdown.Item>
                  <Dropdown className={`list-group list-group-flush `} onClick={(e) => e.stopPropagation()}>
                    <Dropdown.Toggle className={`${props.theme == "lighttheme" ?
                      'configure-view-editor-toggle-light-sm' : 'configure-view-editor-toggle-sm'}`}
                      ><FaWhmcs className="me-3" /><span>Configure view</span>
                      </Dropdown.Toggle>
                      {themesPick}
                    </Dropdown>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
        :
        (<>
          <Dropdown className={`list-group list-group-flush ${visibleDropdown}`} onClick={showSidebar}>
            <Dropdown.Toggle variant={`${props.theme == "lighttheme" ? "primary" : "dark"}`}
              id="dropdown-basic" className='dropdown-turned'
            >
              <p className='sidebar-dropdown-name'>File menu</p>
            </Dropdown.Toggle>
          </Dropdown>
          <Button className={`hide-btn ${visibleSidebar}`} onClick={hideSidebar}>
            <FaArrowLeft className="me-3" /><span>Hide the Sidebar</span>
          </Button>
          <Nav className={`list-group list-group-flush ${visibleSidebar}`} > 
            <Nav.Link href="#1" exact className="list-group-item list-group-item-action py-2 ripple active" aria-current="true">
                <FaFileCode className="me-3" /><span>Editor (project/filename)</span>
            </Nav.Link>                      
            <Nav.Link href="#11" className="list-group-item list-group-item-action py-2 ripple">
                <FaCopy className="me-3" /><span>Save</span>
            </Nav.Link>
            <Nav.Link href="#2" className="list-group-item list-group-item-action py-2 ripple ">
                <FaGoogleDrive className="me-3" /><span>Save in Google</span>
            </Nav.Link>
            <Nav.Link href="#3" className="list-group-item list-group-item-action py-2 ripple"
              onClick={()=>props.handleDownloadClick()} >
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
              <FaSdCard className="me-3" /><span>Open from drive
                <Form.Control type="file" className='open-drive-editor-side'
                onChange={(event) => {
                  props.handleFileUpload(event, props.setCode);
                }}
              /></span>
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
            <Dropdown className={`list-group list-group-flush `} drop='end'>
              <Dropdown.Toggle className={`${props.theme == "lighttheme" ?
                'configure-view-editor-toggle-light' : 'configure-view-editor-toggle'}`}
              ><FaWhmcs className="me-3" /><span>Configure view</span>
              </Dropdown.Toggle>
              {themesPick}
            </Dropdown>
          </Nav>
        </>)
      }                  
    </div>  
  )
}

export default SideBar

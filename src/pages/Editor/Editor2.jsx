import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Editor.scss";
import SideBar from "./Sidebar/SideBar";
import CodeEditorPanel from "./Editor2/CodeEditorPanel";
import OutputPanel from "./Editor2/OutputPanel";
import { useProjectData } from "./Editor2/hooks/useProjectData";
import { useCodeExecution } from "./Editor2/hooks/useCodeExecution";
import { useEditorTheme } from "./Editor2/hooks/useEditorTheme";
import { sampleCodes, languageVersions, languageExtensions } from "./Syntax/EditorData.ts";
import { handleDownloadClick, handleFileUpload } from "./WorkWithCodeFile";

const Editor2 = ({ theme }) => {
  const { id: projectId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  
  // State
  const [code, setCode] = useState(sampleCodes.javascript);
  const [language, setLanguage] = useState("javascript");
  const [version, setVersion] = useState("0");
  const [cmdArgs, setCmdArgs] = useState("");
  const [userInput, setUserInput] = useState("");
  
  // Custom hooks
  const { projectInfo, isOwner, collabId, isLoading: projectLoading } = useProjectData(projectId, userInfo);
  const { result, setResult, isCompiling, jsRun, executeCode } = useCodeExecution();
  const { editorTheme, setEditorTheme } = useEditorTheme(theme);
  
  // Load project data when projectId changes - only once per project
  useEffect(() => {
    if (projectInfo && projectId) {
      setCode(projectInfo.codeFile || sampleCodes.javascript);
      setLanguage(projectInfo.language || "javascript");
    }
  }, [projectId]); // Only depend on projectId, not projectInfo object reference
  
  // Get available versions for current language - memoized to prevent recalculation
  const versions = useMemo(() => languageVersions[language] || [], [language]);
  
  // Handlers - memoized to prevent unnecessary re-renders
  const handleLanguageChange = useCallback((newLanguage) => {
    setLanguage(newLanguage);
    setCode(sampleCodes[newLanguage] || sampleCodes.javascript);
    setVersion("0");
  }, []);
  
  const handleVersionChange = useCallback((newVersion) => {
    setVersion(newVersion);
  }, []);
  
  const handleRun = useCallback(() => {
    executeCode({
      code,
      language,
      version,
      userInput,
      cmdArgs,
    });
  }, [code, language, version, userInput, cmdArgs, executeCode]);
  
  const handleDownload = useCallback(() => {
    handleDownloadClick(code, languageExtensions[language]);
  }, [code, language]);
  
  const handleUpload = useCallback((event) => {
    handleFileUpload(event, setCode, setLanguage, languageExtensions);
  }, [setCode, setLanguage]);
  
  const isNewProject = useMemo(() => !projectId || !isOwner, [projectId, isOwner]);
  
  return (
    <div className="editor-container">
      <div className="editor-sidebar">
        <SideBar
          theme={theme}
          setEditorTheme={setEditorTheme}
          handleDownloadClick={handleDownload}
          setCode={setCode}
          setLangauge={setLanguage}
          languageExtensions={languageExtensions}
          handleFileUpload={handleUpload}
          code={code}
          language={language}
          langVersion={version}
          cmd={cmdArgs}
          params={userInput}
          projectId={projectId}
          newProject={isNewProject}
          setNewProject={() => {}}
          collabId={collabId}
          userInfo={userInfo}
          projectInfo={projectInfo}
        >
          {projectInfo && (
            <div className="project-info-secion">
              <div>
                <div className="name">{projectInfo.projectName}</div>
                <Link
                  to={`/public/user/${projectInfo.author?._id}#projects`}
                  className="text-decoration-none black-link"
                >
                  <div className="author">{projectInfo.author?.name}</div>
                </Link>
              </div>
              <div>
                <div className="created text-muted">{projectInfo.createdAt}</div>
                <div className="updated text-muted">{projectInfo.updatedAt}</div>
              </div>
            </div>
          )}
        </SideBar>
      </div>
      
      <div className="editor-main">
        <CodeEditorPanel
          code={code}
          language={language}
          version={version}
          versions={versions}
          editorTheme={editorTheme}
          theme={theme}
          onCodeChange={setCode}
          onLanguageChange={handleLanguageChange}
          onVersionChange={handleVersionChange}
          onRun={handleRun}
        />
        
        <OutputPanel
          result={result}
          setResult={setResult}
          isCompiling={isCompiling}
          cmdArgs={cmdArgs}
          userInput={userInput}
          theme={theme}
          onCmdArgsChange={setCmdArgs}
          onUserInputChange={setUserInput}
          code={code}
          language={language}
          jsRun={jsRun}
        />
      </div>
    </div>
  );
};

export default Editor2;


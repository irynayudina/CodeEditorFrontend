import React, { useState, useRef, useEffect } from "react";
import "./Editor.scss";
import axios from "axios";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import JsRunner from "./JsRunner";
import {
  sampleCodes,
  languageVersions,
  languages,
  languageExtensions,
} from "./EditorData.ts";
import { languageAutocompletions } from "./LanguageAutocompletions";
import SideBar from "./Sidebar/SideBar";
import ResizePannel from "./ResizePannel/ResizePannel";
import { handleDownloadClick, handleFileUpload } from "./WorkWithCodeFile";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { autocompletion } from "@codemirror/autocomplete";

import { okaidia } from "@uiw/codemirror-theme-okaidia";
import {
  githubLight,
  githubLightInit,
  githubDark,
  githubDarkInit,
} from "@uiw/codemirror-theme-github";
import {
  noctisLilac,
  noctisLilacInit,
} from "@uiw/codemirror-theme-noctis-lilac";
import { abcdef } from "@uiw/codemirror-theme-abcdef";
import { androidstudio } from "@uiw/codemirror-theme-androidstudio";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { aura } from "@uiw/codemirror-theme-aura";
import { bbedit } from "@uiw/codemirror-theme-bbedit";
import { bespin } from "@uiw/codemirror-theme-bespin";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { duotoneLight, duotoneDark } from "@uiw/codemirror-theme-duotone";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { gruvboxDark, gruvboxLight } from "@uiw/codemirror-theme-gruvbox-dark";
import {
  materialDark,
  materialDarkInit,
  materialLight,
  materialLightInit,
} from "@uiw/codemirror-theme-material";
import { nord, nordInit } from "@uiw/codemirror-theme-nord";
import {
  solarizedLight,
  solarizedLightInit,
  solarizedDark,
  solarizedDarkInit,
} from "@uiw/codemirror-theme-solarized";
import { sublime, sublimeInit } from "@uiw/codemirror-theme-sublime";
import { tokyoNight, tokyoNightInit } from "@uiw/codemirror-theme-tokyo-night";
import { vscodeDark, vscodeDarkInit } from "@uiw/codemirror-theme-vscode";
import {
  xcodeLight,
  xcodeLightInit,
  xcodeDark,
  xcodeDarkInit,
} from "@uiw/codemirror-theme-xcode";

const Editor = (props) => {
  const defaultResult = `<p class="text-muted">&lt;--------Output of your program goes here --------&gt;</p>`;
  const [code, setCode] = useState(sampleCodes.javascript);
  const [language, setLangauge] = useState("javascript");
  const [version, setVersion] = useState("0");
  const [versions, setVersions] = useState(languageVersions.javascript);
  const [result, setResult] = useState(defaultResult);
  const [compiling, setCompiling] = useState(false);
  const [jsRun, setRunJs] = useState(0);
  const [cmdargs, setCmdargs] = useState("");
  const [userinp, setUserinp] = useState("");
  const [editorTheme, setEditorTheme] = useState(okaidia);
  const [viewUpdateState, setViewUpdateState] = useState();
  const [cmValuePrevious, setCmValuePrevious] = useState();
  const [expanded, setExpanded] = useState("expandedCustom-pannel");
  const [errorLines, setErrorLines] = useState([]);
  const [errorLinesContent, setErrorLinesContent] = useState(['using namespace std;', 'cout<<\"Hello World2\" << \" \";'])

  const autocompleteOptions =
    language == "cpp14"
      ? languageAutocompletions["cpp"]
      : language == "cpp17"
      ? languageAutocompletions["cpp"]
      : language == "python3"
      ? languageAutocompletions["python2"]
      : languageAutocompletions[language];
  function myCompletions(context) {
    let word = context.matchBefore(/\w*/);
    if (word.from == word.to && !context.explicit) return null;
    return {
      from: word.from,
      options: autocompleteOptions,
    };
  }
  const extensionsObj = autocompleteOptions
    ? [
        javascript({ jsx: true, ts: true }),
        autocompletion({
          override: [myCompletions],
        }),
      ]
    : [javascript({ jsx: true, ts: true })];

  useEffect(() => {
    if (props.theme === "lighttheme") {
      let themeName = localStorage.getItem("editorThemeStoredLight");
      switch (themeName) {
        case "githubLight":
          setEditorTheme(githubLight);
          break;
        case "noctisLilac":
          setEditorTheme(noctisLilac);
          break;
        case "bbedit":
          setEditorTheme(bbedit);
          break;
        case "duotoneLight":
          setEditorTheme(duotoneLight);
          break;
        case "eclipse":
          setEditorTheme(eclipse);
          break;
        case "gruvboxLight":
          setEditorTheme(gruvboxLight);
          break;
        case "materialLight":
          setEditorTheme(materialLight);
          break;
        case "solarizedLight":
          setEditorTheme(solarizedLight);
          break;
        case "xcodeLight":
          setEditorTheme(xcodeLight);
          break;
        default:
          setEditorTheme(githubLight);
          break;
      }
    } else {
      let themeName = localStorage.getItem("editorThemeStoredDark");
      switch (themeName) {
        case "okaidia":
          setEditorTheme(okaidia);
          break;
        case "abcdef":
          setEditorTheme(abcdef);
          break;
        case "androidstudio":
          setEditorTheme(androidstudio);
          break;
        case "atomone":
          setEditorTheme(atomone);
          break;
        case "aura":
          setEditorTheme(aura);
          break;
        case "bespin":
          setEditorTheme(bespin);
          break;
        case "darcula":
          setEditorTheme(darcula);
          break;
        case "dracula":
          setEditorTheme(dracula);
          break;
        case "duotoneDark":
          setEditorTheme(duotoneDark);
          break;
        case "githubDark":
          setEditorTheme(githubDark);
          break;
        case "gruvboxDark":
          setEditorTheme(gruvboxDark);
          break;
        case "materialDark":
          setEditorTheme(materialDark);
          break;
        case "nord":
          setEditorTheme(nord);
          break;
        case "solarizedDark":
          setEditorTheme(solarizedDark);
          break;
        case "sublime":
          setEditorTheme(sublime);
          break;
        case "tokyoNight":
          setEditorTheme(tokyoNight);
          break;
        case "vscodeDark":
          setEditorTheme(vscodeDark);
          break;
        case "xcodeDark":
          setEditorTheme(xcodeDark);
          break;
        default:
          setEditorTheme(okaidia);
          break;
      }
    }
  }, [props.theme]);
  const userinpHandler = (e) => {
    setUserinp(e.target.value);
  };
  const cmdHandler = (e) => {
    setCmdargs(e.target.value);
  };
  const onChangeCM = React.useCallback((value, viewUpdate) => {
    setCode(value);
    setViewUpdateState(viewUpdate);
  }, []);
  const languageHandler = (e) => {
    const lang = e.target.value;
    setLangauge(lang);
    setVersions(languageVersions[lang]);
    setCode(sampleCodes[lang]);
    setResult(defaultResult);
    setCmdargs("");
    setUserinp("");
    setErrorLines([]);
  };
  const versionHandler = (e) => {
    setVersion(e.target.value);
  };
  const execute = (e) => {
    e.preventDefault();
    setCompiling(true);
    if (language === "javascript") {
      setRunJs((value) => (value += 1));
      setCompiling(false);
      return;
    }
    setRunJs(0);
    const data = {
      code: code,
      language: language,
      version: version,
      userInput: userinp,
      cmdargs: cmdargs,
    };
    axios
      .post("http://localhost:5000/editor/execute", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setResult(response.data.output);
          console.log(response);
          setCompiling(false);
          const errorText = response.data.output;
          const errorLineMatches =
            errorText.match(/([a-z]+\.cpp:)([0-9]+)/gi) || [];
          const errorLinesArr = errorLineMatches.map((match) =>
            parseInt(match.split(":")[1])
          );
          console.log("Error lines:", errorLinesArr);
          setErrorLines(errorLinesArr);
        } else {
          setResult("error in response");
          setCompiling(false);
          throw new Error("Network response was not ok: ", response);
        }
      })
      .catch((error) => {
        console.error(error);
        setResult("error in request");
        setCompiling(false);
      });
  };
  const downloadFileLocally = () => {
    handleDownloadClick(code, languageExtensions[language]);
  };
  useEffect(() => {
    highlightErrors();
  }, [errorLines]);
  useEffect(() => {
    let timeoutId;
    moveErrors()
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      highlightErrors();
    }, 500);
  }, [viewUpdateState, errorLines])
  const moveErrors = () => {
    if (viewUpdateState) {
      const newCmValue = viewUpdateState.state.doc;
      console.log(newCmValue);
      console.log(newCmValue.constructor.name);
      if (cmValuePrevious && newCmValue && cmValuePrevious.text && newCmValue.text&& cmValuePrevious !== newCmValue) {
        let previousErrorContent = []
        for (let i = 0; i < errorLines.length; i++){
          previousErrorContent.push(cmValuePrevious.text[errorLines[i] - 1].trim())
        }
        console.log('prev: ',previousErrorContent)
        if (cmValuePrevious.text.length < newCmValue.text.length) {
          const errorLinesVar = errorLines;
          for (let i = 0; i < newCmValue.text.length; i++) {
            if (cmValuePrevious.text[i] !== newCmValue.text[i]) {
              for (let j = 0; j < errorLines.length; j++) {
                if (errorLinesVar[j] >= i + 1) {
                  errorLinesVar[j] += 1;
                }
              }
              break;
            }
          }
          setErrorLines(errorLinesVar);
        } else if (cmValuePrevious.text.length > newCmValue.text.length) {
          const errorLinesVar = errorLines;
          for (let i = 0; i < cmValuePrevious.text.length; i++) {
            if (cmValuePrevious.text[i] !== newCmValue.text[i]) {
              for (let j = 0; j < errorLines.length; j++) {
                if (errorLinesVar[j] > i + 1) {
                  errorLinesVar[j] -= 1;
                }
              }
              break;
            }
          }
          setErrorLines(errorLinesVar);
        }
        let currentErrorContent = []
        for (let i = 0; i < errorLines.length; i++){
          currentErrorContent.push(newCmValue.text[errorLines[i] - 1].trim())
        }
        console.log('current: ', currentErrorContent)
        for (let i = 0; i < errorLines.length; i++){
          if (currentErrorContent[i] !== previousErrorContent[i]) {
            console.log('remove error', i)
            errorLines.splice(i, 1)
          }
        }
      }
      setCmValuePrevious(viewUpdateState.state.doc);
    }
  }
  const highlightErrors = () => {
    const linesEditor = document.getElementsByClassName("cm-line");
    if (linesEditor.length >= errorLines.length) {
      errorLines.forEach((lineNumber) => {
        linesEditor[lineNumber - 1].classList.add("error-line");
      });
    }
    console.log("we r highlighting");
  };
  useEffect(() => {
    document.addEventListener('click', highlightErrors)
    document.addEventListener('touchstart', highlightErrors);
    return () => {
      document.removeEventListener('click', highlightErrors)
      document.removeEventListener('touchstart', highlightErrors);
    };
  });
  return (
    <ResizePannel
      id='pannelEditor'
      theme={props.theme}
      expanded={expanded}
      highlightErrors={highlightErrors}
    >
      <div className="elem elem1">
        <SideBar
          theme={props.theme}
          editorSize={props.editorSize}
          setExpanded={setExpanded}
          expanded={expanded}
          setEditorTheme={setEditorTheme}
          handleDownloadClick={downloadFileLocally}
          setCode={setCode}
          handleFileUpload={handleFileUpload}
        />
      </div>
      <div className={`elem elem2 ${props.theme}`} id='CodeEditor'>
        <Form.Select
          size="sm"
          style={{ width: "auto", float: "left" }}
          onChange={languageHandler}
          className={`select ${props.theme}`}
        >
          {Object.keys(languages).map((key) => (
            <option key={key} value={key}>
              {languages[key]}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          size="sm"
          style={{ width: "auto" }}
          onChange={versionHandler}
          className={`select ${props.theme}`}
        >
          {versions?.map((v, i) => (
            <option key={i} value={i}>
              {v}
            </option>
          ))}
        </Form.Select>
        <CodeMirror
          value={code}
          mode={language}
          theme={editorTheme}
          height="546px"
          className="overflow-hidden"
          style={{ overflowX: "scroll", margin: "0.5rem 0 0.5rem 0" }}
          extensions={extensionsObj}
          onChange={onChangeCM}
        />
        <Button
          variant={props.theme == "lighttheme" ? "primary" : "dark"}
          // size={`${props.editorSize}`}
          className={`btn-editor-${props.editorSize}`}
          onClick={execute}
          style={{ marginBottom: "calc(1rem - 1px)" }}
        >
          Run
        </Button>
        <Button onClick={highlightErrors}>highlight errors</Button>
      </div>
      <div className={`elem ${props.theme}`}>
        <Form.Label
          style={{
            float: "left",
            marginRight: "0.5rem",
            marginLeft: "0.5rem",
            marginTop: "0.2rem",
          }}
          className={`text ${props.theme}`}
        >
          CMD arguments
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={1}
          placeholder="command line"
          size="sm"
          style={
            props.theme == "lighttheme"
              ? {
                  maxWidth: "calc(100% - 124px - 0.5rem)",
                  minWidth: "120px",
                  marginLeft: "0.5rem",
                }
              : {
                  maxWidth: "calc(100% - 124px - 0.5rem - 6px)",
                  minWidth: "120px",
                  marginLeft: "0.5rem",
                }
          }
          value={cmdargs}
          onChange={cmdHandler}
          className={`inp ${props.theme}`}
        />
        <div className={`result ${props.theme}`}>
          {compiling ? (
            "compiling..."
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: result.replace(/\n/g, "<br />"),
              }}
            ></div>
          )}
        </div>
        <div className="botInp">
          <Form.Label
            style={{ float: "left", margin: "0.5rem", marginTop: "0.5rem" }}
            className={`text ${props.theme}`}
          >
            Standard inputs
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="standard inputs separated by newline"
            size="md"
            style={
              props.theme == "lighttheme"
                ? {
                    maxWidth: "calc(100% - 120px - 0.5rem)",
                    minWidth: "120px",
                    marginLeft: "0.5rem",
                  }
                : {
                    maxWidth: "calc(100% - 120px - 0.5rem - 6px)",
                    minWidth: "120px",
                    marginLeft: "0.5rem",
                  }
            }
            value={userinp}
            onChange={userinpHandler}
            className={`inp ${props.theme}`}
          />
        </div>
        <JsRunner
          code={code}
          result={result}
          setResult={setResult}
          jsRun={jsRun}
        />
      </div>
    </ResizePannel>
  );
};

export default Editor;

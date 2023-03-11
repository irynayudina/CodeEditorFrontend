import React, { useState, useRef, useEffect } from 'react'
import axios from "axios";
import './Editor.scss'

import JsRunner from './JsRunner';
import { sampleCodes, languageVersions, languages } from './EditorData.ts'
import { languageAutocompletions } from './LanguageAutocompletions';
import SideBar from '../../elements/Sidebar/SideBar';
import ResizePannel from '../../elements/ResizePannel/ResizePannel';

import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


import CodeMirror from '@uiw/react-codemirror';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { githubLight, githubLightInit, githubDark, githubDarkInit } from '@uiw/codemirror-theme-github';
import { javascript } from '@codemirror/lang-javascript';
import { autocompletion } from '@codemirror/autocomplete';


const Editor = (props) => {
    const defaultResult = `<p class="text-muted">&lt;--------Output of your program goes here --------&gt;</p>`;
    const [code, setCode] = useState(sampleCodes.javascript)
    const [language, setLangauge] = useState("javascript")
    const [version, setVersion] = useState("0")
    const [versions, setVersions] = useState(languageVersions.javascript);
    const [result, setResult] = useState(defaultResult)
    const [compiling, setCompiling] = useState(false)
    const [jsRun, setRunJs] = useState(0)
    const [cmdargs, setCmdargs] = useState("")
    const [userinp, setUserinp] = useState("")
    const [editorTheme, setEditorTheme] = useState(okaidia)

    const extensionsObj = languageAutocompletions[language] ? [javascript({ jsx: true, ts: true }),
        autocompletion({ override: [languageAutocompletions[language]] })] : [javascript({ jsx: true, ts: true })
    ]
    
    useEffect(() => {
        if (props.theme === "lighttheme") {
            setEditorTheme(githubLight)
        } else {
            setEditorTheme(okaidia)
        }
        console.log(languageAutocompletions[language])
    }, [props.theme])

    const userinpHandler = (e) => {
        setUserinp(e.target.value)
    }
    const cmdHandler = (e) => {
        setCmdargs(e.target.value);
        console.log(cmdargs)
    }
    const onChangeCM = React.useCallback((value, viewUpdate) => {
        setCode(value)
    }, []);
    const languageHandler = (e) => {
        const lang = e.target.value
        setLangauge(lang)
        setVersions(languageVersions[lang])
        setCode(sampleCodes[lang])
        setResult(defaultResult)
        setCmdargs("")
        setUserinp("")
    }
    const versionHandler = (e) => {
        setVersion(e.target.value);
    }
    const execute = (e) => {
        e.preventDefault();
        setCompiling(true)
        if (language === "javascript") {
            setRunJs(value => value +=1);
            setCompiling(false);
            return;
        }
        setRunJs(0);
        const data = { code: code, language: language, version: version, userInput: userinp, cmdargs: cmdargs};
        axios.post('http://localhost:5000/editor/execute', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                setResult(response.data.output);
                console.log(result)
                setCompiling(false)
            } else {
                setResult('error in response')
                setCompiling(false)
                throw new Error('Network response was not ok: ', response);
            }
        }) 
            .catch(error => {
                console.error(error);
                setResult('error in request')
                setCompiling(false)
            });
    }
    function myCompletions(context) {
        let word = context.matchBefore(/\w*/)
        if (word.from == word.to && !context.explicit)
          return null
        return {
          from: word.from,
          options: [
            {label: "match", type: "keyword"},
            {label: "hello", type: "variable", info: "(World)"},
            {label: "magic", type: "text", apply: "⠁⭒*.✩.*⭒⠁", detail: "macro"}
          ]
        }
    }
    const [expanded, setExpanded] = useState("expandedCustom-pannel")
    return (
        <ResizePannel theme={props.theme} expanded={expanded}>
            <div className="elem elem1"><SideBar theme={props.theme} editorSize={props.editorSize}
                setExpanded={setExpanded} expanded={expanded}
            /></div>
            <div className="elem elem2">
                <Form.Select size="sm" style={{ width: "auto", float: "left" }} onChange={languageHandler}
                    className={`select ${props.theme}`}
                >
                    {Object.keys(languages).map((key) => (
                        <option key={key} value={key}>
                            {languages[key]}
                        </option>
                    ))}
                </Form.Select>
                <Form.Select size="sm" style={{ width: "auto" }} onChange={versionHandler}
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
                    style={{overflowX:"scroll", margin:"0.5rem 0 0.5rem 0"}}
                    extensions={extensionsObj}
                    onChange={onChangeCM}
                />
                <Button variant="primary" size={`${props.editorSize}`} className={`btn-editor-${props.editorSize}`}
                    onClick={execute} style={{ marginBottom: "calc(1rem - 1px)" }}
                >Run</Button>
            </div>
            <div className="elem">
                <Form.Label style={{ float: "left", marginRight: "0.5rem", marginLeft: "0.5rem", marginTop: "0.2rem" }}
                    className={`text ${props.theme}`}
                >CMD arguments</Form.Label>
                <Form.Control as="textarea" rows={1} placeholder="command line" size="sm"
                    style={{ maxWidth: "calc(100% - 124px - 0.5rem - 6px)", minWidth: "120px", marginLeft: "0.5rem" }}
                    value={cmdargs} onChange={cmdHandler} className={`inp ${props.theme}`}
                />
                <div className={`result ${props.theme}`}>
                    {compiling ? 'compiling...' : <div dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />') }}></div>}
                </div>
                <div className="botInp">
                    <Form.Label style={{ float: "left", margin: "0.5rem", marginTop: "0.5rem" }}
                        className={`text ${props.theme}`}
                    >Standard inputs</Form.Label>
                    <Form.Control as="textarea" rows={2} placeholder="standard inputs separated by newline" size="md"
                        style={{ maxWidth: "calc(100% - 120px - 0.5rem - 6px)", minWidth: "120px", marginLeft: "0.5rem" }}
                        value={userinp} onChange={userinpHandler}
                        className={`inp ${props.theme}`}
                    />
                </div>
                <JsRunner code={code} result={result} setResult={setResult} jsRun={jsRun} />
            </div>
            </ResizePannel>
    )
}

export default Editor
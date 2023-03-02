import React, { useState, useRef, useEffect } from 'react'
import axios from "axios";
import { sampleCodes, languageVersions, languages } from './EditorData.ts'
import JsRunner from './JsRunner';
import CodeMirror from '@uiw/react-codemirror';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { javascript } from '@codemirror/lang-javascript';

const Editor = (props) => {
    const [code, setCode] = useState(sampleCodes.cpp)
    const [language, setLangauge] = useState("javascript")
    const [version, setVersion] = useState("0")
    const [versions, setVersions] = useState(languageVersions.javascript);
    const [result, setResult] = useState("")
    const [compiling, setCompiling] = useState(false)
    const [jsRun, setRunJs] = useState(false)

    const onChangeCM = React.useCallback((value, viewUpdate) => {
        console.log('value:', value);
        setCode(value)
      }, []);
    const codeHandler = (e) => {
        setCode(e.target.value);
    }
    const languageHandler = (e) => {
        const lang = e.target.value
        setLangauge(lang)
        setVersions(languageVersions[lang])
        setCode(sampleCodes[lang])
    }
    const versionHandler = (e) => {
        setVersion(e.target.value);
    }
    const execute = (e) => {
        e.preventDefault();
        setCompiling(true)
        if (language === "javascript") {
            setRunJs(value => !value);
            setCompiling(false);
            return;
        }
        const data = { code: code, language: language, version: version };
        axios.post('http://localhost:5000/editor/execute', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
                if (response.status === 200) {
                    setResult(response.data.output);
                    console.log(response.data);
                    setCompiling(false)
                } else {
                    setResult('error in response')
                    setCompiling(false)
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Problem with the fetch operation:', error);
                setResult('error in request')
                setCompiling(false)
            });
    }
    return (
        <div>
            <div className="form-wrap">
                <h1 style={{ float: "left", color: "#4a70ec" }}>Editor</h1>
            </div>
            <form className="editor-form">
                <div className={`form-container ${props.theme}`}>
                    <div className="form-container-header">
                        <select onChange={languageHandler}>
                            {Object.keys(languages).map((key) => (
                                <option key={key} value={key}>
                                    {languages[key]}
                                </option>
                            ))}
                        </select>
                        <select onChange={versionHandler}>
                            {versions?.map((v, i) => (<option key={i} value={i}>{v}</option>))}                            
                        </select>
                    </div>
                    <div className="form-container-message">
                        <textarea style={{width:"400px", height:"200px"}} placeholder="Program code"
                            name="code"
                            onChange={codeHandler}
                            value={code}
                        />
                    </div>
                    <div>
                    <CodeMirror
                        value={code}
                        height="200px"
                        width="400px"
                        theme={okaidia}
                        extensions={[javascript({ jsx: true })]}
                        onChange={onChangeCM}
                    />
                    </div>
                    <div className="form-container-button">
                        <button type="submit" onClick={execute}>
                            <h2>Run</h2>
                        </button>
                    </div>
                </div>
            </form>
            <div className="result">
                {compiling ? 'compiling...' : result}
            </div>            
            <JsRunner code={code} result={result} setResult = {setResult} jsRun={jsRun} />
        </div>
    )
}

export default Editor
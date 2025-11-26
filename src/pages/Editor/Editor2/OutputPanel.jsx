import React from "react";
import { Form } from "react-bootstrap";
import JsRunner from "../Syntax/JsRunner";

const OutputPanel = ({
  result,
  setResult,
  isCompiling,
  cmdArgs,
  userInput,
  theme,
  onCmdArgsChange,
  onUserInputChange,
  code,
  language,
  jsRun,
}) => {
  const defaultResult = `<p class="text-muted">&lt;--------Output of your program goes here --------&gt;</p>`;
  const displayResult = result || defaultResult;

  return (
    <div className={`elem ${theme}`}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Form.Label className={`text ${theme}`} style={{ margin: 0, fontWeight: 500 }}>
          CMD arguments
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={1}
          placeholder="command line"
          size="sm"
          value={cmdArgs}
          onChange={(e) => onCmdArgsChange(e.target.value)}
          className={`inp ${theme} editor-input-up`}
          style={{ borderRadius: "6px", border: "1px solid var(--border-color, #d1d5db)" }}
        />
      </div>
      
      <div className={`result ${theme}`} style={{ flex: 1, minHeight: 0 }}>
        {isCompiling ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-secondary)" }}>
            <span>Compiling...</span>
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: displayResult.replace(/\n/g, "<br />"),
            }}
          />
        )}
      </div>
      
      <div className="botInp" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Form.Label className={`text ${theme}`} style={{ margin: 0, fontWeight: 500 }}>
          Standard inputs
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="standard inputs separated by newline"
          size="md"
          value={userInput}
          onChange={(e) => onUserInputChange(e.target.value)}
          className={`inp ${theme} editor-input-down`}
          style={{ borderRadius: "6px", border: "1px solid var(--border-color, #d1d5db)" }}
        />
      </div>
      
      {language === "javascript" && (
        <JsRunner
          code={code}
          result={result}
          setResult={setResult}
          jsRun={jsRun}
        />
      )}
    </div>
  );
};

export default OutputPanel;


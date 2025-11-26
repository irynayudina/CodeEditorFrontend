import React, { useMemo } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { autocompletion } from "@codemirror/autocomplete";
import { languages } from "../Syntax/EditorData.ts";
import { languageAutocompletions } from "../Syntax/LanguageAutocompletions";

const CodeEditorPanel = ({
  code,
  language,
  version,
  versions,
  editorTheme,
  theme,
  onCodeChange,
  onLanguageChange,
  onVersionChange,
  onRun,
}) => {
  // Memoize extensions to prevent CodeMirror reinitialization and script injection
  const extensions = useMemo(() => {
    // Autocomplete setup
    const autocompleteOptions =
      language === "cpp14" || language === "cpp17"
        ? languageAutocompletions["cpp"]
        : language === "python3"
        ? languageAutocompletions["python2"]
        : languageAutocompletions[language];

    if (!autocompleteOptions) {
      return [javascript({ jsx: true, ts: true })];
    }

    const myCompletions = (context) => {
      let word = context.matchBefore(/\w*/);
      if (word.from === word.to && !context.explicit) return null;
      return {
        from: word.from,
        options: autocompleteOptions || [],
      };
    };

    return [
      javascript({ jsx: true, ts: true }),
      autocompletion({ override: [myCompletions] }),
    ];
  }, [language]); // Only recreate when language changes

  // Memoize style object to prevent unnecessary re-renders
  const codeMirrorStyle = useMemo(
    () => ({ overflowX: "auto", width: "100%" }),
    []
  );

  return (
    <div className={`elem elem2 ${theme}`} id="CodeEditor">
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
        <Form.Select
          size="sm"
          style={{ width: "auto", minWidth: "150px" }}
          onChange={(e) => onLanguageChange(e.target.value)}
          value={language}
          className={`select ${theme}`}
        >
          {Object.keys(languages).map((key) => (
            <option key={key} value={key}>
              {languages[key]}
            </option>
          ))}
        </Form.Select>
        
        <Form.Select
          size="sm"
          style={{ width: "auto", minWidth: "120px" }}
          onChange={(e) => onVersionChange(e.target.value)}
          value={version}
          className={`select ${theme}`}
        >
          {versions.map((v, i) => (
            <option key={i} value={i}>
              {v}
            </option>
          ))}
        </Form.Select>
      </div>
      
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <CodeMirror
          value={code}
          height="100%"
          className="overflow-hidden"
          style={{ ...codeMirrorStyle, flex: 1, minHeight: 0, height: "100%" }}
          theme={editorTheme}
          extensions={extensions}
          onChange={onCodeChange}
        />
      </div>
      
      <Button
        variant={theme === "lighttheme" ? "primary" : "dark"}
        className="btn-editor"
        onClick={onRun}
      >
        Run
      </Button>
    </div>
  );
};

export default React.memo(CodeEditorPanel);


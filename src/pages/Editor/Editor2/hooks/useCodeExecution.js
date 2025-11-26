import { useState } from "react";
import axios from "axios";
import { parseErrors } from "../../Syntax/WorkWithErrors";

export const useCodeExecution = () => {
  const [result, setResult] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [errorLines, setErrorLines] = useState([]);
  const [jsRun, setJsRun] = useState(0);

  const executeCode = async ({ code, language, version, userInput, cmdArgs }) => {
    setIsCompiling(true);
    
    // Handle JavaScript execution locally via JsRunner
    if (language === "javascript") {
      setJsRun((prev) => prev + 1);
      setIsCompiling(false);
      return;
    }

    // Execute other languages via API
    try {
      const response = await axios.post(
        "https://codeeditorbackend-production.up.railway.app/editor/execute",
        {
          code,
          language,
          version,
          userInput,
          cmdargs: cmdArgs,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setResult(response.data.output || "");
        parseErrors(response, setErrorLines, language);
      } else {
        setResult("Error in response");
      }
    } catch (error) {
      setResult("Error in request: " + (error.response?.data?.message || error.message));
    } finally {
      setIsCompiling(false);
    }
  };

  return {
    result,
    setResult,
    isCompiling,
    errorLines,
    jsRun,
    executeCode,
  };
};


import React, {useEffect} from 'react'

const JsRunner = ({code, setResult, result, jsRun}) => {
    function runJs(jsString) {
      const logs = [];
      const originalConsoleLog = console.log;
      console.log = function() {
        logs.push(Array.from(arguments));
        originalConsoleLog.apply(console, arguments);
      };  
      try {
        const parsedCode = eval(jsString);
        setResult(parsedCode);
      } catch (error) {
        console.error('There was an error in executing the JavaScript code:', error);
        setResult('error in execution js');
      }
      console.log = originalConsoleLog;
      setResult(logs);
    }
    useEffect(() => {
        runJs(code)
    }, [jsRun]);
  return (
    <div>
        <button onClick={() => runJs(code)}>
          Run JavaScript
        </button>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
  )
}

export default JsRunner
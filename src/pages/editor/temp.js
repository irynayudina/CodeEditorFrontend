let previousErrorContent = []
        for (let i = 0; i < errorLines.length; i++){
          previousErrorContent.push(cmValuePrevious.text[errorLines[i] - 1])
        }
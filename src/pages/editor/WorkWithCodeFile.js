export const handleDownloadClick = (code, extention) => {
    // code to download file
    const fileContents = code;
    const file = new Blob([fileContents], { type: 'text/plain' });
    const fileURL = URL.createObjectURL(file);
    const downloadLink = document.createElement('a');
    downloadLink.href = fileURL;
    downloadLink.download = `myFile.${extention}`;
    downloadLink.click();
    URL.revokeObjectURL(fileURL);
  };
  
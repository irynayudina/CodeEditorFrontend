import React, { useState } from "react";
import { Resizable, ResizableBox, ResizeObserver } from "react-resizable";
import "react-resizable/css/styles.css";
import './Challenge.scss'

const Challenge = () => {
  function convertVhToPx(valueInVh) {
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    const valueInPx = (valueInVh / 100) * vh;
    return valueInPx;
  }
  function vwToPx(valueInVw) {
    const pixelValue = (valueInVw / 100) * window.innerWidth;
    return pixelValue;
  }
  const horizontalLayoutOffset = 58;
  const section1Height = convertVhToPx(100) - horizontalLayoutOffset;
  const section23Widths = vwToPx(50);
  const section2HeightInit = (convertVhToPx(100) - horizontalLayoutOffset) * 0.75;
  const section3HeightInit = (convertVhToPx(100) - horizontalLayoutOffset) * 0.25;
  const [section1Width, setSection1Width] = useState(section23Widths);
  const [section2Width, setSection2Width] = useState(section23Widths);
  const [section3Width, setSection3Width] = useState(section23Widths);
  const [section2Height, setSection2Height] = useState(section2HeightInit)
  const [section3Height, setSection3Height] = useState(section3HeightInit);

  const handleSection1Resize = (event, { size }) => {
    const newSection1Width = size.width;
    setSection1Width(newSection1Width);
    const remainingWidth = window.innerWidth - newSection1Width;
    const newSection23Width = remainingWidth;
    setSection2Width(newSection23Width);
    setSection3Width(newSection23Width);
  };

  const handleSection2Resize = (event, { size }) => {
    setSection2Width(section2Width);
    const newSection2Height = size.height;
    setSection2Height(size.height);
    const remainingHeight = window.innerHeight - newSection2Height - horizontalLayoutOffset;
    setSection3Height(remainingHeight);
  };
  
  return (
    <div>
      <div className="challenge-page">
        <ResizableBox
          width={section1Width}
          height={section1Height}
          minConstraints={[200, section1Height]}
          maxConstraints={[1400, section1Height]}
          onResize={handleSection1Resize}
          className="challenge-section"
        >
          <div>Section 1</div>
        </ResizableBox>
        <div className="right-side-challenge-layout">
          <ResizableBox
            width={section2Width}
            height={section2Height}
            minConstraints={[section2Width, 100]}
            maxConstraints={[section2Width, section1Height]}
            onResize={handleSection2Resize}
            className="challenge-section"
          >
            <div>Section 2</div>
          </ResizableBox>
          <ResizableBox
            width={section3Width}
            height={section3Height}
            minConstraints={[section3Width, section3Height]}
            maxConstraints={[section3Width, section3Height]}
            className="challenge-section"
          >
            <div>Section 3</div>
          </ResizableBox>
        </div>
      </div>
    </div>
  );
};

export default Challenge;


import React, { useState, useRef, useEffect } from 'react';
import './ResizePannel.scss';

const ResizePannel = ({ children }) => {
  
  const [sideWidth, setSideWidth] = useState(17);
  const [leftWidth, setLeftWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(null);
  const startResizing = () => {
    setIsResizing(true);
  };
  const stopResizing = () => {
    setIsResizing(false);
    };
  const handleResize = (e) => {
    if (!isResizing) return;
    const resizeWidth = resizeRef.current.offsetWidth;
    const containerWidth = resizeRef.current.parentNode.offsetWidth;
    // subtracting the left edge of the container element from the current position of the mouse pointer
    const leftItemWidth = e.pageX - resizeRef.current.parentNode.offsetLeft;
    const rightItemWidth = containerWidth - leftWidth - resizeWidth;
    setLeftWidth((leftItemWidth / containerWidth) * 100);
  };
  const [isResizingSide, setIsResizingSide] = useState(false);
  const resizeRefSide = useRef(null);
  const startResizingSide = () => {
    setIsResizingSide(true);
  };
  const stopResizingSide = () => {
    setIsResizingSide(false);
    };
  const handleResizeSide = (e) => {
    if (!isResizingSide) return;
    const resizeWidth = resizeRefSide.current.offsetWidth;
    const containerWidth = resizeRefSide.current.parentNode.offsetWidth;
    const leftItemWidth = e.pageX - resizeRefSide.current.parentNode.offsetLeft;
    const rightItemWidth = containerWidth - leftWidth - resizeWidth;
    setSideWidth((leftItemWidth / containerWidth) * 100);
  };

  useEffect(() => {
    // const resizeableEle = ref.current;
    // const styles = window.getComputedStyle(resizeableEle);
    // let width = parseInt(styles.width, 10);
    // // let height = parseInt(styles.height, 10);
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResizing);
    document.addEventListener('mousemove', handleResizeSide);
    document.addEventListener('mouseup', stopResizingSide);
    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResizing);
      document.removeEventListener('mousemove', handleResizeSide);
      document.removeEventListener('mouseup', stopResizingSide);
    };
  });

  return (
    <div className="pannel-resize">
      <div className="item side-item"
        style={{ width: `${sideWidth}%` }}
      ></div>
      <div
        className="resize-controll"
        onMouseDown={startResizingSide}
        ref={resizeRefSide}
      ></div>
      <div className="two-main-items" style={{ width: `${100 - sideWidth}%` }}>
        <div className="item left-item"
          style={{ width: `${leftWidth}%` }}
        ></div>
        <div
          className="resize-controll"
          onMouseDown={startResizing}
          ref={resizeRef}
        ></div>
        <div
          className="item right-item"
          style={{ width: `${100 - leftWidth}%` }}
        >{children}</div>
      </div>
    </div>
  );
};

export default ResizePannel;

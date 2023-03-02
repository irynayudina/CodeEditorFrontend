import React, {useEffect, useState} from 'react'
import './Sun.scss'

const Sun = () => {
  const [transform3, setTransform3] = useState("rotateZ(45deg)")
  const [transform3_2, setTransform3_2] = useState("rotateZ(45deg)")
  const [transform4, setTransform4] = useState("rotate(-45deg)")
  const [transform4_2, setTransform4_2] = useState("rotate(-45deg)")
  function rayShiftBack(lineShort, lineThick, iconSize) {
    const halfDiagonal = Math.sqrt(Math.pow(lineShort, 2) + Math.pow(lineThick, 2)) / 2;
    const newOffsetY = halfDiagonal - lineThick / 2;
    const newOffsetX = -lineShort / 2 + halfDiagonal;
    setTransform3(`translateX(${newOffsetX}px) translateY(${newOffsetY}px) rotateZ(45deg)`);
    const y3_2 = iconSize + newOffsetY - halfDiagonal * 2;
    const x3_2 = iconSize + newOffsetX * Math.sqrt(2) - halfDiagonal * 2; 
    setTransform3_2(`translateX(${x3_2}px) translateY(${y3_2}px) rotateZ(45deg)`);
    setTransform4(`translateX(${x3_2}px) translateY(${newOffsetY}px) rotate(-45deg)`);
    setTransform4_2(`translateX(${newOffsetX}px) translateY(${y3_2}px) rotate(-45deg)`);
  }  
  useEffect(() => {
    rayShiftBack(18, 3, 50)
  }, [])
  
  return (
    <>
    <div className='sun'>
          <div className="circle"></div>
          <div className="ray ray1"></div>
          <div className="ray ray2"></div>
          <div className="ray ray3" style={
            { transform: transform3}
          }></div>
          <div className="ray ray4" style={
            { transform: transform4}
          }></div>
          <div className="ray ray1_2"></div>
          <div className="ray ray2_2"></div>
          <div className="ray ray3_2" style={
            { transform: transform3_2}
          }></div>
          <div className="ray ray4_2" style={
            { transform: transform4_2}
          }></div>
    </div>
    </>
  )
}

export default Sun
"use client"

import { useEffect, useRef, useState } from "react"

export default function Whiteboard() {
  const canvasRef = useRef(null);
  const [startCoordinate, setStartCoordinate] = useState({x: 0, y: 0});
  const [endCoordinate, setEndCoordinate] = useState({x: 0, y: 0});
  const [isDrawing, setIsDrawing] = useState(false);

  function handleMouseMove(e) {
    if(!isDrawing) return;
    setEndCoordinate({x: e.clientX, y: e.clientY});
  }

  function handleMouseDown(e) {
    setStartCoordinate({x: e.clientX, y: e.clientY});
    setIsDrawing(true);
  }

  function handleMouseUp(e) {
    setIsDrawing(false);
  }

  useEffect(() => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const c = canvas.getContext('2d');
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.moveTo(startCoordinate.x, startCoordinate.y); //start draw line
    c.lineTo(endCoordinate.x, endCoordinate.y); //end draw line
    c.stroke();
  }, [isDrawing, startCoordinate, endCoordinate]);

  return (
    <div>
      <canvas 
        ref={canvasRef}
        // onMouseOver={handleMouseOver}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseOut={handleMouseUp}
        height={500} 
        width={500} 
        style={{border: '1px solid black'}} 
      />

    </div>
  )
}
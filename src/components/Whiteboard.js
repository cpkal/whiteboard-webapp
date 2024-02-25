"use client"

import useCanvas from "@/hooks";
import { useEffect, useRef, useState } from "react"

export default function Whiteboard() {
  const canvasRef = useRef(null);
  const [startCoordinate, setStartCoordinate] = useState({x: 0, y: 0});
  const [endCoordinate, setEndCoordinate] = useState({x: 0, y: 0});
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState('pen');
  const [listDrawing, setListDrawing] = useState([]); //add new drawing list, need to re-render every user add more drawing (?)

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
    if (!isDrawing) {
      return;
    };

    if(mode === 'pen') {
      drawLine();
    } else if(mode === 'eraser') {
      eraser();
    } else if(mode === 'rectangle') {
      drawRectangle();
    } else if(mode === 'text') {
      drawText();
    }

  }, [isDrawing, startCoordinate, endCoordinate, mode]);

  function drawLine() {
    const { c, canvas } = useCanvas(canvasRef);

    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.moveTo(startCoordinate.x, startCoordinate.y); //start draw line
    // c.lineTo(endCoordinate.x, endCoordinate.y); //end draw line
    c.arc(endCoordinate.x, endCoordinate.y, 50, 0, Math.PI);
    c.stroke();
  }

  function eraser() {
    const { c, canvas } = useCanvas(canvasRef);

    c.clearRect(0, 0, canvas.width, canvas.height);//clear all
  }

  function drawRectangle() {
    const { c, canvas } = useCanvas(canvasRef);

    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.rect(startCoordinate.x, endCoordinate.y, (startCoordinate.x - endCoordinate.y), (startCoordinate.x - endCoordinate.y));
    c.stroke();
  }

  function drawText() {
    const { c, canvas } = useCanvas(canvasRef);

    c.font = "30px Arial";
    const text = prompt('Add text: ');
    c.fillText(text, startCoordinate.x, startCoordinate.y);
  }

  return (
    <div>
      
      <canvas 
        ref={canvasRef}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseOut={handleMouseUp}
        height={500} 
        width={500} 
        style={{border: '1px solid black'}} 
      />
      <br />
      <button onClick={() => setMode('pen')}>Use pen</button>
      <button onClick={() => setMode('eraser')}>Use eraser</button>
      <button onClick={() => setMode('rectangle')}>Draw rectangle</button>
      <button onClick={() => setMode('text')}>Add text</button>
      <br />

    </div>
  )
}
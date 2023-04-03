import React, { useEffect, useRef, useState } from "react";
import './CanvasDrawing.scss'

export default function CanvasDrawing() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext("2d");
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;

    ctxRef.current = ctx;
  }, []);

  function startDrawing({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  function finishDrawing() {
    ctxRef.current.closePath();
    setIsDrawing(false);
  }

  function draw({ nativeEvent }) {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="canvas">
      <canvas
        className='canvas__background'
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <button className="clear-btn" onClick={clearCanvas}>Clear</button>
    </div>
  );
}

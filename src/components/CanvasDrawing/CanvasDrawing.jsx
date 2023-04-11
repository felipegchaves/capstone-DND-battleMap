import React, { useEffect, useRef, useState } from "react";
import "./CanvasDrawing.scss";
import ControlPanel from "../ControlPanel/ControlPanel";

export default function CanvasDrawing({ canvasRef, clearTokens }) {
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingPath, setDrawingPath] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('battleMapLines')
    if (data !== null ) setDrawingPath(JSON.parse(data))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    drawingPath.forEach(path => {
      switch (path.type) {
        case "start":
          ctx.beginPath();
          ctx.moveTo(path.x, path.y);
          break;
        case "draw":
          ctx.lineTo(path.x, path.y);
          ctx.stroke();
          break;
        case "finish":
          ctx.closePath();
          break;
        default:
          break;
      }
    });
  }, [canvasRef, drawingPath]);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8 * 2;
    canvas.height = window.innerHeight * 1 * 2;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const ctx = canvas.getContext("2d");
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;

    ctxRef.current = ctx;

    function handleResize() {
      window.location.reload();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, [canvasRef]);

  function startDrawing({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setDrawingPath(prevPath => [...prevPath, { type: "start", x: offsetX, y: offsetY }]);
  }
  
  function finishDrawing() {
    ctxRef.current.closePath();
    setIsDrawing(false);
    setDrawingPath(prevPath => [...prevPath, { type: "finish" }]);
    saveToLocalStorage();
  }
  
  function draw({ nativeEvent }) {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
    setDrawingPath(prevPath => [...prevPath, { type: "draw", x: offsetX, y: offsetY }]);
  }
  

  function saveToLocalStorage() {
    localStorage.setItem("battleMapLines", JSON.stringify(drawingPath));
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawingPath([])
  }

  return (
    <div className="canvas">
      <ControlPanel clearCanvas={clearCanvas} clearTokens={clearTokens} />
      <canvas
        className="canvas__background"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}

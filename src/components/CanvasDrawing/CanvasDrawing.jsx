import React, { useEffect, useRef, useState } from "react";
import "./CanvasDrawing.scss";
import ControlPanel from "../ControlPanel/ControlPanel";

export default function CanvasDrawing({ canvasRef, clearTokens }) {
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingPath, setDrawingPath] = useState([]);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

  const [isEraserMode, setIsEraserMode] = useState(false);


  useEffect(() => {
    const canvas = canvasRef.current;
    const initialWidth = window.innerWidth * 0.8;
    const initialHeight = window.innerHeight * 1;
    
    setCanvasDimensions({
      width: initialWidth,
      height: initialHeight
    });
    
    canvas.width = initialWidth * 2;
    canvas.height = initialHeight * 2;
    canvas.style.width = `${initialWidth}px`;
    canvas.style.height = `${initialHeight}px`;
  
    const ctx = canvas.getContext("2d");
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
  
    ctxRef.current = ctx;
  
    refreshCanvas();
  }, [canvasRef]);
  

  useEffect(() => {
    const data = localStorage.getItem('battleMapLines');
    if (data !== null ) {
      setDrawingPath(JSON.parse(data));
      refreshCanvas();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasDimensions.width * 2;
    canvas.height = canvasDimensions.height * 2;
    canvas.style.width = `${canvasDimensions.width}px`;
    canvas.style.height = `${canvasDimensions.height}px`;

    const ctx = canvas.getContext("2d");
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;

    ctxRef.current = ctx;

    refreshCanvas();
  }, [canvasRef, canvasDimensions]);

  useEffect(() => {
    function handleResize() {
      setCanvasDimensions({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 1
      });
      refreshCanvas();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleDrawingEvent(event) {
    const { nativeEvent } = event;
    const { offsetX, offsetY } = nativeEvent;
    const { current: ctx } = ctxRef;
  
    switch (event.type) {
      case "mousedown":
        if (isEraserMode) {
          // Start erasing
          ctx.globalCompositeOperation = "destination-out";
          ctx.beginPath();
          ctx.arc(offsetX, offsetY, 10, 0, 2 * Math.PI);
          ctx.fill();
          setIsDrawing(true);
        } else {
          // Start drawing
          ctx.globalCompositeOperation = "source-over";
          ctx.beginPath();
          ctx.moveTo(offsetX, offsetY);
          setIsDrawing(true);
          setDrawingPath(prevPath => [...prevPath, { type: "start", x: offsetX, y: offsetY }]);
        }
        break;
      case "mousemove":
        if (!isDrawing) {
          return;
        }
        if (isEraserMode) {
          // Erase
          ctx.beginPath();
          ctx.arc(offsetX, offsetY, 10, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          // Draw
          ctx.lineTo(offsetX, offsetY);
          ctx.stroke();
          setDrawingPath(prevPath => [...prevPath, { type: "draw", x: offsetX, y: offsetY }]);
        }
        break;
      case "mouseup":
        if (isEraserMode) {
          // Stop erasing
          ctx.closePath();
          setIsDrawing(false);
        } else {
          // Stop drawing
          ctx.closePath();
          setIsDrawing(false);
          setDrawingPath(prevPath => [...prevPath, { type: "finish" }]);
          saveToLocalStorage();
        }
        break;
      default:
        break;
    }
  }
  

  // function undo() {
  //   setDrawingPath(prevPath => prevPath.slice(0, -1));
  // }
  

  function toggleEraserMode() {
    setIsEraserMode(!isEraserMode);
  }

  function refreshCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawingPath.forEach((path) => {
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
  }

  function saveToLocalStorage() {
    localStorage.setItem('battleMapLines', JSON.stringify(drawingPath));
  }

  function clearCanvas() {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    saveToLocalStorage();
    localStorage.clear(); 
  }

  return (
    <div className="canvas">
      <ControlPanel clearCanvas={clearCanvas} clearTokens={clearTokens} erase={toggleEraserMode} />

      <canvas
        className="canvas__background"
        // onMouseDown={startDrawing}
        // onMouseMove={draw}
        // onMouseUp={finishDrawing}
        onMouseDown={handleDrawingEvent}
        onMouseMove={handleDrawingEvent}
        onMouseUp={handleDrawingEvent}
        ref={canvasRef}
      />
    </div>
  );
}

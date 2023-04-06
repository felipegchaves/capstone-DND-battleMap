import { useState } from "react";
import './ControlPanel.scss'

export default function ControlPanel({ clearCanvas, addCircle, clearCircles }) {

  function handleClearBtn() {
    clearCanvas();
  }

  return (
    <div className="controlPanel">
        {/* <div className="ControlPanel__btns"> */}
            <button onClick={handleClearBtn}>clear</button>
            <button onClick={clearCircles}>Clear Circles</button>
            <button onClick={addCircle}>Add Circle</button>
        {/* </div> */}
    </div>
  );
}

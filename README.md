<DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="searchResults">
                        {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {searchResults.map((searchResult, index) => (
                            <Draggable key={searchResult.id} draggableId={searchResult.id} index={index}>
                                {(provided) => (
                                <div
                                    className="sidebar__card"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <h2>{searchResult.name}</h2>
                                    <p>{searchResult.hit_points}</p>
                                    <img className="sidebar__card--img" src={searchResult.image ? `https://www.dnd5eapi.co${searchResult.image}` : anonMonster}
                                    alt={searchResult.name}/>
                                    <button className="sidebar__card--removeBtn" onClick={() => handleRemoveCard(index)}>
                                    x
                                    </button>
                                </div>
                                )}
                            </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                </DragDropContext>

import React, { useEffect, useRef, useState } from "react";
import "./CanvasDrawing.scss";

export default function CanvasDrawing({ canvasRef }) {
const ctxRef = useRef(null);
const [isDrawing, setIsDrawing] = useState(false);

useEffect(() => {
const canvas = canvasRef.current;
canvas.width = window.innerWidth _ 0.8 _ 2;
canvas.height = window.innerHeight _ 1 _ 2;
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
}

function draw({ nativeEvent }) {
if (!isDrawing) {
return;
}
const { offsetX, offsetY } = nativeEvent;
ctxRef.current.lineTo(offsetX, offsetY);
ctxRef.current.stroke();
}

function finishDrawing() {
ctxRef.current.closePath();
setIsDrawing(false);
}

return (
<div className="canvas">
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

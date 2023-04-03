import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Dnd() {
const [circles, setCircles] = useState([]);

function addCircle() {
const newCircle = { id: circles.length + 1, x: 0, y: 0 };
setCircles([...circles, newCircle]);
}

function onDragEnd(result) {
if (!result.destination) {
return;
}
const newCircles = [...circles];
const [reorderedItem] = newCircles.splice(result.source.index, 1);
newCircles.splice(result.destination.index, 0, reorderedItem);
setCircles(newCircles);
}

function handleCircleDrag(event, circleIndex) {
const newCircles = [...circles];
newCircles[circleIndex].x += event.movementX;
newCircles[circleIndex].y += event.movementY;
setCircles(newCircles);
}

return (
<div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
<button onClick={addCircle}>Add Circle</button>
<div style={{ width: 400, height: 400, border: "1px solid black" }}>
<DragDropContext onDragEnd={onDragEnd}>
<Droppable droppableId="circles">
{(provided) => (
<div ref={provided.innerRef} {...provided.droppableProps}>
{circles.map((circle, index) => (
<Draggable key={circle.id} draggableId={circle.id} index={index}>
{(provided) => (
<div
ref={provided.innerRef}
{...provided.draggableProps}
{...provided.dragHandleProps}
style={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          backgroundColor: "blue",
                          margin: 10,
                          position: "absolute",
                          left: circle.x,
                          top: circle.y,
                          cursor: "move"
                        }}
onClick={(event) => handleCircleDrag(event, index)} ></div>
)}
</Draggable>
))}
{provided.placeholder}
</div>
)}
</Droppable>
</DragDropContext>
</div>
</div>
);
}

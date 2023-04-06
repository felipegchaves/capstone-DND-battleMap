// import React, { useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import "./DragAndDrop.scss"
// import CanvasDrawing from "../../CanvasDrawing";

// export default function DragAndDrop() {
//   const [circles, setCircles] = useState([]);

//   function addCircle() {
//     const newCircle = { id: circles.length + 1, x: 500, y: 50 };
//     setCircles([...circles, newCircle]);
//   }

//   function onDragEnd(result) {
//     if (!result.destination) {
//       return;
//     }
//     const newCircles = [...circles];
//     const [reorderedItem] = newCircles.splice(result.source.index, 1);
//     newCircles.splice(result.destination.index, 0, reorderedItem);
//     setCircles(newCircles);
//   }

//   function handleMouseDown(event, index) {
//     const newCircles = [...circles];
//     const circle = newCircles[index];
//     circle.dragging = true;
//     circle.dragStartX = event.clientX;
//     circle.dragStartY = event.clientY;
//     setCircles(newCircles);
//   }

//   function handleMouseMove(event, index) {
//     const newCircles = [...circles];
//     const circle = newCircles[index];
//     if (!circle.dragging) {
//       return;
//     }
//     const deltaX = event.clientX - circle.dragStartX;
//     const deltaY = event.clientY - circle.dragStartY;
//     circle.x += deltaX;
//     circle.y += deltaY;
//     circle.dragStartX = event.clientX;
//     circle.dragStartY = event.clientY;
//     setCircles(newCircles);
//   }

//   function handleMouseUp(event, index) {
//     const newCircles = [...circles];
//     const circle = newCircles[index];
//     circle.dragging = false;
//     setCircles(newCircles);
//   }

//   function clearCircles() {
//     setCircles([]);
//   }

//   return (
//     <>
    
//     </>
//   );
// }

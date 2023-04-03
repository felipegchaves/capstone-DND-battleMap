import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./DragAndDrop.scss"

export default function DragAndDrop() {
  const [circles, setCircles] = useState([]);

  function addCircle() {
    const newCircle = { id: circles.length + 1, x: 500, y: 50 };
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

  function handleMouseDown(event, index) {
    const newCircles = [...circles];
    const circle = newCircles[index];
    circle.dragging = true;
    circle.dragStartX = event.clientX;
    circle.dragStartY = event.clientY;
    setCircles(newCircles);
  }

  function handleMouseMove(event, index) {
    const newCircles = [...circles];
    const circle = newCircles[index];
    if (!circle.dragging) {
      return;
    }
    const deltaX = event.clientX - circle.dragStartX;
    const deltaY = event.clientY - circle.dragStartY;
    circle.x += deltaX;
    circle.y += deltaY;
    circle.dragStartX = event.clientX;
    circle.dragStartY = event.clientY;
    setCircles(newCircles);
  }

  function handleMouseUp(event, index) {
    const newCircles = [...circles];
    const circle = newCircles[index];
    circle.dragging = false;
    setCircles(newCircles);
  }

  return (
    <div className="circle-container">
      <button className="add-btn" onClick={addCircle}>Add Circle</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="circles">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} id="circles">
              {circles.map((circle, index) => (
                <Draggable key={circle.id} draggableId={circle.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="circle"
                      style={{ left: circle.x, top: circle.y }}
                      onMouseDown={(event) => handleMouseDown(event, index)}
                      onMouseMove={(event) => handleMouseMove(event, index)}
                      onMouseUp={(event) => handleMouseUp(event, index)}
                    >
                      <span className="drag-handle" {...provided.dragHandleProps} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

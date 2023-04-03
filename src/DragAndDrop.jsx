import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Dnd() {
  const [circles, setCircles] = useState([]);
  const [circleCount, setCircleCount] = useState(0);

  const addCircle = () => {
    const newCircle = {
      id: `circle-${circleCount}`,
      text: `Circle ${circleCount + 1}`,
    };
    setCircles([...circles, newCircle]);
    setCircleCount(circleCount + 1);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.index === destination.index) return;
    const newCircles = [...circles];
    const [removed] = newCircles.splice(source.index, 1);
    newCircles.splice(destination.index, 0, removed);
    setCircles(newCircles);
  };

  return (
    <div>
      <button onClick={addCircle}>Add Circle</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`droppable-${circleCount}`}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? "lightblue" : "white",
                width: 400,
                height: 400,
              }}
            >
              {circles.map((circle, index) => (
                <Draggable key={circle.id} draggableId={circle.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "red",
                        margin: 10,
                        opacity: snapshot.isDragging ? 0.5 : 1,
                        ...provided.draggableProps.style,
                      }}
                    >
                      {circle.text}
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

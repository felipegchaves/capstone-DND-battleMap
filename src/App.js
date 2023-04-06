import CanvasDrawing from "./CanvasDrawing";
import DragAndDrop from "./components/DragAndDrop/DragAndDrop";
import SideBar from "./components/SideBar/SideBar";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import "./app.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRef,useState } from "react";

function App() {
  const canvasRef = useRef(null);
  
  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
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

  function clearCircles() {
    setCircles([]);
  }

  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="container">
          <ControlPanel
            clearCanvas={clearCanvas}
            addCircle={addCircle}
            clearCircles={clearCircles}
          />
          <CanvasDrawing canvasRef={canvasRef} />
          <div className="dragAndDrop">
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
        </div>
      </div>
    </>
  );
}

export default App
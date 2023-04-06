import CanvasDrawing from "./CanvasDrawing";
import SideBar from "./components/SideBar/SideBar";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import "./app.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRef, useState } from "react";

function App() {
  const canvasRef = useRef(null);

  function clearCanvas() {
    localStorage.removeItem("battleMapLines");
  
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.location.reload();
  }
  

  const [tokens, setTokens] = useState([]);

  function addToken() {
    const newToken = { id: tokens.length + 1, x: 100, y: 0 };
    setTokens([...tokens, newToken]);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const newTokens = [...tokens];
    const [reorderedItem] = newTokens.splice(result.source.index, 1);
    newTokens.splice(result.destination.index, 0, reorderedItem);
    setTokens(newTokens);
  }

  function handleMouseDown(event, index) {
    const newTokens = [...tokens];
    const token = newTokens[index];
    token.dragging = true;
    token.dragStartX = event.clientX;
    token.dragStartY = event.clientY;
    setTokens(newTokens);
  }

  function handleMouseMove(event, index) {
    const newTokens = [...tokens];
    const token = newTokens[index];
    if (!token.dragging) {
      return;
    }
    const deltaX = event.clientX - token.dragStartX;
    const deltaY = event.clientY - token.dragStartY;
    token.x += deltaX;
    token.y += deltaY;
    token.dragStartX = event.clientX;
    token.dragStartY = event.clientY;
    setTokens(newTokens);
  }

  function handleMouseUp(event, index) {
    const newTokens = [...tokens];
    const token = newTokens[index];
    token.dragging = false;
    setTokens(newTokens);
  }

  function clearTokens() {
    setTokens([]);
  }

  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="container">
          <ControlPanel
            clearCanvas={clearCanvas}
            addToken={addToken}
            clearTokens={clearTokens}
          />
          <CanvasDrawing canvasRef={canvasRef} />
          <div className="dragAndDrop">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="tokens">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} id="tokens">
                    {tokens.map((token, index) => (
                      <Draggable key={token.id} draggableId={token.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="token"
                            style={{ left: token.x, top: token.y }}
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
import CanvasDrawing from "./CanvasDrawing";
import DragAndDrop from "./components/DragAndDrop/DragAndDrop";
import "./app.scss"

function App() {


  return (
    <>
      <div className="container">
        <CanvasDrawing />
        <DragAndDrop />
      </div>  
    </>
  );
}

export default App;

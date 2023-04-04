import CanvasDrawing from "./CanvasDrawing";
import DragAndDrop from "./components/DragAndDrop/DragAndDrop";
import SideBar from "./components/SideBar/SideBar";
import "./app.scss"

function App() {


  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="container">
          <CanvasDrawing />
          {/* <DragAndDrop /> */}
        </div> 
      </div> 
    </>
  );
}

export default App;

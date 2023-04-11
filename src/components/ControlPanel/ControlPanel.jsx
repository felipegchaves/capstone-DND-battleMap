import './ControlPanel.scss'

export default function ControlPanel({ clearCanvas, clearTokens, undo, handleDrawingEvent }) {

    function handleClearBtn() {
        clearCanvas();
    }

    return (
        <div className="controlPanel">
            <button onClick={handleClearBtn}>clear</button>
            <button onClick={clearTokens}>Clear Tokens</button>
            {/* <button onClick={undo}>Undo</button> */}
        </div>
    );
}

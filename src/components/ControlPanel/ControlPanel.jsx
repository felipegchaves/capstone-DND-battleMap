import './ControlPanel.scss'

export default function ControlPanel({ clearCanvas, clearTokens }) {

    function handleClearBtn() {
        clearCanvas();
    }

    return (
        <div className="controlPanel">
            <button onClick={handleClearBtn}>clear</button>
            <button onClick={clearTokens}>Clear Tokens</button>
        </div>
    );
}

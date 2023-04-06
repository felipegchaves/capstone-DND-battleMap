import { useState } from "react";
import './ControlPanel.scss'

export default function ControlPanel({ clearCanvas, addToken, clearTokens }) {

    function handleClearBtn() {
    clearCanvas();
    }

    return (
        <div className="controlPanel">
            <button onClick={handleClearBtn}>clear</button>
            <button onClick={clearTokens}>Clear Tokens</button>
            <button onClick={addToken}>Add Token</button>
        </div>
    );
}

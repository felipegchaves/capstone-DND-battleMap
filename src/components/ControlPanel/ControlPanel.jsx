import './ControlPanel.scss'
import { useState } from 'react';

export default function ControlPanel({ clearCanvas, clearTokens, erase }) {

    const [eraseOn, setEraseOn] = useState(false);

    function handleClearBtn() {
        clearCanvas();
    }

    function handleEraseBtn() {
        setEraseOn(!eraseOn);
        erase();
    }

    return (
        <div className="controlPanel">
            <button onClick={handleClearBtn}>clear</button>
            <button onClick={clearTokens}>Clear Tokens</button>
            {/* <button onClick={undo}>Undo</button> */}
            <button onClick={handleEraseBtn} style={{ backgroundColor: eraseOn ? 'blue' : '' }}>Erase</button>
        </div>
    );
}

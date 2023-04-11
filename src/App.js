import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Homepage from './components/Homepage/Homepage';

function App() {
    return (
        <>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Homepage />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}
export default App;
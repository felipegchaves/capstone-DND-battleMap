import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Homepage from './components/Homepage/Homepage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import Footer from './components/Footer/Footer';

function App() {
    const [username, setUsername] = useState('');

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginPage setUsername={setUsername} />} />
                    <Route path='/homepage' element={<Homepage />} />
                </Routes>
                <Footer username={username} setUsername={setUsername} />
            </BrowserRouter>
        </>
    );
}

export default App;

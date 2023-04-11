import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Homepage from './components/Homepage/Homepage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/homepage' element={<Homepage />} />
            </Routes>
        </BrowserRouter>
        <Footer />
        </>
    );
}
export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Agenda from './pages/Agenda';
import Home from './pages/Home';
import Header from './components/Header'; 

function App() {
    return (
        <Router>
            <Header /> 
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/agenda" element={<Agenda />} />
            </Routes>
        </Router>
    );
}

export default App;
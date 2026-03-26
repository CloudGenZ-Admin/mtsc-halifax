import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Prayer from './pages/Prayer';
import Awards from './pages/Awards'; // <-- 1. Import new page
import Sponsors from './pages/Sponsors';
import DayOfTheSeafarer from './pages/DayOfTheSeafarer';
import SeaSunday from './pages/SeaSunday';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/prayer" element={<Prayer />} />
        <Route path="/awards" element={<Awards />} /> {/* <-- 2. Add route */}
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/events/day-of-the-seafarer" element={<DayOfTheSeafarer />} />
        <Route path="/events/sea-sunday" element={<SeaSunday />} />
      </Routes>
    </Router>
  );
}

export default App;